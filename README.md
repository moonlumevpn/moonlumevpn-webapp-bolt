# Moonlume Web App

Frontend web application for Moonlume, built with React + TypeScript + Vite.

## Requirements

- Node.js 20+
- npm 10+

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with this example:

```env
VITE_API_BASE_URL=https://api.example.com
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

## Deployment

The site is deployed with GitHub Actions to GitHub Pages.

1. Push production-ready commits to the `production` branch.
2. Make sure the repository has GitHub Pages enabled and uses the GitHub Actions source.
3. Set the repository variable `VITE_API_BASE_URL` to the production API base URL if the backend is hosted separately.
4. The workflow will build `dist/` and publish it to Pages automatically.

## Environment Variables

- `VITE_API_BASE_URL` (required for external backend and Pages deploy): backend base URL, e.g. `https://api.example.com`

## Project Structure

```text
src/
  components/   Reusable UI components
  pages/        Route-level pages
  lib/          API/auth/date helpers
  App.tsx       Route switch logic
  main.tsx      App bootstrap
```
