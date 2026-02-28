# VibeCheque

**Rate the vibe, not just the food.**

VibeCheque is a restaurant and bar discovery platform focused on atmosphere and vibe. An AI agent analyzes each venue and assigns it one of 10 vibe categories, while the community adds their own ratings and reviews.

## Features

- **AI Vibe Analysis** — Claude analyzes venue info and generates a vibe summary + category
- **10 Vibe Categories** — Cozy & Intimate, Lively & Energetic, Upscale & Refined, Casual & Chill, Trendy & Hipster, Family Friendly, Sports Bar, Dive Bar, Rooftop Vibes, Hidden Gem
- **Community Reviews** — Users submit vibe ratings (1-5 stars) with comments and category tags
- **Upvote/Downvote** — Vote on the most helpful community reviews
- **Search & Filter** — Search by name/city, filter by vibe category
- **Add Venues** — Anyone can add a restaurant or bar and trigger AI analysis

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | SQLite via Prisma 5 |
| AI | Anthropic Claude (claude-opus-4-5) |
| Icons | Lucide React |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Edit `.env` and set your Anthropic API key:

```env
DATABASE_URL="file:./prisma/dev.db"
ANTHROPIC_API_KEY="your-key-here"
```

### 3. Set up database

```bash
npm run db:migrate
```

This creates the SQLite database, runs migrations, and seeds 6 sample venues with reviews.

### 4. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Database Commands

```bash
npm run db:migrate   # Run migrations + seed
npm run db:seed      # Re-run seed only
npm run db:studio    # Open Prisma Studio (GUI)
npm run db:reset     # Reset DB and re-seed
```

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/venues | List venues (supports ?q=, ?category=, ?city=) |
| POST | /api/venues | Add a new venue |
| GET | /api/venues/:id | Get venue with reviews |
| POST | /api/venues/:id/analyze | Run AI vibe analysis |
| POST | /api/venues/:id/reviews | Submit a review |
| POST | /api/reviews/:id/vote | Upvote or downvote a review |

## Vibe Categories

| Key | Label | Emoji |
|---|---|---|
| COZY_INTIMATE | Cozy & Intimate | Candle |
| LIVELY_ENERGETIC | Lively & Energetic | Lightning |
| UPSCALE_REFINED | Upscale & Refined | Sparkles |
| CASUAL_CHILL | Casual & Chill | Sunglasses |
| TRENDY_HIPSTER | Trendy & Hipster | Camera |
| FAMILY_FRIENDLY | Family Friendly | Family |
| SPORTS_BAR | Sports Bar | Trophy |
| DIVE_BAR | Dive Bar | Beer |
| ROOFTOP_VIEWS | Rooftop Vibes | Cityscape |
| HIDDEN_GEM | Hidden Gem | Diamond |

## Deployment

Ready for Vercel. For production, swap SQLite for PostgreSQL by updating `DATABASE_URL` and the Prisma `provider` to `postgresql`.
