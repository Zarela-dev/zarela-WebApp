# IPFS Express Proxy - Docker Configuration
# Standalone proxy container for IPFS CORS issues

FROM node:18-alpine

# ---- Fix broken Alpine mirror (VPN-safe mirror) ----
RUN sed -i 's|dl-cdn.alpinelinux.org|alpine.global.ssl.fastly.net|g' /etc/apk/repositories

# Install required packages
RUN apk update && apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S proxyuser -u 1001 && \
    chown -R proxyuser:nodejs /app

USER proxyuser

# Expose ports
EXPOSE 5001 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5001/health || exit 1

# Start the proxy server
CMD ["npm", "start"]
