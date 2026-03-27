# City of Saints

A modern church website for **City of Saints** (*Miasto Świętych*), a Protestant evangelical church in Łódź, Poland.

Built with **Next.js** (frontend) and **Strapi CMS** (headless backend), powered by **PostgreSQL**.

## Architecture

```
├── cms/          # Strapi v5 CMS (TypeScript)
├── frontend/     # Next.js 16 (App Router, Tailwind CSS, Framer Motion)
└── docker-compose.yml
```

## Quick Start

### Prerequisites
- Node.js 22 (LTS)
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### 1. Clone & Configure

```bash
cp .env.example .env
# Edit .env with your secrets (see instructions in the file)
```

### 2. Start with Docker

```bash
docker compose up --build
```

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

### 3. Local Development (without Docker)

```bash
# Terminal 1 — Database
docker run -d --name cos-db -p 5432:5432 \
  -e POSTGRES_DB=church_cms \
  -e POSTGRES_USER=strapi \
  -e POSTGRES_PASSWORD=your_password \
  postgres:16-alpine

# Terminal 2 — Strapi CMS
cd cms && npm install && npm run develop

# Terminal 3 — Frontend
cd frontend && npm install && npm run dev
```

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Visit | `/visit` |
| About | `/about` |
| Give | `/give` |
| Events | `/events` |
| Event Detail | `/events/[slug]` |
| Registration | `/events/[slug]/register` |
| Sermons | `/media/sermons` |
| Articles | `/media/articles` |
| Sermon Detail | `/sermons/[slug]` |
| Article Detail | `/articles/[slug]` |
| Sermon Series | `/sermon-series/[slug]` |
| Ministry | `/ministries/[slug]` |
| Location | `/locations/[slug]` |
| Team | `/team` |
| Get Involved | `/get-involved` |
| Facilities | `/facilities` |
| Videos | `/media/videos` |
| Music | `/media/music` |
| Podcasts | `/media/podcasts` |
| Resources | `/media/resources` |

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **CMS**: Strapi v5 (TypeScript)
- **Database**: PostgreSQL 16
- **Icons**: Lucide React
- **Fonts**: Playfair Display, Inter, DM Sans

## Deployment

### Recommended: Azure Container Apps
See `docker-compose.yml` for the production container setup.

### Environment Variables
Copy `.env.example` and generate all secrets before deploying. Never commit `.env` files.

## License

MIT
