# Moonlume VPN Web App

Frontend web application for Moonlume VPN, built with React + TypeScript + Vite.

## Requirements

- Node.js 20+
- npm 10+
- Docker (optional, for containerized production)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with this example:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_TELEGRAM_SUPPORT_URL=https://t.me/moonlume_support
VITE_TELEGRAM_BOT_URL=https://t.me/moonlume_support
WEBAPP_PORT=4000
```

3. Run development server:

```bash
npm run dev
```

App runs on `http://127.0.0.1:8000`.

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Build production bundle into `dist/`
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checks

## Development Notes

- API base URL comes from `VITE_API_BASE_URL`.
- If `VITE_API_BASE_URL` is empty, requests use relative paths (same origin).
- Dev proxy settings are in `vite.config.ts`.

## Production (Without Docker)

1. Build:

```bash
npm run build
```

2. Serve static files from `dist/` with any web server (Nginx, Caddy, Apache, `serve`, etc.).

Example with `serve`:

```bash
npx serve -s dist -l 4000
```

## Docker Build + Run

Build image:

```bash
docker build -t moonlumevpn-webapp-bolt:latest \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  .
```

Run container:

```bash
docker run -d --name moonlume-webapp -p 4000:4000 moonlumevpn-webapp-bolt:latest
```

## Docker Compose (Production)

1. Ensure `.env` exists (use the example in Quick Start).
2. Build and run:

```bash
docker compose up -d --build
```

3. Stop:

```bash
docker compose down
```

Compose file: `docker-compose.yml`

## Environment Variables

- `VITE_API_BASE_URL` (required for external backend): backend base URL, e.g. `https://api.example.com`
- `VITE_TELEGRAM_SUPPORT_URL` (optional): Telegram support link used on temporary redirect page
- `VITE_TELEGRAM_BOT_URL` (optional): Telegram bot link used on temporary redirect page
- `WEBAPP_PORT` (optional): host port for Docker Compose, default `4000`

## Project Structure

```text
src/
  components/   Reusable UI components
  pages/        Route-level pages
  lib/          API/auth/date helpers
  App.tsx       Route switch logic
  main.tsx      App bootstrap
```
