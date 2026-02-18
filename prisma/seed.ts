import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VibeCheque database...");

  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "The Rusty Anchor",
        address: "42 Harbor Street",
        city: "Austin",
        state: "TX",
        type: "BAR",
        website: "https://example.com/rusty-anchor",
        vibeCategory: "DIVE_BAR",
        vibeSummary:
          "The Rusty Anchor is the kind of bar where everyone knows your name after the second visit. Think sticky floors, dollar bills on the ceiling, a jukebox that still has Led Zeppelin, and bartenders who pour heavy. It's unpretentious, loud, and absolutely perfect for when you want real talk over a cold beer without any Instagram moments.",
        vibeScore: 7.2,
        avgUserVibeScore: 4.1,
        reviewCount: 3,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Celeste Rooftop Lounge",
        address: "1200 Congress Ave, Floor 18",
        city: "Austin",
        state: "TX",
        type: "ROOFTOP",
        website: "https://example.com/celeste",
        vibeCategory: "ROOFTOP_VIEWS",
        vibeSummary:
          "Celeste is the city's open secret for golden hour cocktails with the skyline as your backdrop. The vibe here is equal parts aspirational and accessible — suited crowd mingling with off-duty creatives, all united by the stunning 360-degree views and craft cocktails that justify the price tag. Get there before sunset.",
        vibeScore: 9.1,
        avgUserVibeScore: 4.7,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Nonna's Table",
        address: "87 Elm Street",
        city: "Chicago",
        state: "IL",
        type: "RESTAURANT",
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "Nonna's Table hits you like a warm hug from someone's grandmother. Low lighting, mismatched chairs, checkered tablecloths, and the unmistakable smell of garlic bread from the kitchen. Conversations stay at comfortable volumes, the wine flows freely, and the pasta is made in-house. Perfect for a first date you actually want to go well.",
        vibeScore: 8.6,
        avgUserVibeScore: 4.8,
        reviewCount: 1,
      },
    }),

    prisma.venue.create({
      data: {
        name: "The Electric Garden",
        address: "555 Vine Street",
        city: "Los Angeles",
        state: "CA",
        type: "LOUNGE",
        vibeCategory: "TRENDY_HIPSTER",
        vibeSummary:
          "If your aesthetic board came to life as a bar, it would look like The Electric Garden. Neon botanicals, curated playlists cycling between indie and electronic, a cocktail menu that changes monthly, and a crowd that all look like they have personal brand deals. The vibe is intentionally crafted — but somehow it works.",
        vibeScore: 8.8,
        avgUserVibeScore: null,
        reviewCount: 0,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Champions Sports Bar & Grill",
        address: "300 Stadium Drive",
        city: "Dallas",
        state: "TX",
        type: "BAR",
        vibeCategory: "SPORTS_BAR",
        vibeSummary:
          "Champions is the temple of game day — 40 screens, a beer list that covers all major domestics, and a crowd that wears their team colors like armor. The nachos are legendary, the noise level peaks at genuinely dangerous decibels during playoffs, and strangers become instant friends or enemies depending on the scoreboard. All-in on sports energy.",
        vibeScore: 7.8,
        avgUserVibeScore: 4.2,
        reviewCount: 1,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Momo Café",
        address: "12 University Ave",
        city: "Seattle",
        state: "WA",
        type: "CAFE",
        vibeCategory: "CASUAL_CHILL",
        vibeSummary:
          "Momo Café is the antidote to hustle culture. Secondhand furniture, plants everywhere, lo-fi beats at the perfect volume, and baristas who remember your order by week two. The WiFi is fast, the oat milk lattes are exceptional, and nobody rushes you. Whether you're working, reading, or doing absolutely nothing — this is your place.",
        vibeScore: 8.0,
        avgUserVibeScore: 4.5,
        reviewCount: 2,
      },
    }),
  ]);

  // Add some reviews
  const rustyAnchor = venues[0];
  const celeste = venues[1];
  const nonnas = venues[2];
  const champions = venues[4];
  const momo = venues[5];

  await prisma.review.createMany({
    data: [
      {
        venueId: rustyAnchor.id,
        authorName: "Jamie T.",
        vibeRating: 4,
        vibeCategory: "DIVE_BAR",
        comment:
          "Exactly the kind of bar you need after a rough week. Nobody here cares who you are or what you do. Just cold beer and honest conversation. The bartender makes you feel like a regular from the first visit.",
        upvotes: 12,
        downvotes: 1,
      },
      {
        venueId: rustyAnchor.id,
        authorName: "Marcus R.",
        vibeRating: 5,
        vibeCategory: "DIVE_BAR",
        comment:
          "I've been coming here for 3 years. The vibe hasn't changed and that's the point. Authentic, unfiltered, no pretension. The jukebox still slaps.",
        upvotes: 8,
        downvotes: 0,
      },
      {
        venueId: rustyAnchor.id,
        authorName: "Sofia M.",
        vibeRating: 3,
        comment:
          "Not my usual scene but I get the appeal. Sticky tables and all that. Would give 4 stars if the bathrooms were cleaner.",
        upvotes: 3,
        downvotes: 2,
      },
      {
        venueId: celeste.id,
        authorName: "Alex K.",
        vibeRating: 5,
        vibeCategory: "ROOFTOP_VIEWS",
        comment:
          "Brought a date here for a special occasion and it delivered 100%. The cocktails are pricey but the view is free. Get the sunset reservation if you can.",
        upvotes: 23,
        downvotes: 0,
      },
      {
        venueId: celeste.id,
        authorName: "Taylor B.",
        vibeRating: 4,
        vibeCategory: "UPSCALE_REFINED",
        comment:
          "Beautiful space, excellent cocktails. Gets crowded on weekends but the energy stays sophisticated. Staff is attentive.",
        upvotes: 11,
        downvotes: 1,
      },
      {
        venueId: nonnas.id,
        authorName: "Emma L.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment:
          "I felt like I was dining in someone's grandmother's home. The tagliatelle is handmade and unbelievable. Perfect for a date or a dinner with someone you really want to talk to. The noise level is just right.",
        upvotes: 31,
        downvotes: 0,
      },
      {
        venueId: champions.id,
        authorName: "Derek N.",
        vibeRating: 4,
        vibeCategory: "SPORTS_BAR",
        comment:
          "The nachos are genuinely the best sports bar nachos I've ever had. Loaded correctly. The crowd during Cowboys games is ELECTRIC. Bring earplugs if you're sensitive to noise.",
        upvotes: 17,
        downvotes: 2,
      },
      {
        venueId: momo.id,
        authorName: "Riley C.",
        vibeRating: 5,
        vibeCategory: "CASUAL_CHILL",
        comment:
          "My office away from office for 2 years running. The staff is genuinely kind, never rush you, and the oat milk latte is consistently perfect. Plants everywhere make it feel alive.",
        upvotes: 19,
        downvotes: 0,
      },
      {
        venueId: momo.id,
        authorName: "Jordan P.",
        vibeRating: 4,
        vibeCategory: "HIDDEN_GEM",
        comment:
          "Tucked away enough that it's never too packed. Good for deep work or catching up with a friend. Excellent chai.",
        upvotes: 7,
        downvotes: 1,
      },
    ],
  });

  console.log(`Seeded ${venues.length} venues with reviews!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
