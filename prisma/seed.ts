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
        neighborhood: "Logan Square",
        imageUrl: "https://images.getbento.com/accounts/7ddb4f625c4916181f9d829acbae6562/media/images/73830StockLula_1.jpg?w=1200&fit=max&auto=compress,format&cs=origin",
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
        neighborhood: "Logan Square",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5804f945b3db2bd60e9993c7/1501422786595-DOD4JIBZEHNZD1TLOO3I/opengraph.jpg",
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
        neighborhood: "Logan Square",
        imageUrl: "https://images.getbento.com/accounts/1ac0e85135e0353440f071925938d0c9/media/images/59354Screen_Shot_2022-11-30_at_4.16.29_PM.png?w=1000&fit=max&auto=compress,format&h=1000",
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
        neighborhood: "Avondale",
        imageUrl: "https://i0.wp.com/bcc-newspack.s3.amazonaws.com/uploads/2023/04/BI.jpg?fit=1920%2C1440&ssl=1",
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
        neighborhood: "Wicker Park",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/6865b04d97af6534d1d28b54/08db68ac-bdf3-4133-8f48-38ee14a9c44c/Screenshot+2025-06-10+at+7.06.38%E2%80%AFPM.png",
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
        neighborhood: "Wicker Park",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/58ee6c3fd482e9cd1f9c7e3e/1526228050360-QZP9SYXRD54QMIDQ7EKY/patio.jpg",
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
        neighborhood: "Wicker Park",
        imageUrl: "https://beervisits.beer/images/pub_visit_usa_canada/Illinois/Chicago/Chicago_N_Z/Piece1.jpg",
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
        neighborhood: "Lincoln Park",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/6091adceeec0df416e2b512e/61006ddd-51bf-4d90-801f-aa57b4ffabb5/20171102_alinea_0280.jpg",
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
        neighborhood: "Lincoln Park",
        imageUrl: "https://designdestinations.files.wordpress.com/2010/02/dsc_0955.jpg",
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
        neighborhood: "Lincoln Park",
        imageUrl: "https://www.chicagotribune.com/wp-content/uploads/migration/2022/09/10/ORD6DBN3OBBKLGBWQBWUGNBCDQ.jpg",
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

    // ── RIVER NORTH ───────────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Erie Cafe",
        address: "536 W Erie St",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.eriecafe.com",
        phone: "312-266-2300",
        type: "RESTAURANT",
        neighborhood: "River North",
        imageUrl: "https://dottie.enjoyillinois.com/assets/Tourism-Operators/images/itims/25906_823eeb2ed27c70a62908850966481ae1_featured_v2__FocusFillWyIwLjAwIiwiMC4wMCIsMTIwMCw5MDBd.jpg",
        latitude: 41.8942,
        longitude: -87.6395,
        vibeCategory: "UPSCALE_REFINED",
        vibeSummary:
          "Erie Cafe has anchored River North since 1994 in a converted meat-packing plant that still wears its bones proudly — cedar ceiling, exposed brick, oil paintings, and a clubhouse hush that the room earns rather than performs. The prime steaks are butchered in-house from whole primal cuts and the martinis are serious. Third-generation family-owned and entirely unchanged by trends. The riverside patio in summer is one of the neighborhood's best-kept secrets.",
        vibeScore: 8.9,
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
        neighborhood: "Gold Coast",
        imageUrl: "https://www.chicagotribune.com/wp-content/uploads/migration/2015/11/23/XNJ6DEVAXBDZ7KUMPVN2ZR54NI.jpg",
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
        neighborhood: "Gold Coast",
        imageUrl: "http://www.gayot.com/images/reviews/luxbar-chicago.jpg",
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
        neighborhood: "Gold Coast",
        imageUrl: "https://rddmag.com/images/igallery/resized/new-notable-pandan-chicago-247/vch-pandan-night-overall-1-1000-800-100.jpg",
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

    // ── UKRAINIAN VILLAGE ──────────────────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Kasama",
        address: "1001 N Winchester Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.kasamachicago.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://media.timeout.com/images/105982801/750/562/image.jpg",
        latitude: 41.8998,
        longitude: -87.6753,
        vibeCategory: "UPSCALE_REFINED",
        vibeSummary:
          "The only Filipino restaurant in the United States to hold two Michelin Stars, Kasama is also something of a neighborhood miracle. By day it's a bakery with lines around the block for ube kouign-amann and longganisa breakfast sandwiches. By night, chefs Tim Flores and Genie Kwon serve a 13-course tasting menu that is personal, technically brilliant, and unlike anything else in Chicago. The 2023 James Beard Award for Best Chef Great Lakes confirmed what the neighborhood already knew.",
        vibeScore: 9.7,
        avgUserVibeScore: 4.9,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Feld",
        address: "2018 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.feldrestaurant.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://www.chicagotribune.com/wp-content/uploads/2024/12/CTC-L-FOOD-FELD-REVIEW-122500013_217056082.jpg",
        latitude: 41.8959,
        longitude: -87.6783,
        vibeCategory: "UPSCALE_REFINED",
        vibeSummary:
          "One of the most unusual restaurants to open in Chicago in years, Feld seats guests theater-in-the-round while courses arrive from the center of the room. The menu is written each morning based on what chef Lenny Dobrescu received from his farmers, fishermen, and dairy suppliers that day — no two evenings are the same. A Michelin Star and Green Star earned in 2025, less than 16 months after opening, say everything about the ambition.",
        vibeScore: 9.4,
        avgUserVibeScore: 4.8,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "A Tavola",
        address: "2148 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.atavolachi.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://atavola.sirv.com/images/home/northern-italian-restaurant-chicago.jpg",
        latitude: 41.8959,
        longitude: -87.6815,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "Ukrainian Village's most enduring Italian restaurant has been making the same brown-butter gnocchi since 1995 and has no plans to change it. The ivy-covered room and secluded back patio feel genuinely neighborhood in a way that is harder and harder to find. Chef Dan Bocik sources produce from local organic farms and keeps the menu seasonal and honest. The four-course prix-fixe at $60 is one of the best values in the city.",
        vibeScore: 8.8,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Forbidden Root",
        address: "1746 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.forbiddenroot.com",
        type: "BREWERY",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://forbiddenroot.com/wp-content/uploads/2024/04/Location-Front-west-chicago.webp",
        latitude: 41.8959,
        longitude: -87.6715,
        vibeCategory: "CASUAL_CHILL",
        vibeSummary:
          "Chicago's first botanical brewery occupies a former movie theater with the comfortable confidence of a place that knows its concept is genuinely unusual. The beers are brewed with flowers, spices, and roots that set them apart from anything else in the city. The food clears the brewpub bar by a comfortable margin, the room handles groups well, and the experience rewards curiosity without demanding it.",
        vibeScore: 8.1,
        avgUserVibeScore: 4.4,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Boeufhaus",
        address: "1012 N Western Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.boeufhaus.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/56c78a8df8baf3ae17cecbba/1457472927074-UTK8WIJ3BKXZFC79DSWO/161+interior.jpg",
        latitude: 41.8999,
        longitude: -87.6877,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "A small, loud, copper-and-wood brasserie that blurs the line between French and German without making a fuss about it. The dry-aged steaks are serious, the tartare is excellent, and the room has the compressed intimacy of the best European bistros. Chef Brian Ahern thinks carefully about where everything comes from. The kind of restaurant that becomes your answer when someone asks for a reliable recommendation.",
        vibeScore: 8.9,
        avgUserVibeScore: 4.7,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Sportsman's Club",
        address: "948 N Western Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.drinkingandgathering.com",
        type: "BAR",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/545ab50ae4b08f126429eace/1483999580655-97W5QT0ZYX0X7U0IFH1R/028+Sportsmans+Club.jpg",
        latitude: 41.8988,
        longitude: -87.6877,
        vibeCategory: "HIDDEN_GEM",
        vibeSummary:
          "The cocktail menu changes daily, the drinks are spirit-forward and classically built, and the bar — restored art deco fixtures, vintage taxidermy, an antique cash register — looks like it was found, not designed. Sportsman's Club is a genuine industry hangout with none of the attitude that usually comes with that. The back patio is a summer secret worth keeping. This is the kind of bar that makes a neighborhood.",
        vibeScore: 8.7,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "The Empty Bottle",
        address: "1035 N Western Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.emptybottle.com",
        type: "BAR",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5486852ae4b00adc4f6f0ab6/1511906042692-YI6MU9U4U4ESWFIKAZ5T/empty_bottle_10.jpg",
        latitude: 41.9004,
        longitude: -87.6877,
        vibeCategory: "LIVELY_ENERGETIC",
        vibeSummary:
          "Since 1993, the Empty Bottle has hosted the bands that mattered to Chicago before they mattered anywhere else. The room is dark and close, the sound is good, the beer selection is honest, and the booking spans indie rock, punk, experimental, jazz, and everything in between. More than a bar or a venue, it is thirty years of proof that Ukrainian Village has one of the most distinctive cultural identities in the city.",
        vibeScore: 7.8,
        avgUserVibeScore: 4.3,
        reviewCount: 2,
      },
    }),

    // ── UKRAINIAN VILLAGE (continued) ──────────────────────────────────────────

    prisma.venue.create({
      data: {
        name: "Tryzub Ukrainian Kitchen",
        address: "2201 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://tryzubchicago.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://tryzubchicago.com/wp-content/uploads/2022/12/Varenyky3.png",
        latitude: 41.8957,
        longitude: -87.6822,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "The Ukrainian Village's most visible celebration of Ukrainian culture, Tryzub serves the neighborhood's most photogenic varenyky — hand-stretched, tinted with vegetable juices, and filled with potato, mushroom, or sweet cheese. The four-story brick facade bears the world's largest tryzub symbol; the dining room is warm with antique frames, murals of Kyiv, and book-lined shelves. House-infused horilka anchors a cocktail menu that is distinctly Ukrainian. Family-owned and genuinely community-driven.",
        vibeScore: 8.7,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Old Lviv",
        address: "2228 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://oldlvivchicago.mybistro.online",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://res.cloudinary.com/the-infatuation/image/upload/q_auto,f_auto/images/OldLviv_Interior_KimKovacik_Chicago_03_zyhjos",
        latitude: 41.8957,
        longitude: -87.6837,
        vibeCategory: "HIDDEN_GEM",
        vibeSummary:
          "Six tables, cash preferred, and a buffet that hasn't changed in decades — Old Lviv operates like a grandmother's kitchen that happens to be open to the public. The borscht is rich and honest, the varenyky are made in-house, and the $18 all-you-can-eat lunch draws the same regulars it always has. Nothing about the room is designed; everything about it is real. One of Chicago's last true Ukrainian buffet restaurants.",
        vibeScore: 8.0,
        avgUserVibeScore: 4.4,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Shokolad Pastry & Cafe",
        address: "2524 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.shokoladpastryandcafe.com",
        phone: "773-276-6402",
        type: "CAFE",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://res.cloudinary.com/the-infatuation/image/upload/q_auto,f_auto/images/Shokolad_Exterior_KimKovacik_Chicago_02_x2hnli",
        latitude: 41.8961,
        longitude: -87.6870,
        vibeCategory: "COZY_INTIMATE",
        vibeSummary:
          "A Ukrainian bakery that has been perfecting its crepes, pastries, and varenyky since the neighborhood was still predominantly Ukrainian-speaking. The room is small and unhurried — jazz plays softly, the coffee is good, and the pastry case has earned a national television feature on WTTW's Check Please. The kind of place that makes you want to sit longer than you planned.",
        vibeScore: 8.3,
        avgUserVibeScore: 4.5,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Lao Peng You",
        address: "2020 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.oldfriendchicago.com",
        type: "RESTAURANT",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5e702767e3faaf7c51dfb0d6/9e906a27-11bd-4304-9a5b-54df7433f753/Dumplings-ChiliOil.jpg",
        latitude: 41.8961,
        longitude: -87.6779,
        vibeCategory: "HIDDEN_GEM",
        vibeSummary:
          "Two half-Chinese brothers making fresh dough daily for some of the best hand-pulled noodles and dumplings in the city — at a ten-table BYOB in Ukrainian Village. Text your name to the waitlist, bring a beer, and order the Dan Dan noodles and pork-chive dumplings with chili oil. No reservations, no pretense, and no reason not to come back three weeks in a row.",
        vibeScore: 8.6,
        avgUserVibeScore: 4.6,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "All Together Now",
        address: "2119 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://alltogethernow.fun",
        phone: "773-661-1599",
        type: "BAR",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5a084fb0d55b418f042dbe77/1626806516180-ITLIDXJ4MP5S5S3QFXGK/Food+and+Drink+In+Chicago+-+All+Together+Now",
        latitude: 41.8959,
        longitude: -87.6805,
        vibeCategory: "TRENDY_HIPSTER",
        vibeSummary:
          "Half natural wine shop, half restaurant, half cheese counter — All Together Now is exactly the kind of spot that makes Ukrainian Village feel distinct. Housemade bagels, local dairy, charcuterie boards, and Upper Midwest farm provisions are all built for lingering. The wine selection is adventurous without being exclusionary, and the communal format rewards coming with people you like.",
        vibeScore: 8.5,
        avgUserVibeScore: 4.5,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Nettare",
        address: "1953 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.barnettare.com",
        phone: "312-219-5101",
        type: "CAFE",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/66aa5ab17697b57e22c4ab65/e3cc3748-d618-42f5-8527-68c6fcec11b6/Nettare_-27.jpg",
        latitude: 41.8958,
        longitude: -87.6762,
        vibeCategory: "CASUAL_CHILL",
        vibeSummary:
          "Opens at 7am as a specialty coffee shop and all-day market; pivots at dinner into a proper restaurant with a sommelier-curated list of Great Lakes wines and spirits. The sun-filled room is genuinely comfortable for working during the day and genuinely good for a date at night — a balance very few places manage. The kitchen runs a tight, seasonal Midwest menu sourced from local farms and doesn't overreach.",
        vibeScore: 8.3,
        avgUserVibeScore: 4.4,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Golden Years",
        address: "1938 W Chicago Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.goldenyearschicago.com",
        phone: "773-697-9222",
        type: "BAR",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://www.chicagomag.com/wp-content/uploads/2025/01/GOLDEN-YEARS-00103-RF.jpg",
        latitude: 41.8958,
        longitude: -87.6758,
        vibeCategory: "TRENDY_HIPSTER",
        vibeSummary:
          "Named one of Chicago Magazine's Best New Bars of 2025, Golden Years runs a 70s rock-and-blues aesthetic — brown leather, dark wood, era-evoking low light — in a 2,000-square-foot room that fills up early on weekends. The hand-crafted cocktails are serious, daily happy hour keeps it accessible, and the kitchen next door sends over a Thousand Island-dressed burger worth staying for.",
        vibeScore: 8.5,
        avgUserVibeScore: 4.5,
        reviewCount: 2,
      },
    }),

    prisma.venue.create({
      data: {
        name: "Star Bar Chicago",
        address: "853 N Western Ave",
        city: "Chicago",
        state: "IL",
        country: "US",
        website: "https://www.starbarchicago.com",
        phone: "773-395-3002",
        type: "BAR",
        neighborhood: "Ukrainian Village",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/60c0076e65d57a47e1eb54d6/04ad8df6-99a2-4248-9f8a-ff549a95fc17/Sb5.JPG",
        latitude: 41.8966,
        longitude: -87.6877,
        vibeCategory: "CASUAL_CHILL",
        vibeSummary:
          "A two-level neighborhood tavern with a dog-friendly patio, pool tables, and a craft cocktail program that takes the work seriously without announcing it. The beer list skews imported and interesting, the prices are neighborhood-appropriate, and the patio on Western Avenue is one of the better outdoor spots in the area. The kind of bar that becomes your default when someone asks where to go.",
        vibeScore: 7.9,
        avgUserVibeScore: 4.2,
        reviewCount: 2,
      },
    }),
  ]);

  // Reviews
  const [lula, mitocaya, billySunday, bestIntentions, schwa, nicks, piece, alinea, northPond, gejas, erieCafe, sparrow, luxbar, pandan, kasama, feld, atavola, forbiddenRoot, boeufhaus, sportsmanClub, emptyBottle, tryzub, oldLviv, shokolad, laoPengYou, allTogetherNow, nettare, goldenYears, starBar] = venues;

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

      // Erie Cafe
      {
        venueId: erieCafe.id,
        authorName: "Patrick H.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "The kind of steakhouse Chicago does better than anywhere else. Cedar ceiling, brick walls, white tablecloths — it's exactly what it should be and has been for thirty years. The ribeye is perfect, the service is polished, and the riverfront patio in summer is an absolute revelation.",
        upvotes: 34,
        downvotes: 0,
      },
      {
        venueId: erieCafe.id,
        authorName: "Carol M.",
        vibeRating: 5,
        comment: "Third-generation family-owned and you feel it immediately — the servers know their regulars, the menu doesn't chase trends, and the quality is completely consistent. This is what a classic Chicago steakhouse should be.",
        upvotes: 18,
        downvotes: 0,
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

      // Kasama
      {
        venueId: kasama.id,
        authorName: "Miriam A.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "The daytime bakery is already worth a special trip — the ube kouign-amann is unlike anything I've had in this city. But the tasting menu at night is something else entirely. Tim and Genie cook like they have nothing to prove and everything to share. Thirteen courses, every one of them personal. The James Beard and two Michelin Stars are absolutely deserved.",
        upvotes: 72,
        downvotes: 0,
      },
      {
        venueId: kasama.id,
        authorName: "Diego S.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "I've eaten at Michelin-starred restaurants across the US and Europe. Kasama is the most personal meal I've had at any of them. You feel the care in every dish. The longganisa sandwiches at brunch are worth a separate visit.",
        upvotes: 41,
        downvotes: 0,
      },

      // Feld
      {
        venueId: feld.id,
        authorName: "Claire B.",
        vibeRating: 5,
        vibeCategory: "UPSCALE_REFINED",
        comment: "The theater-in-the-round seating felt strange for about thirty seconds and then made perfect sense. Watching the kitchen work at the center of the room while eating what arrived from it is genuinely immersive. No menu until it arrives at the table — just trust. The meal earned it completely.",
        upvotes: 38,
        downvotes: 0,
      },
      {
        venueId: feld.id,
        authorName: "Peter W.",
        vibeRating: 5,
        comment: "The Green Star alongside the Michelin Star is the point — the sourcing here is serious and you taste it. No two menus are the same. I went twice in two months and both meals were completely different. The format shouldn't work but it does.",
        upvotes: 22,
        downvotes: 1,
      },

      // A Tavola
      {
        venueId: atavola.id,
        authorName: "Rosa M.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "Thirty years and the gnocchi still hits the same way it did the first time I came with my parents as a kid. The room is tiny, the patio is beautiful in summer, and the four-course prix-fixe is the best deal in the neighborhood. Ukrainian Village's most reliable restaurant.",
        upvotes: 44,
        downvotes: 0,
      },
      {
        venueId: atavola.id,
        authorName: "Noah K.",
        vibeRating: 4,
        comment: "Exactly what a neighborhood Italian restaurant should be and rarely is. Unfussy, seasonal, and genuinely good. The back patio on a warm night is hard to beat.",
        upvotes: 19,
        downvotes: 0,
      },

      // Forbidden Root
      {
        venueId: forbiddenRoot.id,
        authorName: "Anna T.",
        vibeRating: 4,
        vibeCategory: "CASUAL_CHILL",
        comment: "I came in skeptical about botanical beers and left a convert. The hibiscus saison and the elderflower pale ale are both excellent. The space — a former movie theater — is big enough that it never feels crowded even when it's busy. Good for groups.",
        upvotes: 28,
        downvotes: 2,
      },
      {
        venueId: forbiddenRoot.id,
        authorName: "Carlos R.",
        vibeRating: 4,
        comment: "The duck confit on the food menu is better than it needs to be at a brewery, which sets the tone for the whole place. An honest, interesting, well-run spot.",
        upvotes: 14,
        downvotes: 0,
      },

      // Boeufhaus
      {
        venueId: boeufhaus.id,
        authorName: "Lena F.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "The 55-day aged ribeye is the reason people come but the reason they come back is the room — small, loud in the best way, and European in feeling. The tartare is excellent and the wine list is thoughtful. This is a date restaurant that doesn't feel like it's trying to be one.",
        upvotes: 36,
        downvotes: 0,
      },
      {
        venueId: boeufhaus.id,
        authorName: "Marcus H.",
        vibeRating: 5,
        comment: "More bistro than steakhouse, which is exactly right. Brian Ahern cooks with conviction and the sourcing shows. The tasting menu option is worth exploring if you want the full experience.",
        upvotes: 21,
        downvotes: 0,
      },

      // Sportsman's Club
      {
        venueId: sportsmanClub.id,
        authorName: "Jamie O.",
        vibeRating: 5,
        vibeCategory: "HIDDEN_GEM",
        comment: "The daily-changing cocktail menu sounds like a gimmick until you taste what they put in front of you. Spirit-forward, balanced, and made by people who clearly know what they're doing. The taxidermy and restored bar feel genuinely old rather than stylized. A real neighborhood bar for adults.",
        upvotes: 31,
        downvotes: 0,
      },
      {
        venueId: sportsmanClub.id,
        authorName: "Yuki N.",
        vibeRating: 4,
        comment: "The back patio is a proper secret. I've been recommending this bar to everyone I know who visits Chicago and it hasn't disappointed anyone yet.",
        upvotes: 17,
        downvotes: 0,
      },

      // The Empty Bottle
      {
        venueId: emptyBottle.id,
        authorName: "Ben H.",
        vibeRating: 4,
        vibeCategory: "LIVELY_ENERGETIC",
        comment: "Thirty years of booking the right bands before anyone else knew they mattered. The room is small, the sound is better than you'd expect, and the beer selection is straight-ahead and honestly priced. A Chicago institution that earns the title every week.",
        upvotes: 45,
        downvotes: 1,
      },
      {
        venueId: emptyBottle.id,
        authorName: "Tara J.",
        vibeRating: 4,
        comment: "No venue in the city has introduced me to more music I now love. The booking is adventurous, the vibe is unpretentious, and it still feels like a local secret even though it's been here for three decades.",
        upvotes: 29,
        downvotes: 0,
      },

      // Tryzub
      {
        venueId: tryzub.id,
        authorName: "Oksana V.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "As a Ukrainian-American, this place means everything to me. The varenyky are made with real care — the colored dough alone shows how seriously they take the craft. The horilka flights are a great way to start, and the Chicken Kyiv is the best I've had outside my grandmother's kitchen. A true community anchor.",
        upvotes: 51,
        downvotes: 0,
      },
      {
        venueId: tryzub.id,
        authorName: "Patrick L.",
        vibeRating: 5,
        comment: "Came in knowing nothing about Ukrainian food and left with a new favorite restaurant. The staff walked us through every dish without being condescending. The room is warm and full of history. Booked a second reservation before we left.",
        upvotes: 32,
        downvotes: 0,
      },

      // Old Lviv
      {
        venueId: oldLviv.id,
        authorName: "Halyna B.",
        vibeRating: 5,
        vibeCategory: "HIDDEN_GEM",
        comment: "My family has been coming here since I was a child. The borscht tastes exactly the same as it always has — deep, earthy, perfect. The buffet is the best deal in Ukrainian Village and the staff recognizes regulars by name. Bring cash.",
        upvotes: 38,
        downvotes: 0,
      },
      {
        venueId: oldLviv.id,
        authorName: "Sam R.",
        vibeRating: 4,
        comment: "The Infatuation sent me here and I can't believe I waited this long. Six tables, an $18 all-you-can-eat, and the most comforting food I've had in Chicago. This is what neighborhood dining is supposed to feel like.",
        upvotes: 22,
        downvotes: 1,
      },

      // Shokolad
      {
        venueId: shokolad.id,
        authorName: "Iryna M.",
        vibeRating: 5,
        vibeCategory: "COZY_INTIMATE",
        comment: "The crepes are extraordinary — thin, perfectly cooked, filled with real fruit or savory ingredients. The coffee is excellent and the pastry case is always full of things I've never seen anywhere else. The kind of cafe that makes you want to become a regular.",
        upvotes: 33,
        downvotes: 0,
      },
      {
        venueId: shokolad.id,
        authorName: "Derek W.",
        vibeRating: 4,
        comment: "I came for the Check Please recommendation and stayed for the atmosphere. Quietly playing jazz, the smell of fresh pastry, and a window seat — this place is exactly what a neighborhood cafe should be.",
        upvotes: 19,
        downvotes: 0,
      },

      // Lao Peng You
      {
        venueId: laoPengYou.id,
        authorName: "Michelle C.",
        vibeRating: 5,
        vibeCategory: "HIDDEN_GEM",
        comment: "The pork-and-chive dumplings with chili oil are as good as anything I've had in Chicago's Chinatown. The text waitlist is a bit chaotic but worth it. Bring your own beer, order everything, and don't make any plans afterward — you'll want to stay.",
        upvotes: 44,
        downvotes: 0,
      },
      {
        venueId: laoPengYou.id,
        authorName: "Greg T.",
        vibeRating: 5,
        comment: "Dan Dan noodles that could compete with anything in New York or LA, at a ten-table BYOB in Ukrainian Village. The brothers running this place are clearly cooking from conviction. One of the most exciting small restaurants in the city.",
        upvotes: 28,
        downvotes: 0,
      },

      // All Together Now
      {
        venueId: allTogetherNow.id,
        authorName: "Claire O.",
        vibeRating: 5,
        vibeCategory: "TRENDY_HIPSTER",
        comment: "The natural wine selection is genuinely curated — not just trendy labels but bottles that are interesting and drinkable. The cheese counter is excellent, the bagels are housemade, and the whole place has a warmth that wine shops often lack. My go-to for a bottle before dinner or a lazy Sunday afternoon.",
        upvotes: 36,
        downvotes: 0,
      },
      {
        venueId: allTogetherNow.id,
        authorName: "Jordan K.",
        vibeRating: 4,
        comment: "Funky, smart, and completely unpretentious. The staff knows their producers without making you feel bad for not knowing yours. The housemade crackers and local honey board is a standout. Ukrainian Village is lucky to have this place.",
        upvotes: 21,
        downvotes: 1,
      },

      // Nettare
      {
        venueId: nettare.id,
        authorName: "Anna B.",
        vibeRating: 4,
        vibeCategory: "CASUAL_CHILL",
        comment: "I work from here two mornings a week — the coffee is excellent and the WiFi actually works. Then I come back with my partner for dinner and it feels like a completely different place. The walleye special was the best thing I ate in Ukrainian Village last fall.",
        upvotes: 27,
        downvotes: 0,
      },
      {
        venueId: nettare.id,
        authorName: "Thomas H.",
        vibeRating: 4,
        comment: "The Great Lakes wine and beer focus is a great concept and the execution is thoughtful. Small menu but everything on it is carefully made. The sun coming through the front windows in the morning makes this the most pleasant room on the block.",
        upvotes: 15,
        downvotes: 0,
      },

      // Golden Years
      {
        venueId: goldenYears.id,
        authorName: "Zoe R.",
        vibeRating: 5,
        vibeCategory: "TRENDY_HIPSTER",
        comment: "Chicago Magazine called it right — this is one of the best new bars of the year. The 70s aesthetic doesn't feel forced at all; it feels found. The cocktail with mezcal and bittersweet chocolate was one of the best drinks I've had this year. Happy hour every day is a gift.",
        upvotes: 39,
        downvotes: 0,
      },
      {
        venueId: goldenYears.id,
        authorName: "Marcus D.",
        vibeRating: 4,
        comment: "The burger from Dante's next door is worth ordering alone. The room fills up fast on weekends — get there early if you want a good table. The bartenders are friendly and don't rush you. Already a neighborhood institution after just a year.",
        upvotes: 23,
        downvotes: 1,
      },

      // Star Bar
      {
        venueId: starBar.id,
        authorName: "Kelly N.",
        vibeRating: 4,
        vibeCategory: "CASUAL_CHILL",
        comment: "The patio is the reason I keep coming back in summer — dog-friendly, shaded, and never too crowded. The craft cocktails punch above a neighborhood bar's usual weight. Reliable and genuinely welcoming.",
        upvotes: 18,
        downvotes: 0,
      },
      {
        venueId: starBar.id,
        authorName: "Owen S.",
        vibeRating: 4,
        comment: "Pool tables, a solid imported beer list, and the kind of two-level layout that means you can always find a quiet corner even when it's busy. Exactly what a neighborhood bar should be.",
        upvotes: 11,
        downvotes: 0,
      },
    ],
  });

  console.log(`Seeded ${venues.length} Chicago venues with reviews!`); // 29 venues
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
