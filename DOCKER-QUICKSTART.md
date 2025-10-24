# Docker Quick Start Guide

**Fast setup for Zarela WebApp on Ethereum Mainnet**

---

## Prerequisites

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop
2. Verify installation: `docker --version` and `docker-compose --version`
3. Create `.env` file with required variables (see below)

---

## 30-Second Setup

```bash
# Build and start the application
make up

# Or without Make:
docker-compose up --build -d
```

Access at: **http://localhost**

---

## Required Environment Variables

Create `.env` file in the project root:

```bash
# Ethereum Mainnet Smart Contract
REACT_APP_ZARELA_CONTRACT_ADDRESS=0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA

# Etherscan API Configuration (Mainnet)
REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api
REACT_APP_ETHEREUM_API_KEY=your_etherscan_api_key_here

# IPFS Configuration
REACT_APP_IPFS=https://ipfs.zarela.io/
REACT_APP_IPFS_GET_LINK=https://get-ipfs.zarela.io/ipfs/

# Etherscan Link
REACT_APP_ETHERSCAN_LINK=https://etherscan.io/tx/

# Business Category
REACT_APP_ZARELA_BUSINESS_CATEGORY=1

# Optional: Explore Link
REACT_APP_EXPLORE_LINK=https://dashboard.zarela.io?v=a

# Build Configuration
DISABLE_ESLINT_PLUGIN=true
```

---

## Essential Commands

### Using Make (Recommended)

```bash
make help              # Show all available commands
make check-env         # Verify .env configuration
make build             # Build Docker image
make start             # Start application
make stop              # Stop application
make restart           # Restart application
make logs              # View logs (follow mode)
make logs-tail         # View last 100 lines
make shell             # Open shell in container
make health            # Check health status
make stats             # Show resource usage
make clean             # Remove everything
make deploy            # Build and deploy
```

### Using Docker Compose Directly

```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart

# Check status
docker-compose ps
```

### Using Helper Script

```bash
# Build and deploy with validation
./scripts/docker-deploy.sh
```

---

## Troubleshooting

### Port Already in Use

```bash
# Stop conflicting process on port 80
lsof -ti:80 | xargs kill -9
```

### Build Issues

```bash
# Clean rebuild
make rebuild
# Or:
docker-compose build --no-cache
```

### Container Not Starting

```bash
# Check logs
make logs
# Or:
docker-compose logs
```

### Reset Everything

```bash
# Remove container and image
make clean

# Or nuclear option (removes all Docker resources)
make prune
```

---

## Common Workflows

### Initial Deployment

```bash
# 1. Verify environment
make check-env

# 2. Build and start
make deploy

# 3. Verify it's running
make health

# 4. Check logs
make logs
```

### Daily Operations

```bash
# Check status
make ps

# View logs
make logs-tail

# Restart if needed
make restart
```

### Updates & Maintenance

```bash
# Pull latest code
git pull

# Rebuild and restart
make rebuild
make start

# Check everything is working
make health
```

---

## File Structure

```
zarela-WebApp/
├── Dockerfile              # Production build (Node 14 → Nginx)
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore           # Files to exclude from build
├── .env                    # Environment variables (create this)
├── Makefile               # Convenient commands
├── scripts/
│   └── docker-deploy.sh   # Deployment helper script
└── nginx.conf             # Nginx configuration
```

---

## Image Specifications

- **Base Images:** 
  - Build: `node:14-alpine`
  - Runtime: `nginx:1.21-alpine`
- **Final Size:** ~50-70MB
- **Build Time:** 5-7 minutes (first build), 1-2 minutes (cached)
- **Network:** Ethereum Mainnet only
- **Versions:** Node 14, React 17, all packages locked

---

## Security Features

✅ Non-root user in container  
✅ Minimal Alpine Linux base  
✅ Multi-stage build (no dev dependencies)  
✅ Health checks enabled  
✅ No secrets in image  

---

## Performance

- **Memory Usage:** ~50MB (nginx serving static files)
- **CPU Usage:** Minimal
- **Startup Time:** ~5 seconds
- **Health Check:** Every 30 seconds

---

## Next Steps

1. **Verify setup:** `make check-env`
2. **Deploy:** `make deploy`
3. **Monitor:** `make logs`
4. **Access:** http://localhost

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Check config | `make check-env` |
| Build | `make build` |
| Start | `make start` |
| Build & start | `make up` or `make deploy` |
| Stop | `make stop` |
| Restart | `make restart` |
| View logs | `make logs` |
| Health check | `make health` |
| Shell access | `make shell` |
| Clean up | `make clean` |
| Help | `make help` |

---

## Support

If you encounter issues:

1. Check logs: `make logs`
2. Verify environment: `make check-env`
3. Try clean rebuild: `make clean` then `make deploy`
4. Check health: `make health`

For more details, see `DOCKER.md`

---

**Ready to deploy on Ethereum Mainnet! 🚀**
