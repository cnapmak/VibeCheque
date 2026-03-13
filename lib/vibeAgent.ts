import Anthropic from "@anthropic-ai/sdk";
import type { GoogleReview } from "./googlePlaces";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface VibeAnalysisResult {
  vibeCategory: string;
  vibeSummary: string;
  keyVibeWords: string[];
  musicVibe: string;
  crowdVibe: string;
  ambianceVibe: string;
}

const VIBE_CATEGORIES = [
  "COZY_INTIMATE",
  "LIVELY_ENERGETIC",
  "UPSCALE_REFINED",
  "CASUAL_CHILL",
  "TRENDY_HIPSTER",
  "FAMILY_FRIENDLY",
  "SPORTS_BAR",
  "DIVE_BAR",
  "ROOFTOP_VIEWS",
  "HIDDEN_GEM",
];

export async function analyzeVenueVibe(
  venueName: string,
  venueWebsite: string | null,
  venueType: string,
  venueAddress: string,
  googleReviews: GoogleReview[] = []
): Promise<VibeAnalysisResult> {
  const websiteContext = venueWebsite
    ? `Website: ${venueWebsite}`
    : "No website provided.";

  const reviewContext =
    googleReviews.length > 0
      ? `\nReal visitor reviews from Google (${googleReviews.length} reviews):\n` +
        googleReviews
          .map(
            (r, i) =>
              `[Review ${i + 1}] ${r.rating}/5 stars · ${r.relativeTime}\n"${r.text}"`
          )
          .join("\n\n") +
        "\n\nBase your vibe analysis on what real visitors actually experienced. Quote or paraphrase specific details from their reviews in the summary."
      : "\nNo Google reviews available — infer vibe from the venue name, type, and location.";

  const prompt = `You are VibeCheque's AI vibe analyst. Analyze this venue's atmosphere and vibe based on real visitor feedback.

Venue:
- Name: ${venueName}
- Type: ${venueType}
- Address: ${venueAddress}
- ${websiteContext}
${reviewContext}

Respond with a valid JSON object in exactly this format:
{
  "vibeCategory": "<one of: ${VIBE_CATEGORIES.join(", ")}>",
  "vibeSummary": "<2-3 sentences capturing the atmosphere in vivid, specific terms. If reviews were provided, ground this in what visitors actually said — name specific details like lighting, noise level, crowd, service tone. Write like a knowledgeable local, not a press release.>",
  "keyVibeWords": ["<word1>", "<word2>", "<word3>", "<word4>", "<word5>"],
  "musicVibe": "<brief description of the sound/music environment based on reviews or reasonable inference>",
  "crowdVibe": "<who goes here and when, based on reviews>",
  "ambianceVibe": "<lighting, decor, physical atmosphere — be specific>"
}

Be honest. Capture authentic character, not marketing copy.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse AI response as JSON");
  }

  const result = JSON.parse(jsonMatch[0]) as VibeAnalysisResult;

  if (!VIBE_CATEGORIES.includes(result.vibeCategory)) {
    result.vibeCategory = "CASUAL_CHILL";
  }

  return result;
}
