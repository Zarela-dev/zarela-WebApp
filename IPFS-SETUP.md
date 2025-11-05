# IPFS Configuration Guide

**Switching from Zarela's private IPFS to public global IPFS nodes**

---

## Overview

This guide explains how to configure the application to use **free public IPFS nodes** instead of Zarela's private IPFS infrastructure.

---

## Quick Update

### Update Your `.env` File

Replace these lines in your `.env` file:

**FROM (Zarela's Private IPFS):**
```bash
REACT_APP_IPFS=https://ipfs.zarela.io/
REACT_APP_IPFS_GET_LINK=https://get-ipfs.zarela.io/ipfs/
```

**TO (Public Global IPFS):**
```bash
# Upload API - Infura IPFS (Free, reliable)
REACT_APP_IPFS=https://ipfs.infura.io:5001

# Download Gateway - Cloudflare (Fast, global CDN)
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

---

## Available Public IPFS Options

### For Uploading Files (API Endpoints)

#### 1. **Infura IPFS** (Recommended ✅)
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
```
- **Free Tier:** 5GB storage, 100K requests/month
- **Pros:** Reliable, no API key needed for basic use, good uptime
- **Cons:** Rate limits on free tier
- **Best for:** Development and moderate production use

#### 2. **Local IPFS Daemon**
```bash
REACT_APP_IPFS=http://localhost:5001
```
- **Free Tier:** Unlimited
- **Pros:** Full control, no rate limits, complete privacy
- **Cons:** Requires running IPFS daemon locally, need to maintain it
- **Setup:**
  ```bash
  # Install IPFS
  brew install ipfs  # macOS
  # or download from: https://docs.ipfs.tech/install/
  
  # Initialize IPFS
  ipfs init
  
  # Start daemon
  ipfs daemon
  ```
- **Best for:** Development, testing, full control scenarios

#### 3. **4EVERLAND IPFS** (Alternative)
```bash
REACT_APP_IPFS=https://endpoint.4everland.co
```
- **Free Tier:** Good limits
- **Pros:** Decentralized CDN, Web3 focused
- **Best for:** Web3 projects

---

### For Downloading Files (Gateway Endpoints)

#### 1. **Cloudflare IPFS Gateway** (Recommended ✅)
```bash
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```
- **Pros:** Very fast, global CDN, reliable, no rate limits
- **Cons:** Read-only (perfect for downloads)
- **Best for:** Production downloads

#### 2. **IPFS.io Official Gateway**
```bash
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
```
- **Pros:** Official IPFS gateway, widely used
- **Cons:** Can be slower during high traffic
- **Best for:** Standard use cases

#### 3. **Pinata Gateway**
```bash
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
```
- **Pros:** Reliable, good performance
- **Best for:** If using Pinata for uploads

#### 4. **Dweb.link**
```bash
REACT_APP_IPFS_GET_LINK=https://dweb.link/ipfs/
```
- **Pros:** Supports both IPFS and IPNS
- **Best for:** Advanced use cases

---

## Recommended Configurations

### Development (Local)
```bash
# Run local IPFS daemon for full control
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

### Development (Cloud)
```bash
# Use Infura for uploads, Cloudflare for downloads
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

### Production (Free)
```bash
# Best free option
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

### Production (Paid - For High Traffic)
Consider these paid services for production:
- **Pinata:** https://pinata.cloud (100GB free, then paid)
- **NFT.Storage:** https://nft.storage (Free for NFTs)
- **Web3.Storage:** https://web3.storage (Free for now)
- **Filebase:** https://filebase.com (S3-compatible IPFS)

---

## Update Steps

### 1. Update `.env` File

```bash
# Edit your .env file
nano .env

# Or use your preferred editor
vim .env
```

Replace the IPFS URLs with public endpoints.

### 2. Rebuild Docker Image (If Using Docker)

```bash
# The new IPFS endpoints are baked into the build
docker compose down
docker compose build --no-cache
docker compose up -d
```

### 3. Restart Development Server (If Running Locally)

```bash
# Stop current server (Ctrl+C)
# Then restart
npm start
# Or with Node 14
export PATH="/tmp/node-v14.21.3-darwin-x64/bin:$PATH" && npm run start
```

---

## Testing IPFS Configuration

### Test Upload Endpoint

```bash
# Test if IPFS API is accessible
curl -X POST https://ipfs.infura.io:5001/api/v0/version
```

Should return IPFS version info.

### Test Download Gateway

```bash
# Test with a known IPFS hash (IPFS logo)
curl -I https://cloudflare-ipfs.com/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
```

Should return HTTP 200 OK.

---

## Important Notes

### 1. Upload vs Download

- **REACT_APP_IPFS**: Used for uploading (requires IPFS API endpoint)
- **REACT_APP_IPFS_GET_LINK**: Used for downloading (uses HTTP gateway)

### 2. Rate Limits

**Infura Free Tier:**
- 100,000 requests per day
- 5GB total storage
- Enough for moderate use

**Cloudflare Gateway:**
- No published rate limits
- Very generous for downloads

### 3. Pinning

Files uploaded to public IPFS nodes may not be pinned permanently. Consider:
- Running your own IPFS node for production
- Using paid pinning services (Pinata, NFT.Storage)
- Implementing your own pinning strategy

### 4. CORS Issues

If you encounter CORS errors with Infura:
```bash
# Infura allows CORS from browser by default
# If issues persist, consider using a proxy or local node
```

---

## Troubleshooting

### Error: "Failed to upload to IPFS"

**Solution 1:** Check if endpoint is accessible
```bash
curl -X POST https://ipfs.infura.io:5001/api/v0/version
```

**Solution 2:** Try alternative endpoint
```bash
REACT_APP_IPFS=http://localhost:5001  # Local daemon
```

**Solution 3:** Check network/firewall

### Error: "Failed to download from IPFS"

**Solution 1:** Try alternative gateway
```bash
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
```

**Solution 2:** Verify CID is correct
```bash
# Test in browser
https://cloudflare-ipfs.com/ipfs/<YOUR_CID>
```

### Error: "CORS blocked"

**Solution:** Ensure using proper IPFS gateway endpoint (not API endpoint) for downloads

---

## Comparison Table

| Service | Upload API | Download Gateway | Free Tier | Reliability | Speed |
|---------|-----------|------------------|-----------|-------------|-------|
| Infura | ✅ | ✅ | 5GB, 100K req/day | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Cloudflare | ❌ | ✅ | Unlimited | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| IPFS.io | ❌ | ✅ | Unlimited | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Local Daemon | ✅ | ✅ | Unlimited | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Pinata | ✅ | ✅ | 100GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## For Production Use

If your app will have significant traffic, consider:

1. **Paid Pinata Plan**
   - Dedicated gateway
   - Better performance
   - SLA guarantees

2. **Running Your Own Node**
   - Full control
   - No rate limits
   - Requires DevOps

3. **Hybrid Approach**
   - Use Infura/Pinata for uploads
   - Use Cloudflare gateway for downloads
   - Implement caching layer

---

## Additional Resources

- [IPFS Documentation](https://docs.ipfs.tech/)
- [Infura IPFS Guide](https://docs.infura.io/infura/networks/ipfs)
- [Public IPFS Gateways](https://ipfs.github.io/public-gateway-checker/)
- [IPFS Best Practices](https://docs.ipfs.tech/how-to/best-practices-for-nft-data/)

---

## Summary

✅ **Recommended for immediate use:**
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

This gives you:
- Free, reliable uploads via Infura
- Fast, global downloads via Cloudflare
- No API keys required
- Good for development and moderate production use

After updating `.env`, rebuild your Docker image or restart your development server.

