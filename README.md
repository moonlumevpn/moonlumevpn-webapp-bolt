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

### Docker (optional for deployment)

To build or run the project in a container you'll need Docker installed on your machine.
For Debian/Ubuntu systems the easiest way is:

```bash
sudo apt-get update
sudo apt-get install -y docker.io
```

On other distributions or platforms, follow the official
[Docker installation guide](https://docs.docker.com/get-docker/).

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

## Docker Deployment

These steps show how to run the production build inside a Linux Docker container. An official image is published to GitHub Container Registry, but you can also build your own using the included `Dockerfile`.

### 1. Using the published image

1. **Pull the image** (replace the tag with the one you need):
   ```bash
   docker pull ghcr.io/moonlumevpn/moonlumevpn-webapp-bolt:develop-6e87116
   ```

2. **Run the container** exposing a port and (optionally) setting environment variables:
   ```bash
   docker run -d --name moonlume-webapp \
     -p 4000:4000 \
     -e VITE_API_BASE_URL="https://api.example.com" \
     ghcr.io/moonlumevpn/moonlumevpn-webapp-bolt:develop-6e87116
   ```
   - `-p 4000:4000` maps the container's HTTP port to the host. Change as needed.
   - `VITE_API_BASE_URL` configures the API endpoint; omit or set to a relative path if the backend is served from the same origin.

3. **Verify** by opening `http://localhost:4000` in your browser (or the host IP if deploying to a remote machine).

4. To stop/remove the container:
   ```bash
   docker stop moonlume-webapp && docker rm moonlume-webapp
   ```

### 2. Building your own image

If you prefer to build locally (for CI or custom tagging):

```bash
# build the production image
docker build -t moonlumevpn-webapp-bolt:latest .

# run it as above
docker run -d --name moonlume-webapp -p 4000:4000 \
  -e VITE_API_BASE_URL="https://api.example.com" \
  moonlumevpn-webapp-bolt:latest
```

The `Dockerfile` performs a multi-stage build:

- **builder stage** uses Node 20 to install dependencies and run `npm run build`.
- **production stage** installs `serve` and copies the compiled `dist` directory.

### Notes

- The container listens on port `4000` by default; change the `EXPOSE` port or the `-l` argument in `CMD` if needed.
- Since this is a static front‑end, environment variables must be baked in at build time or passed via the `VITE_*` prefix as shown.

---

### Using docker compsoe

create docker-compose.yml
```yml
version: '3.8'

services:
  moonlume-webapp:
    image: ghcr.io/moonlumevpn/moonlumevpn-webapp-bolt:develop-6e87116
    container_name: moonlume-webapp
    ports:
      - "4000:4000" # Map the container's port to the host machine
    environment:
      - VITE_API_BASE_URL=${VITE_API_BASE_URL} # Use the value from the .env file
    restart: always
```

## License

MIT
