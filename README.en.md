# MAX API Docs

**English** | [Simplified Chinese](./README.md)

The Next.js documentation site for MAX API.

## Install Bun

This project uses Bun to install dependencies and run development and build scripts. The Docker build currently uses Bun 1.3.14. Bun 1.3.14 or a newer compatible version is recommended for local development.

### Linux and macOS

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, reopen the terminal or reload the configuration for your current shell:

```bash
# Bash
source ~/.bashrc

# Zsh
source ~/.zshrc
```

### Windows PowerShell

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Reopen PowerShell after installation. When using WSL, run the Linux installation command above in the WSL terminal.

### macOS Homebrew

You can also install Bun with Homebrew:

```bash
brew tap oven-sh/bun
brew install bun
```

Verify that Bun is available:

```bash
bun --version
```

When deploying with Docker Compose, Bun does not need to be installed on the host. The `Dockerfile` provides the required Bun environment during the image build.

## Local Development

Install dependencies and start the development server:

```bash
bun install
bun dev
```

Open http://localhost:33301 in your browser.

## Production Build

```bash
bun run build
```

## Deploy with Docker

The project provides a multi-stage Docker image based on the MAX API production deployment approach. The runtime image uses Node 22 Alpine, a non-root user, a fixed container port, a health check, and an automatic restart policy. The documentation service does not require PostgreSQL or Redis.

### 1. Configure the Container

```bash
cp .env.docker.example .env.docker
```

Edit `.env.docker` and configure at least the public site URL:

```env
DOCS_PORT=33301
NEXT_PUBLIC_SITE_URL=https://docs.your-domain.com

# Optional: enable the Ask AI assistant
INKEEP_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=https://your-max-api-domain/v1
```

`INKEEP_API_KEY` is injected only as a runtime environment variable when the container starts. It is not passed as a Docker build argument or stored in an image layer. `.env.docker` is excluded by both `.gitignore` and `.dockerignore`; do not commit or upload this file.

Users with root or Docker administrator access to the server can still inspect container runtime environment variables with `docker inspect`. For stricter isolation, use Docker Secrets or an external secret management service.

### 2. Build and Start

```bash
docker compose --env-file .env.docker build
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker ps
```

Default address:

```text
http://127.0.0.1:33301
```

View logs and health status:

```bash
docker compose --env-file .env.docker logs -f max-api-docs
docker inspect --format='{{json .State.Health}}' max-api-docs
```

After pulling new code, rebuild and replace the container:

```bash
git pull
docker compose --env-file .env.docker up -d --build
```

Changes to `NEXT_PUBLIC_SITE_URL` or `NEXT_PUBLIC_GA_ID` require rebuilding the image because Next.js embeds public environment variables at build time. Changes to `INKEEP_API_KEY`, `AI_MODEL`, or `AI_BASE_URL` require only recreating the container.

### 3. Troubleshoot the Linux Build Error

If the following command:

```bash
docker compose --env-file .env.docker build
```

fails during `RUN bun run build` with:

```text
$ tsx scripts/prebuild.ts
error: Cannot find module './cjs/index.cjs' from ''
error: script "prebuild" exited with code 1
```

the failure is caused by a module resolution compatibility issue when Bun 1.3.14 runs the `tsx` CLI on Linux. The project now runs the TypeScript prebuild script directly with Bun. After updating the source, verify that `package.json` contains:

```json
"prebuild": "bun scripts/prebuild.ts"
```

Then bypass the old image build cache and rebuild:

```bash
git pull
docker compose --env-file .env.docker build --no-cache
```

After the build succeeds, start the container and check its status:

```bash
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker ps
docker compose --env-file .env.docker logs --tail=100 max-api-docs
```

The service shown by `ps` should be `running` or `healthy`. If the build still prints `$ tsx scripts/prebuild.ts`, the server is using old source code. Check the current branch, latest commit, and actual contents of `package.json`.

### 4. Use a Published Image

After an image is published to a registry, replace `image: max-api-docs:local` in `docker-compose.yml` with the actual image address and remove the `build` configuration. The container always listens on port `33301` internally.

## Deploy to a VPS without Docker

This project includes server routes such as `/api/chat` and `/api/search`. After running `bun run build`, it must continue running as a Node or Bun service; uploading only the `.next` directory as a static website is not sufficient.

### 1. Prepare the Project

```bash
cd /opt
git clone <your-repository-url> max-api-docs
cd max-api-docs

bun install
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://docs.your-domain.com

# Optional: enable the Ask AI assistant
INKEEP_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=https://your-max-api-domain/v1
```

`.env.local` is excluded by `.gitignore`. Do not commit it or upload it to a public location.

### 2. Build and Run

```bash
bun run build
bun run start
```

The current `start` script listens on port `33301`:

```text
http://127.0.0.1:33301
```

PM2 can keep the service running in production:

```bash
npm i -g pm2
pm2 start "bun run start" --name max-api-docs
pm2 save
pm2 startup
```

### 3. Configure an Nginx Reverse Proxy

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

After changing `.env.local`, restart the running service so that Next.js reloads the environment variables.

## Project Structure

| Path                          | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `src/app/[lang]/(home)`       | Multilingual home page                            |
| `src/app/[lang]/docs`         | Multilingual documentation pages                  |
| `src/app/api/search/route.ts` | Documentation search API                          |
| `src/app/api/chat/route.ts`   | Ask AI assistant API                              |
| `content/docs/`               | MDX documentation content                         |
| `src/lib/source.ts`           | Fumadocs documentation source configuration       |
| `Dockerfile`                  | Multi-stage production image                      |
| `docker-compose.yml`          | Container startup, health check, and port mapping |

## References

- [Next.js documentation](https://nextjs.org/docs)
