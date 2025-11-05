# Zarela WebApp - Production Docker Image
# Node 14 (LTS) for compatibility with React 17 and Web3
# Multi-stage build for minimal final image size

# ============================================
# Stage 1: Build Application
# ============================================
FROM node:14-alpine AS builder

# Install system dependencies needed for native modules
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files for dependency installation
COPY package.json ./

# Install all dependencies
# Note: Not using package-lock.json in Docker to avoid git dependency issues
# This ensures clean install without lock file conflicts
RUN npm install --legacy-peer-deps --loglevel verbose && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application
# Environment variables will be passed at build time
ARG REACT_APP_ZARELA_CONTRACT_ADDRESS
ARG REACT_APP_ETHERSCAN_MAINNET_API_LINK
ARG REACT_APP_ETHEREUM_API_KEY
ARG REACT_APP_IPFS
ARG REACT_APP_IPFS_GET_LINK
ARG REACT_APP_PINATA_JWT
ARG REACT_APP_ETHERSCAN_LINK
ARG REACT_APP_ZARELA_BUSINESS_CATEGORY
ARG REACT_APP_EXPLORE_LINK
ARG DISABLE_ESLINT_PLUGIN=true

ENV REACT_APP_ZARELA_CONTRACT_ADDRESS=$REACT_APP_ZARELA_CONTRACT_ADDRESS \
    REACT_APP_ETHERSCAN_MAINNET_API_LINK=$REACT_APP_ETHERSCAN_MAINNET_API_LINK \
    REACT_APP_ETHEREUM_API_KEY=$REACT_APP_ETHEREUM_API_KEY \
    REACT_APP_IPFS=$REACT_APP_IPFS \
    REACT_APP_IPFS_GET_LINK=$REACT_APP_IPFS_GET_LINK \
    REACT_APP_PINATA_JWT=$REACT_APP_PINATA_JWT \
    REACT_APP_ETHERSCAN_LINK=$REACT_APP_ETHERSCAN_LINK \
    REACT_APP_ZARELA_BUSINESS_CATEGORY=$REACT_APP_ZARELA_BUSINESS_CATEGORY \
    REACT_APP_EXPLORE_LINK=$REACT_APP_EXPLORE_LINK \
    DISABLE_ESLINT_PLUGIN=$DISABLE_ESLINT_PLUGIN \
    NODE_ENV=production

RUN npm run build

# ============================================
# Stage 2: Production Runtime with Nginx
# ============================================
FROM nginx:1.21-alpine

# Install curl for healthchecks
RUN apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx (runs as root, nginx will handle user switching internally)
CMD ["nginx", "-g", "daemon off;"]
