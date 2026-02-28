import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VibeCheque database with Chicago venues...");

  const venues = await Promise.all([
    // ── LOGAN SQUARE ──────────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Lula Cafe",
        address: "2537 N Kedzie Blvd",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://lulacafe.com",
        type: "RESTAURANT",
        imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
        latitude: 41.9257,
        longitude: -87.7047,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "A founding pillar of Chicago's farm-to-table movement, Lula has anchored Logan Square for over two decades. The mismatched chairs and warm low light feel genuinely lived-in rather than curated. Come for the rotating seasonal menu and brunch that regularly draws a two-hour wait — it earns every minute.",
        vibeScore: 8.6,
        avgUserVibeScore: 4.7,
        reviewCount: 3,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Mi Tocaya Antojería",
        address: "2800 W Logan Blvd",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://mitocaya.com",
        type: "RESTAURANT",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
        latitude: 41.9289,
        longitude: -87.6977,
        vibeCategory: "UPSCALE_REFINED",
        vibeSummary:
          "Chef Diana Dávila's Michelin Bib Gourmand-recognized antojería brings a sophisticated lens to Mexican regional cooking. The room is spare and confident — dark walls, candlelight, and a focused menu of small plates built on deep culinary knowledge. It reads upscale without ever feeling precious.",
        vibeScore: 9.2,
        avgUserVibeScore: 4.8,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Billy Sunday",
        address: "3143 W Logan Blvd",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://billy-sunday.com",
        type: "BAR",
        imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        latitude: 41.9277,
        longitude: -87.7065,
        vibeCategory: "TRENDY_HIPSTER",
        vibeSummary:
          "Named for a Prohibition-era preacher, Billy Sunday is the kind of cocktail bar that takes the craft seriously without the sermon. Deep wood, vintage amber lighting, and bartenders who clearly love what they're doing. The spirits list skews unusual; the cocktails reward your curiosity.",
        vibeScore: 8.9,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Best Intentions",
        address: "3281 W Armitage Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://bestintentionschicago.com",
        type: "BAR",
        imageUrl: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80",
        latitude: 41.9162,
        longitude: -87.7087,
        vibeCategory: "DIVE_BAR",
        vibeSummary:
          "One of North America's 50 Best Bars in a building that doesn't announce itself — and that's entirely the point. The drinks are affordable, the smashburgers are genuinely good, and the room fills with the kind of crowd that's delighted to have found it. No velvet rope, no attitude.",
        vibeScore: 8.1,
        avgUserVibeScore: 4.5,
        reviewCount: 2,
      },
    }),

    // ── WICKER PARK ───────────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Schwa",
        address: "1466 N Ashland Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://schwarestaurant.com",
        type: "RESTAURANT",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        latitude: 41.9089,
        longitude: -87.6679,
        vibeCategory: "HIDDEN_GEM",
        vibeSummary:
          "Michelin-starred and defiantly BYOB, Schwa operates at a frequency all its own. Chef Michael Carlson's tasting menus are technically dazzling, playfully irreverent, and genuinely moving — sometimes all in the same course. Getting a reservation is half the adventure; the meal is entirely worth it.",
        vibeScore: 9.6,
        avgUserVibeScore: 4.9,
        reviewCount: 1,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Nick's Beer Garden",
        address: "1516 N Milwaukee Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://nicksbeergarden.com",
        type: "BAR",
        imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
        latitude: 41.9089,
        longitude: -87.6793,
        vibeCategory: "LIVELY_ENERGETIC",
        vibeSummary:
          "A Wicker Park institution since 1977, Nick's is the rare neighborhood bar that's survived every wave of gentrification with its character fully intact. The outdoor garden fills with free live music on weekends, the draft list is honest, and the energy is pure Chicago. No pretense, just a good time.",
        vibeScore: 7.8,
        avgUserVibeScore: 4.3,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Piece Brewery & Pizzeria",
        address: "1927 W North Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://piecechicago.com",
        type: "BREWERY",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        latitude: 41.9098,
        longitude: -87.6845,
        vibeCategory: "CASUAL_CHILL",
        vibeSummary:
          "New Haven-style thin-crust pizzas and house-brewed ales in a loud, cheerful room that's somehow right for everyone — dates, families, groups of eight arguing over toppings. The brewery is award-winning and the pizza is better than it has any right to be at a brewpub.",
        vibeScore: 8.0,
        avgUserVibeScore: 4.4,
        reviewCount: 2,
      },
    }),

    // ── LINCOLN PARK ──────────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Alinea",
        address: "1723 N Halsted St",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://alinearestaurant.com",
        type: "RESTAURANT",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        latitude: 41.9199,
        longitude: -87.6483,
        vibeCategory: "UPSCALE_REFINED",
        vibeSummary:
          "One of fourteen Michelin three-star restaurants in the United States, Alinea doesn't serve dinner so much as stage an experience. Grant Achatz's multi-course tasting menu is theatrical, technically impeccable, and unlike anything else. Dinner here is an occasion in itself — plan accordingly.",
        vibeScore: 9.8,
        avgUserVibeScore: 4.9,
        reviewCount: 1,
      },
    }),

    prisma.venue.create({
      data: {
        name: "North Pond",
        address: "2610 N Cannon Dr",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://northpondrestaurant.com",
        type: "RESTAURANT",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        latitude: 41.9226,
        longitude: -87.6347,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "Housed in a 1912 Arts & Crafts warming shelter inside Lincoln Park, North Pond sits beside its namesake pond with unobstructed skyline views. The seasonal New American menu is elegant without being stiff, the room glows with warm light, and the service is attentive in the way that lets you forget about time.",
        vibeScore: 9.0,
        avgUserVibeScore: 4.8,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Geja's Cafe",
        address: "340 W Armitage Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://gejascafe.com",
        type: "LOUNGE",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        latitude: 41.9181,
        longitude: -87.6492,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "Chicago's most romantic restaurant for over sixty years. The candlelit wine-cellar room, live flamenco guitar, and the slow ritual of fondue create an atmosphere that makes conversation feel more important. Named America's Most Romantic Restaurant by USA Today — the kind of place that earns that title honestly.",
        vibeScore: 8.7,
        avgUserVibeScore: 4.7,
        reviewCount: 2,
      },
    }),

    // ── GOLD COAST ────────────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Sparrow",
        address: "12 W Elm St",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://sparrowchicago.com",
        type: "BAR",
        imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
        latitude: 41.8974,
        longitude: -87.6291,
        vibeCategory: "TRENDY_HIPSTER",
        vibeSummary:
          "Tucked into a restored 1927 apartment building, Sparrow is an art deco cocktail lounge that manages to feel both discovered and deliberate. The rum-forward drinks are built with precision, the lighting is just right, and the vibe has the quiet confidence of a room that knows it doesn't need to try hard.",
        vibeScore: 8.8,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "LUXBAR",
        address: "18 E Bellevue Pl",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://luxbar.com",
        type: "BAR",
        imageUrl: "https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=800&q=80",
        latitude: 41.8988,
        longitude: -87.6266,
        vibeCategory: "LIVELY_ENERGETIC",
        vibeSummary:
          "The Gold Coast's neighborhood bar — except the neighborhood is one of Chicago's most moneyed. LUXBAR serves serious cocktails made with fresh-pressed juices and premium ice to a crowd that actually lives here. The energy is social and genuine, the food is better than it needs to be, and weeknights feel like Saturday.",
        vibeScore: 8.2,
        avgUserVibeScore: 4.4,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Pandan at Viceroy Chicago",
        address: "1112 N State St",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://viceroyhotelsandresorts.com/chicago",
        type: "ROOFTOP",
        imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
        latitude: 41.8998,
        longitude: -87.6284,
        vibeCategory: "ROOFTOP_VIEWS",
        vibeSummary:
          "Eighteen floors above the Gold Coast, Pandan blends Southeast Asian flavors with sweeping views of Lake Michigan and the Chicago skyline. The cocktails celebrate bold tropical ingredients; the kitchen sends out Filipino-influenced plates that hold their own against the setting. Arrive before sunset.",
        vibeScore: 9.1,
        avgUserVibeScore: 4.7,
        reviewCount: 2,
      },
    }),
  ]);

  // Reviews
  const [lula, mitocaya, billySunday, bestIntentions, schwa, nicks, piece, alinea, northPond, gejas, sparrow, luxbar, pandan] = venues;

  await prisma.review.createMany({
    data: [
      // Lula
      {
        venueId: lula.id,
        authorName: "Sarah K.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "I've been coming here for years and it never loses its warmth. The seasonal menu always surprises me. Brunch is worth the wait every single time.",
        upvotes: 24,
        downvotes: 0,
      },
      {
        venueId: lula.id,
        authorName: "Marcus T.",
        vibeRating: 4,
        comment: "Quintessential Logan Square — the room feels like it belongs to the neighborhood rather than the other way around. Food is consistently excellent.",
        upvotes: 11,
        downvotes: 1,
      },
      {
        venueId: lula.id,
        authorName: "Jordan P.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "The kind of restaurant that made me fall in love with this city. Intimate, creative, and completely unpretentious.",
        upvotes: 18,
        downvotes: 0,
      },

      // Mi Tocaya
      {
        venueId: mitocaya.id,
        authorName: "Elena R.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "Chef Dávila's cooking is genuinely brilliant. The small plates approach means you get to explore the whole menu. The mole alone justifies the trip.",
        upvotes: 31,
        downvotes: 0,
      },
      {
        venueId: mitocaya.id,
        authorName: "Dev M.",
        vibeRating: 5,
        comment: "Took visiting family here and they couldn't stop talking about it afterward. The room is beautiful, the service is warm, the food is extraordinary.",
        upvotes: 14,
        downvotes: 0,
      },

      // Billy Sunday
      {
        venueId: billySunday.id,
        authorName: "Alex C.",
        vibeRating: 5,
        vibeCategory: "TRENDY_HIPSTER",
        comment: "The best cocktail bar in Logan Square, maybe the city. They're not trying to impress you — they just do the work and the results speak for themselves.",
        upvotes: 19,
        downvotes: 1,
      },
      {
        venueId: billySunday.id,
        authorName: "Priya N.",
        vibeRating: 4,
        comment: "The drinks are creative without being gimmicky. I came in knowing nothing about their spirits list and the bartender walked me through it genuinely.",
        upvotes: 9,
        downvotes: 0,
      },

      // Best Intentions
      {
        venueId: bestIntentions.id,
        authorName: "Tom W.",
        vibeRating: 5,
        vibeCategory: "DIVE_BAR",
        comment: "I almost walked past it twice. Inside: great music, $9 drinks, the best smashburger I've had in Chicago, and zero attitude. Come often, tell no one.",
        upvotes: 27,
        downvotes: 0,
      },
      {
        venueId: bestIntentions.id,
        authorName: "Cass L.",
        vibeRating: 4,
        comment: "Feels like the neighborhood bar Logan Square needed but didn't know how to ask for. Cheap, warm, and weirdly excellent.",
        upvotes: 12,
        downvotes: 1,
      },

      // Schwa
      {
        venueId: schwa.id,
        authorName: "Nadia F.",
        vibeRating: 5,
        vibeCategory: "HIDDEN_GEM",
        comment: "I've eaten at Michelin three-stars across the world. Schwa is unlike any of them — funnier, stranger, more personal. The quail egg amuse-bouche set the tone immediately. BYOB with a $100 tasting menu is absurd value.",
        upvotes: 43,
        downvotes: 0,
      },

      // Nick's
      {
        venueId: nicks.id,
        authorName: "Owen B.",
        vibeRating: 4,
        vibeCategory: "LIVELY_ENERGETIC",
        comment: "The beer garden in summer is peak Chicago. Free live music, good drafts, and the kind of crowd that actually lives in the neighborhood. Old school in the best way.",
        upvotes: 16,
        downvotes: 2,
      },
      {
        venueId: nicks.id,
        authorName: "Maya S.",
        vibeRating: 4,
        comment: "A Wicker Park staple. Gets loud and crowded on weekends — that's exactly what it should be. The history of this place is written on the walls.",
        upvotes: 8,
        downvotes: 0,
      },

      // Piece
      {
        venueId: piece.id,
        authorName: "Chris D.",
        vibeRating: 4,
        vibeCategory: "CASUAL_CHILL",
        comment: "The New Haven-style pizza is the real deal — thin, charred, topped generously. The house IPAs are solid. Bring a group, order too much, and stay late.",
        upvotes: 22,
        downvotes: 1,
      },
      {
        venueId: piece.id,
        authorName: "Lily H.",
        vibeRating: 4,
        comment: "Reliably great and always full of life. The room is big and loud and the vibe is exactly right for a Friday night.",
        upvotes: 10,
        downvotes: 0,
      },

      // Alinea
      {
        venueId: alinea.id,
        authorName: "Rachel M.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "We saved for this meal for months. It exceeded every expectation. The edible balloon, the tablecloth dessert, the precision of every single course — it's not dinner, it's theater. Worth it completely.",
        upvotes: 67,
        downvotes: 0,
      },

      // North Pond
      {
        venueId: northPond.id,
        authorName: "James L.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "Proposed here. She said yes. The setting, the service, the food — all of it was perfect. The view of the pond at dusk is something I'll never forget.",
        upvotes: 54,
        downvotes: 0,
      },
      {
        venueId: northPond.id,
        authorName: "Sophie K.",
        vibeRating: 5,
        comment: "The Arts & Crafts building alone is worth the visit. The seasonal menu is elegant and thoughtful, and the service strikes that ideal balance of attentive without being intrusive.",
        upvotes: 21,
        downvotes: 0,
      },

      // Geja's
      {
        venueId: gejas.id,
        authorName: "Marco V.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "My parents took me here as a kid and I brought my wife on our anniversary. It's been exactly the same — in the best way — for decades. The flamenco guitar, the fondue, the candles. Nothing else in Chicago comes close for pure romance.",
        upvotes: 38,
        downvotes: 0,
      },
      {
        venueId: gejas.id,
        authorName: "Ann T.",
        vibeRating: 4,
        comment: "An institution that lives up to its reputation. The cheese fondue is excellent, the chocolate fondue dessert is mandatory. The live music adds something intangible.",
        upvotes: 15,
        downvotes: 1,
      },

      // Sparrow
      {
        venueId: sparrow.id,
        authorName: "Ren C.",
        vibeRating: 5,
        vibeCategory: "TRENDY_HIPSTER",
        comment: "Walked in not knowing what to expect and stayed for three hours. The 1920s bones of the building and the art deco details make every corner photogenic. The rum cocktails are exceptional.",
        upvotes: 29,
        downvotes: 0,
      },
      {
        venueId: sparrow.id,
        authorName: "Kai M.",
        vibeRating: 4,
        comment: "Sophisticated without being cold. The staff knows the cocktail list deeply and the room has a hushed energy that feels rare in Gold Coast.",
        upvotes: 13,
        downvotes: 0,
      },

      // Luxbar
      {
        venueId: luxbar.id,
        authorName: "Dana P.",
        vibeRating: 4,
        vibeCategory: "LIVELY_ENERGETIC",
        comment: "The Gold Coast's living room. Somehow manages to be both a neighborhood spot and a destination. The cocktails are better than you'd expect from a restaurant-bar and the food is solid all the way through.",
        upvotes: 18,
        downvotes: 2,
      },
      {
        venueId: luxbar.id,
        authorName: "Sam B.",
        vibeRating: 4,
        comment: "Reliably fun. Good drinks, good energy, good people-watching. The kind of bar that gets better as the night goes on.",
        upvotes: 11,
        downvotes: 0,
      },

      // Pandan
      {
        venueId: pandan.id,
        authorName: "Isla W.",
        vibeRating: 5,
        vibeCategory: "ROOFTOP_VIEWS",
        comment: "The views alone would justify a visit, but the food and cocktails are genuinely excellent on their own terms. The Philippine-influenced menu is creative and bold. Get there before sunset, stay after.",
        upvotes: 33,
        downvotes: 0,
      },
      {
        venueId: pandan.id,
        authorName: "Felix G.",
        vibeRating: 5,
        comment: "Best rooftop in Chicago by a significant margin. Lake Michigan on one side, skyline on the other. The cocktails are tropical and well-made. Not cheap, but worth it.",
        upvotes: 26,
        downvotes: 0,
      },
    ],
  });

  console.log(`Seeded ${venues.length} Chicago venues with reviews!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
