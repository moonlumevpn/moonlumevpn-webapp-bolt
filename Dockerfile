FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Install Chromium for react-snap (Puppeteer)
RUN apt-get update && apt-get install -y --no-install-recommends \
  chromium \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  xdg-utils \
  && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build-time frontend env (baked into static files by Vite)
ARG VITE_API_BASE_URL=""
ARG VITE_TELEGRAM_SUPPORT_URL=""
ARG VITE_TELEGRAM_BOT_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_TELEGRAM_SUPPORT_URL=$VITE_TELEGRAM_SUPPORT_URL
ENV VITE_TELEGRAM_BOT_URL=$VITE_TELEGRAM_BOT_URL

# Build the project
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 4000

# Start the server
CMD ["serve", "-s", "dist", "-l", "4000"]
