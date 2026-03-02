# MoonLume VPN - Web Application

A modern, responsive web application for MoonLume VPN service built with React, TypeScript, and Vite.

## Features

- User authentication (login/register)
- Account management dashboard
- VPN server locations
- Pricing plans and subscriptions
- Traffic monitoring and status tracking
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Linting**: ESLint
- **CSS Processing**: PostCSS

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moonlumevpn-webapp-bolt
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (see Environment Variables section)

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Environment Variables

The frontend reads the API base URL from `VITE_API_BASE_URL`. During development, the
Vite dev server proxies `/api` to `http://localhost:5020`, so you usually don't need
to set it. In production, set it to the full backend origin or leave empty when
calling the same domain (relative paths).

Create a `.env.local` file in the root directory:
```env
VITE_API_BASE_URL=https://api.example.com
```

Or set the variable in your deployment environment.

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── lib/            # Utility functions and helpers
├── App.tsx         # Root component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## License

MIT
