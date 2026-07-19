# MAX API Docs

A Next.js documentation site for MAX API.

## Development

Run the development server:

```bash
bun install

bun dev
```

Open http://localhost:33301 with your browser to see the result.

## Build

Build the application for production:

```bash
bun run build
```

## Deploy on a VPS

This project is a Next.js application with server routes such as `/api/chat`
and `/api/search`, so it should be deployed as a running Node/Bun service after
`bun run build`. Do not deploy only the `.next` directory.

### 1. Prepare the project

```bash
cd /opt
git clone <your-repository-url> max-api-docs
cd max-api-docs

bun install
cp env.example .env.local
```

Edit `.env.local` for your deployment:

```env
NEXT_PUBLIC_SITE_URL=https://docs.your-domain.com

# Optional: enable the Ask AI assistant
INKEEP_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=https://your-max-api-domain/v1
```

Keep `.env.local` private. It is ignored by `.gitignore` and should not be
committed or uploaded to public locations.

### 2. Build and run

```bash
bun run build
bun run start
```

The current `start` script listens on port `33301`:

```text
http://127.0.0.1:33301
```

For long-running production use, run it with a process manager such as PM2:

```bash
npm i -g pm2
pm2 start "bun run start" --name max-api-docs
pm2 save
pm2 startup
```

### 3. Reverse proxy with Nginx

```nginx
server {
    listen 80;
    server_name docs.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:33301;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After changing `.env.local`, restart the running service so Next.js can read the
new environment variables.

## Project Structure

| Path                      | Description                  |
| ------------------------- | ---------------------------- |
| `app/(home)`              | Landing page and home pages  |
| `app/[lang]/docs`         | Documentation pages (i18n)   |
| `app/api/search/route.ts` | Search API endpoint          |
| `content/docs/`           | Documentation content (MDX)  |
| `lib/source.ts`           | Content source configuration |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
