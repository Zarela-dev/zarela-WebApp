# Zarela WebApp - Docker Deployment

Production-ready Docker setup for Zarela WebApp on Ethereum Mainnet.

---

## Overview

This is a **single-configuration** Docker setup optimized for Ethereum Mainnet deployment. The application runs as a containerized nginx server serving the optimized React build.

**Key Features:**
- ✅ Single production-ready configuration
- ✅ Ethereum Mainnet only (Chain ID: 1)
- ✅ Multi-stage build (50-70MB final image)
- ✅ Node 14 + React 17 (all versions preserved)
- ✅ Nginx web server for optimal performance
- ✅ Health checks and resource limits
- ✅ Non-root user security

---

## Quick Start

### 1. Prerequisites

- Docker Engine 20.10+
- Docker Compose 1.29+
- `.env` file with Mainnet configuration

### 2. Create Environment File

Create `.env` file:

```bash
REACT_APP_ZARELA_CONTRACT_ADDRESS=0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA
REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api
REACT_APP_ETHEREUM_API_KEY=your_api_key_here
REACT_APP_IPFS=https://ipfs.zarela.io/
REACT_APP_IPFS_GET_LINK=https://get-ipfs.zarela.io/ipfs/
REACT_APP_ETHERSCAN_LINK=https://etherscan.io/tx/
REACT_APP_ZARELA_BUSINESS_CATEGORY=1
DISABLE_ESLINT_PLUGIN=true
```

### 3. Deploy

```bash
# Using Make (recommended)
make deploy

# Or using docker-compose
docker-compose up --build -d

# Or using helper script
./scripts/docker-deploy.sh
```

### 4. Access

Open http://localhost in your browser.

---

## Architecture

### Multi-Stage Build

```
Stage 1 (Builder):
  node:14-alpine
  └─ Install dependencies
  └─ Build React app
  └─ Output: /app/build

Stage 2 (Production):
  nginx:1.21-alpine
  └─ Copy built files from Stage 1
  └─ Serve static files
  └─ Final image: ~50-70MB
```

### Technology Stack

- **Node:** 14-alpine (build stage)
- **Nginx:** 1.21-alpine (runtime)
- **React:** 17.0.2
- **Web3:** 1.2.2 (package.json) / 4.16.0 (runtime)
- **Network:** Ethereum Mainnet (Chain ID: 1)

---

## Commands Reference

### Build & Deploy

```bash
make build              # Build Docker image
make start              # Start container
make deploy             # Build and start (all-in-one)
make up                 # Same as deploy
```

### Monitoring

```bash
make logs               # View logs (follow)
make logs-tail          # Last 100 lines
make health             # Check health status
make stats              # Resource usage
make ps                 # Container status
```

### Maintenance

```bash
make restart            # Restart container
make stop               # Stop container
make shell              # Access container shell
make clean              # Remove container & image
make rebuild            # Clean rebuild (no cache)
```

### Utilities

```bash
make check-env          # Verify .env file
make help               # Show all commands
make prune              # Clean all Docker resources
```

---

## Environment Variables

### Required

- `REACT_APP_ZARELA_CONTRACT_ADDRESS` - Mainnet contract address
- `REACT_APP_ETHERSCAN_MAINNET_API_LINK` - Etherscan API base URL
- `REACT_APP_ETHEREUM_API_KEY` - Etherscan API key

### Optional (with defaults)

- `REACT_APP_IPFS` - Default: https://ipfs.zarela.io/
- `REACT_APP_IPFS_GET_LINK` - Default: https://get-ipfs.zarela.io/ipfs/
- `REACT_APP_ETHERSCAN_LINK` - Default: https://etherscan.io/tx/
- `REACT_APP_ZARELA_BUSINESS_CATEGORY` - Default: 1
- `REACT_APP_EXPLORE_LINK` - Optional explore panel link

---

## Configuration Files

### Dockerfile

Multi-stage production build:
- Stage 1: Build with Node 14
- Stage 2: Serve with Nginx
- Runs as non-root user
- Includes health check

### docker-compose.yml

Single service configuration:
- Port 80 and 443 exposed
- Health checks enabled
- Resource limits: 1 CPU, 512MB RAM
- Automatic restart
- Logging configured

### .dockerignore

Excludes from build context:
- node_modules
- Build artifacts
- Git files
- Documentation
- Environment files

### nginx.conf

Web server configuration for serving React SPA.

---

## Performance

### Build Times

| Scenario | Time |
|----------|------|
| First build | 5-7 min |
| Cached rebuild | 1-2 min |

### Runtime

- **Memory:** ~50MB
- **CPU:** Minimal
- **Startup:** ~5 seconds
- **Image Size:** 50-70MB

### Resource Limits

```yaml
limits:
  cpus: '1'
  memory: 512M
reservations:
  cpus: '0.5'
  memory: 256M
```

---

## Health Checks

Automatic health monitoring:

```yaml
healthcheck:
  interval: 30s    # Check every 30 seconds
  timeout: 3s      # Timeout after 3 seconds
  retries: 3       # Retry 3 times before unhealthy
  start_period: 5s # Wait 5s before first check
```

Check manually:
```bash
make health
```

---

## Security

### Implemented

✅ **Non-root user** - Container runs as nginx:101  
✅ **Minimal base** - Alpine Linux reduces attack surface  
✅ **No dev dependencies** - Only production build in image  
✅ **No secrets** - Environment variables passed at build time  
✅ **.dockerignore** - Sensitive files excluded  

### Best Practices

- Keep base images updated
- Use specific image tags (not `latest`)
- Scan images for vulnerabilities
- Review logs regularly
- Update dependencies periodically

---

## Troubleshooting

### Port 80 Already in Use

```bash
# Find and stop process using port 80
lsof -ti:80 | xargs kill -9

# Or change port in docker-compose.yml:
ports:
  - "8080:80"  # Use port 8080 instead
```

### Build Fails

```bash
# Clean rebuild
make rebuild

# Or manually
docker-compose build --no-cache
```

### Container Exits

```bash
# Check logs for errors
make logs

# Check environment
make check-env
```

### Out of Disk Space

```bash
# Clean up Docker resources
make prune
```

### Can't Connect to MetaMask

- Ensure your wallet is on Ethereum Mainnet
- Contract address must be correct for Mainnet
- Check browser console for Web3 errors

---

## Deployment Scenarios

### Local Testing

```bash
make deploy
# Access at http://localhost
```

### Production Server

```bash
# 1. Set up server with Docker
# 2. Copy project files
# 3. Configure .env for production
# 4. Deploy
make deploy
```

### Cloud Deployment

```bash
# Build image
docker-compose build

# Tag for registry
docker tag zarela-webapp:latest your-registry/zarela-webapp:v1.0.0

# Push
docker push your-registry/zarela-webapp:v1.0.0

# Deploy on cloud
# (Use cloud-specific configuration)
```

---

## Monitoring

### View Logs

```bash
# Real-time
make logs

# Last N lines
docker-compose logs --tail=100

# With timestamps
docker-compose logs -t
```

### Resource Monitoring

```bash
# Current usage
make stats

# Continuous
docker stats zarela-webapp
```

### Health Status

```bash
# Quick check
make health

# Detailed
docker inspect --format='{{json .State.Health}}' zarela-webapp | jq
```

---

## Maintenance

### Regular Tasks

**Daily:**
- Check logs: `make logs-tail`
- Verify health: `make health`

**Weekly:**
- Review resource usage: `make stats`
- Check for updates

**Monthly:**
- Clean unused resources: `make prune`
- Update dependencies if needed
- Rebuild: `make rebuild`

### Backup

```bash
# Export image
docker save zarela-webapp:latest -o zarela-webapp-backup.tar

# Import later
docker load -i zarela-webapp-backup.tar
```

---

## Files Created

```
├── Dockerfile                  # Production build configuration
├── docker-compose.yml          # Docker Compose configuration
├── .dockerignore               # Build context exclusions
├── Makefile                    # Command shortcuts
├── scripts/
│   └── docker-deploy.sh       # Deployment helper script
└── README-DOCKER.md           # This file
```

---

## Version Information

- **Docker Setup Version:** 1.0.0
- **Node Version:** 14-alpine
- **React Version:** 17.0.2
- **Web3 Version:** 1.2.2 (package.json)
- **Target Network:** Ethereum Mainnet (Chain ID: 1)

---

## Support & Documentation

- **Quick Start:** `DOCKER-QUICKSTART.md`
- **This File:** `README-DOCKER.md`
- **Recent Fixes:** `REVIVE.md`
- **Development Guide:** `AGENTS.md`

---

## FAQ

**Q: Can I use this on testnets?**  
A: This is configured for Mainnet only. To use testnets, you'd need to modify the connector and environment configuration.

**Q: How do I update the application?**  
A: Pull latest code, then run `make rebuild` and `make start`.

**Q: Where are the logs stored?**  
A: In Docker's logging system. Access with `make logs`.

**Q: Can I scale this horizontally?**  
A: Yes, adjust `docker-compose.yml` or use orchestration tools like Kubernetes.

**Q: What if I need HTTPS?**  
A: Add SSL certificates and update `nginx.conf`, or use a reverse proxy like Traefik.

---

**Ready for Mainnet deployment! 🚀**

