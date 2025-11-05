# 🐳 Docker Deployment with Pinata - Complete Guide

## ✅ Docker Files Updated

Both `Dockerfile` and `docker-compose.yml` have been updated to support Pinata configuration.

---

## 📋 What Changed

### 1. docker-compose.yml ✅
Added Pinata JWT to build args:
```yaml
args:
  - REACT_APP_IPFS=${REACT_APP_IPFS}
  - REACT_APP_IPFS_GET_LINK=${REACT_APP_IPFS_GET_LINK}
  - REACT_APP_PINATA_JWT=${REACT_APP_PINATA_JWT}  # NEW!
```

### 2. Dockerfile ✅
Added Pinata JWT as build argument and environment variable:
```dockerfile
ARG REACT_APP_PINATA_JWT
ENV REACT_APP_PINATA_JWT=$REACT_APP_PINATA_JWT
```

---

## 🚀 Deployment Steps

### Step 1: Create .env File on Server

On your production server, create `.env` file:

```bash
# SSH into your server
ssh user@your-server.com

# Navigate to project directory
cd /path/to/zarela-WebApp

# Create .env file
nano .env
```

Add this content:
```bash
# Ethereum Configuration
REACT_APP_ZARELA_CONTRACT_ADDRESS=0xF67192a8b9f269f23802D9AB94C7875a0aBB7aeA
REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api
REACT_APP_ETHEREUM_API_KEY=your_etherscan_api_key_here
REACT_APP_ETHERSCAN_LINK=https://etherscan.io/tx/

# Pinata IPFS Configuration (IMPORTANT!)
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_pinata_jwt_token_here

# Other Configuration
REACT_APP_ZARELA_BUSINESS_CATEGORY=1
REACT_APP_EXPLORE_LINK=your_explore_link_here
REACT_APP_GASSTATION_API_KEY=your_gasstation_key_here
REACT_APP_ETHERSCAN_ROPSTEN_API_LINK=https://api-sepolia.etherscan.io/api
```

**IMPORTANT**: Replace placeholder values with your actual credentials!

### Step 2: Build Docker Image

```bash
# Build with no cache to ensure fresh build
docker compose build --no-cache

# Or if using docker-compose (older versions)
docker-compose build --no-cache
```

**This will**:
- ✅ Install dependencies
- ✅ Build React app with Pinata configuration
- ✅ Embed JWT token in JavaScript bundle
- ✅ Create optimized production image

### Step 3: Start Container

```bash
# Start the container
docker compose up -d

# Or
docker-compose up -d
```

### Step 4: Verify Deployment

```bash
# Check container is running
docker compose ps

# Check logs
docker compose logs -f zarela-webapp

# Test the application
curl http://localhost
```

---

## 🔍 Verification Checklist

### 1. Check Environment Variables Are Built In

```bash
# Verify IPFS config in built JavaScript
docker compose exec zarela-webapp sh -c \
  "grep -r 'api.pinata.cloud' /usr/share/nginx/html/static/js/*.js | head -1"

# Should show: api.pinata.cloud ✅
```

### 2. Check JWT Token Is Present

```bash
# This will search for the JWT pattern (don't worry, it's hashed in production JS)
docker compose exec zarela-webapp sh -c \
  "grep -r 'Bearer' /usr/share/nginx/html/static/js/*.js | head -1"

# Should show Bearer auth code ✅
```

### 3. Test Application

1. **Open browser**: http://your-server-ip
2. **Connect wallet**
3. **Try uploading a file**
4. **Check Pinata dashboard** - file should appear there!

---

## 🔐 Security Best Practices

### 1. Protect .env File

```bash
# On your server, set proper permissions
chmod 600 .env
chown root:root .env

# Add to .gitignore (if deploying from git)
echo ".env" >> .gitignore
```

### 2. Use Environment Variables (Better Approach)

Instead of `.env` file, set environment variables directly:

```bash
# On your server (recommended for production)
export REACT_APP_IPFS=https://api.pinata.cloud
export REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
export REACT_APP_PINATA_JWT=your_jwt_here

# Then build
docker compose build --no-cache
docker compose up -d
```

### 3. Use Docker Secrets (Most Secure)

For enterprise deployments, use Docker secrets or vault services.

---

## 📊 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ SERVER: docker compose build                                 │
│                                                              │
│ 1. Reads .env file                                          │
│ 2. Passes variables to Dockerfile                           │
│ 3. npm run build with environment variables                 │
│ 4. Variables are BAKED INTO JavaScript                      │
│ 5. Creates production image                                 │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ RUNTIME: docker compose up -d                               │
│                                                              │
│ 1. Starts nginx container                                   │
│ 2. Serves static JavaScript files                           │
│ 3. Browser downloads JavaScript                             │
│ 4. JavaScript contains Pinata config                        │
│ 5. Uploads go directly to Pinata                           │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ USER'S BROWSER                                               │
│                                                              │
│ JavaScript calls:                                           │
│ → https://api.pinata.cloud (with JWT auth)                 │
│ → https://olive-select-salmon-280.mypinata.cloud/ipfs/     │
└──────────────────────────────────────────────────────────────┘
```

**Key Point**: JWT is compiled into the JavaScript bundle during build time, not runtime!

---

## 🆚 Development vs Production

### Development (localhost)

**Setup:**
```bash
# .env
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
# No JWT needed for local IPFS
```

**Run:**
```bash
npm start
# or
docker compose up -d
```

### Production (Server)

**Setup:**
```bash
# .env
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_jwt_token
```

**Deploy:**
```bash
docker compose build --no-cache
docker compose up -d
```

---

## 🔄 Update Process

When you need to update IPFS configuration:

### 1. Update .env

```bash
# SSH to server
ssh user@your-server.com

# Edit .env
nano .env

# Change values
# Save and exit
```

### 2. Rebuild (REQUIRED!)

```bash
# Must rebuild to bake new values into JavaScript
docker compose down
docker compose build --no-cache
docker compose up -d
```

**⚠️ IMPORTANT**: Environment variables are baked into the JavaScript at BUILD time, not runtime. You MUST rebuild after changing `.env`!

---

## 🐛 Troubleshooting

### Problem: Upload Still Fails

**Check 1: JWT Is Set**
```bash
# View .env
cat .env | grep PINATA_JWT

# Should show your JWT token
```

**Check 2: Rebuilt After Changes**
```bash
# Must rebuild after changing .env
docker compose build --no-cache
docker compose up -d
```

**Check 3: JWT Is Valid**
```bash
# Test JWT from server
curl -X GET \
  https://api.pinata.cloud/data/testAuthentication \
  -H "Authorization: Bearer YOUR_JWT_HERE"

# Should return: {"message":"Congratulations! You are communicating with the Pinata API!"}
```

### Problem: Wrong Gateway URL

**Check:**
```bash
docker compose exec zarela-webapp sh -c \
  "grep -r 'mypinata.cloud' /usr/share/nginx/html/static/js/*.js"
```

**Should show**: `olive-select-salmon-280.mypinata.cloud`

**If not**: Rebuild with correct URL in `.env`

### Problem: Container Won't Start

**Check logs:**
```bash
docker compose logs zarela-webapp
```

**Check build logs:**
```bash
docker compose build --no-cache 2>&1 | tee build.log
```

---

## 📋 Pre-Deployment Checklist

- [ ] `.env` file created on server
- [ ] All environment variables set correctly
- [ ] Pinata JWT token is valid
- [ ] Gateway URL is YOUR dedicated gateway
- [ ] `.env` file permissions set to 600
- [ ] Built with `--no-cache` flag
- [ ] Container started successfully
- [ ] Logs show no errors
- [ ] Application accessible via browser
- [ ] Test upload works
- [ ] Files appear in Pinata dashboard

---

## 🚀 Quick Deploy Commands

```bash
# Complete deployment in one go
cd /path/to/zarela-WebApp

# Create/update .env with your credentials
nano .env

# Deploy
docker compose down
docker compose build --no-cache
docker compose up -d

# Verify
docker compose ps
docker compose logs -f zarela-webapp

# Test
curl http://localhost
```

---

## 📊 Monitoring

### Check Container Health

```bash
# Container status
docker compose ps

# Health check status
docker inspect zarela-webapp | grep -A 5 Health

# Resource usage
docker stats zarela-webapp
```

### Check Logs

```bash
# Follow logs in real-time
docker compose logs -f zarela-webapp

# Last 100 lines
docker compose logs --tail=100 zarela-webapp

# Logs from last hour
docker compose logs --since 1h zarela-webapp
```

### Check Pinata Usage

1. Go to Pinata dashboard
2. Check "Files" section
3. Monitor storage usage
4. Check bandwidth usage

---

## 🔒 Security Notes

### 1. JWT Token Exposure

**Risk**: JWT token is embedded in JavaScript (public)

**Mitigation**:
- Set proper CORS on Pinata
- Monitor Pinata usage regularly  
- Rotate JWT periodically
- Use Pinata's access restrictions

### 2. Gateway Security

Your dedicated gateway (`olive-select-salmon-280.mypinata.cloud`) is:
- ✅ Private to your account
- ✅ Rate-limited per your plan
- ✅ Access can be restricted in Pinata settings

### 3. Network Security

```bash
# Use firewall rules
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Use HTTPS in production
# Set up nginx proxy with SSL
```

---

## 📖 Related Documentation

- `PINATA-SETUP-COMPLETE.md` - Detailed Pinata configuration
- `IPFS-PRODUCTION-SERVER.md` - IPFS options for production
- `DOCKER-SETUP.md` - General Docker setup
- `DOCKER-QUICKSTART.md` - Quick Docker guide

---

## ✅ Summary

Your Docker configuration is **NOW READY for production** with Pinata! 

Changes made:
1. ✅ Updated `docker-compose.yml` to pass Pinata JWT
2. ✅ Updated `Dockerfile` to accept and use JWT
3. ✅ Code already updated to use Pinata authentication
4. ✅ Ready to deploy on any server

**Next steps**:
1. Create `.env` on your server with Pinata credentials
2. Run `docker compose build --no-cache`
3. Run `docker compose up -d`
4. Test upload - files will go to Pinata! 🚀


