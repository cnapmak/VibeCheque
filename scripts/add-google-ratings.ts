import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GOOGLE_RATINGS: Record<string, number> = {
  // Logan Square
  "Lula Cafe": 4.5,
  "Mi Tocaya Antojería": 4.5,
  "Billy Sunday": 4.4,
  "Best Intentions": 4.3,
  // Wicker Park
  "Schwa": 4.5,
  "Nick's Beer Garden": 4.3,
  "Piece Brewery & Pizza": 4.5,
  // Lincoln Park
  "Alinea": 4.7,
  "North Pond": 4.5,
  "Geja's Cafe": 4.5,
  // River North
  "Erie Cafe": 4.4,
  // Gold Coast
  "Sparrow": 4.3,
  "LUXBAR": 4.3,
  "Pandan": 4.5,
  // Kasama
  "Kasama": 4.7,
  // Ukrainian Village
  "Feld Restaurant": 4.4,
  "A Tavola": 4.5,
  "Forbidden Root": 4.3,
  "Boeufhaus": 4.5,
  "Sportsman's Club": 4.3,
  "The Empty Bottle": 4.4,
  "Tryzub Ukrainian Kitchen": 4.5,
  "Old Lviv Restaurant": 4.4,
  "Shokolad Pastry & Cafe": 4.6,
  "Lao Peng You": 4.5,
  "All Together Now": 4.4,
  "Nettare": 4.4,
  "Golden Years": 4.3,
  "Star Bar Chicago": 4.2,
  // West Loop
  "Girl & the Goat": 4.5,
  "Au Cheval": 4.4,
  "The Publican": 4.6,
  "avec": 4.5,
  "Green Street Smoked Meats": 4.5,
  "Smyth": 4.7,
  "Soho House Chicago": 4.2,
  "Lone Wolf": 4.2,
  // Pilsen
  "The Tonk": 4.3,
  "Carnitas Uruapan": 4.6,
  "HaiSous Vietnamese Kitchen": 4.6,
  "5 Rabanitos": 4.7,
  "Punch House": 4.5,
  "Alulu Brewpub": 4.5,
  // Andersonville
  "Hopleaf Bar": 4.6,
  "Nobody's Darling": 4.5,
  "Little Bad Wolf": 4.4,
  "Big Jones": 4.5,
  "Anteprima": 4.5,
  "Simon's Tavern": 4.4,
  // Lakeview
  "Pequod's Pizza": 4.6,
  "Gman Tavern": 4.5,
  "Pilot Project Brewing": 4.5,
  "Figo Wine Bar": 4.4,
  // Bucktown
  "Le Bouchon": 4.5,
  "Handlebar": 4.5,
  "Club Lucky": 4.4,
};

async function main() {
  let updated = 0;
  for (const [name, rating] of Object.entries(GOOGLE_RATINGS)) {
    const result = await prisma.venue.updateMany({ where: { name }, data: { googleRating: rating } });
    if (result.count > 0) updated++;
    else console.warn(`  Not found: "${name}"`);
  }
  console.log(`Updated ${updated}/${Object.keys(GOOGLE_RATINGS).length} venues with Google ratings.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
