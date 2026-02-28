import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface VibeAnalysisResult {
  vibeCategory: string;
  vibeSummary: string;
  vibeScore: number;
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
  venueAddress: string
): Promise<VibeAnalysisResult> {
  const websiteContext = venueWebsite
    ? `The venue's website is: ${venueWebsite}`
    : "No website provided.";

  const prompt = `You are VibeCheque's AI vibe analyst. Your job is to analyze restaurants, bars, and venues and determine their vibe and atmosphere.

Venue Details:
- Name: ${venueName}
- Type: ${venueType}
- Address: ${venueAddress}
- ${websiteContext}

Based on the venue name, type, location, and any context you can infer, analyze the likely vibe and atmosphere of this venue.

You MUST respond with a valid JSON object in exactly this format:
{
  "vibeCategory": "<one of: ${VIBE_CATEGORIES.join(", ")}>",
  "vibeSummary": "<2-3 sentences describing the vibe and atmosphere in an engaging way, as if writing for a vibe-focused review site. Be specific and evocative.>",
  "vibeScore": <number from 1-10 representing overall vibe intensity/strength>,
  "keyVibeWords": ["<word1>", "<word2>", "<word3>", "<word4>", "<word5>"],
  "musicVibe": "<brief description of likely music/sound environment>",
  "crowdVibe": "<brief description of the typical crowd>",
  "ambianceVibe": "<brief description of lighting, decor, and physical atmosphere>"
}

Be honest and realistic. Not every venue has a perfect vibe - some are dive bars, some are family joints. Capture the authentic character.`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  // Extract JSON from response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse AI response as JSON");
  }

  const result = JSON.parse(jsonMatch[0]) as VibeAnalysisResult;

  // Validate category
  if (!VIBE_CATEGORIES.includes(result.vibeCategory)) {
    result.vibeCategory = "CASUAL_CHILL";
  }

  // Clamp score
  result.vibeScore = Math.max(1, Math.min(10, result.vibeScore));

  return result;
}
