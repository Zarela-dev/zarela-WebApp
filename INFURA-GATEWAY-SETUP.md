# 🌐 Infura IPFS Gateway Configuration

## Two Endpoints Explained

When using Infura IPFS, you need **two different endpoints**:

### 1. Upload Endpoint (API) - `REACT_APP_IPFS`
**Purpose:** For **uploading files** to IPFS  
**Format:** API endpoint with port 5001  
**Value:** `https://ipfs.infura.io:5001`

**What it does:**
- Receives files from your app
- Stores them on IPFS
- Returns the IPFS hash (CID)
- **Requires authentication** (Project ID + Secret)

---

### 2. Download Endpoint (Gateway) - `REACT_APP_IPFS_GET_LINK`
**Purpose:** For **downloading/viewing files** from IPFS  
**Format:** HTTP gateway URL  

**You have 2 options:**

---

## ⭐ Option 1: Infura Dedicated Gateway (RECOMMENDED)

### Configuration:
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://<YOUR-PROJECT-ID>.ipfs.infura-ipfs.io/ipfs/
```

### Your Specific Values:
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/
```

### Benefits:
- ✅ **Dedicated to your project** (no sharing with others)
- ✅ **Better performance** (faster downloads)
- ✅ **No rate limiting** from public gateways
- ✅ **More reliable** (prioritized traffic)
- ✅ **Privacy** (not using shared public gateway)

### How to Verify It Works:

After uploading a file with hash `QmHash123...`:

**Dedicated Gateway:**
```
https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmHash123...
```

**Test in browser:**
```bash
# Try accessing a well-known IPFS file through your gateway:
https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
```

If you see a file/image, your dedicated gateway is working! ✅

---

## 🌍 Option 2: Public Gateway (Backup)

If the dedicated gateway has issues, use a public gateway:

### Configuration Options:

#### A) IPFS.io (Default Public Gateway)
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
```

**Pros:**
- ✅ Most reliable public gateway
- ✅ Always available
- ✅ No setup needed

**Cons:**
- ⚠️ Can be slow during high traffic
- ⚠️ Rate limited
- ⚠️ Shared with everyone

---

#### B) Cloudflare IPFS (Faster Alternative)
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

**Pros:**
- ✅ Often faster than ipfs.io
- ✅ Cloudflare's CDN network
- ✅ Good global coverage

**Cons:**
- ⚠️ Still public (shared)
- ⚠️ Can have rate limits

---

## 🔧 Complete .env Configuration

### Recommended Setup (Infura Dedicated Gateway):

```bash
# ========================================
# IPFS Configuration (Infura)
# ========================================

# Upload Endpoint (Infura API)
REACT_APP_IPFS=https://ipfs.infura.io:5001

# Download Endpoint (Infura Dedicated Gateway)
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/

# Infura Credentials
REACT_APP_INFURA_PROJECT_ID=87a657c877f049279daaa7a3306d214b
REACT_APP_INFURA_PROJECT_SECRET=fe11223dd82f4c39bd9ad100821c02e3

# Other required variables...
REACT_APP_ZARELA_CONTRACT_ADDRESS=0x...
REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api
REACT_APP_ETHEREUM_API_KEY=...
REACT_APP_ETHERSCAN_LINK=https://etherscan.io/tx/
REACT_APP_ZARELA_BUSINESS_CATEGORY=1
```

---

## 🧪 How to Test

### 1. Test Upload:
```javascript
// Your app uploads to:
https://ipfs.infura.io:5001/api/v0/add

// Response:
{ "Hash": "QmXx123...", ... }
```

### 2. Test Download:
```javascript
// Your app downloads from:
https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmXx123...

// Or public gateway:
https://ipfs.io/ipfs/QmXx123...
```

---

## 📊 Comparison: Dedicated vs Public Gateway

| Feature | Dedicated Gateway | Public Gateway |
|---------|------------------|----------------|
| **URL** | `<project-id>.ipfs.infura-ipfs.io` | `ipfs.io` or `cloudflare-ipfs.com` |
| **Speed** | ⚡ Fast (dedicated) | 🐌 Can be slow |
| **Rate Limits** | ✅ No limits (within plan) | ⚠️ Rate limited |
| **Reliability** | ✅ High (prioritized) | ⚠️ Can be congested |
| **Privacy** | ✅ Private | ❌ Public |
| **Setup** | Easy (just use Project ID) | No setup |
| **Cost** | Free (within free tier) | Free |

---

## 🔍 Troubleshooting

### Issue: Dedicated Gateway 404

**Symptoms:**
```
https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmHash...
404 Not Found
```

**Possible Causes:**
1. Gateway not enabled in Infura project
2. Project ID incorrect
3. File not yet propagated to gateway

**Solutions:**

#### 1. Check Infura Dashboard:
- Go to https://infura.io/dashboard
- Select your IPFS project
- Look for "Gateway" settings
- Make sure **"Dedicated Gateway"** is enabled

#### 2. Verify Gateway URL Format:
```bash
# Correct format:
https://<PROJECT-ID>.ipfs.infura-ipfs.io/ipfs/

# Your specific URL:
https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/
```

#### 3. Test with Known File:
```bash
# Try this well-known IPFS file:
curl -I https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o

# Should return: HTTP/2 200
```

#### 4. Fallback to Public Gateway:
If dedicated gateway doesn't work, temporarily use public:
```bash
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
```

---

### Issue: Slow Downloads

**Symptoms:**
- Files take a long time to load
- Timeouts when viewing files

**Solutions:**

1. **Switch to Cloudflare Gateway** (often faster):
```bash
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/
```

2. **Use Dedicated Gateway** (if not already):
```bash
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/
```

3. **Verify Gateway Performance**:
```bash
# Time different gateways:
time curl -I https://ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
time curl -I https://cloudflare-ipfs.com/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
time curl -I https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o
```

Use the fastest one!

---

## 🚀 Deployment Steps

### 1. Update .env

**On your server:**
```bash
nano .env
```

**Add these lines:**
```bash
# IPFS Configuration (Infura)
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/
REACT_APP_INFURA_PROJECT_ID=87a657c877f049279daaa7a3306d214b
REACT_APP_INFURA_PROJECT_SECRET=fe11223dd82f4c39bd9ad100821c02e3
```

**Remove old Pinata config:**
```bash
# Comment out or delete these:
# REACT_APP_IPFS=https://api.pinata.cloud
# REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
```

Save and exit: `Ctrl+X`, `Y`, `Enter`

### 2. Rebuild Docker

```bash
docker compose down
docker compose build
docker compose up -d
```

### 3. Test Upload & Download

1. **Upload a file** via your app
2. **Get the IPFS hash** (CID) from the transaction
3. **Try accessing it** via gateway:
   ```
   https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/<YOUR-CID>
   ```

If it loads, you're all set! ✅

---

## 📝 Summary: What Goes Where

```
┌─────────────────────────────────────────────────────────────┐
│  Upload Flow (Your App → Infura API)                        │
├─────────────────────────────────────────────────────────────┤
│  REACT_APP_IPFS=https://ipfs.infura.io:5001                 │
│  • Used for: ipfs.add() to upload files                     │
│  • Authentication: Project ID + Secret                       │
│  • Returns: IPFS hash (CID)                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Download Flow (Users → Gateway)                             │
├─────────────────────────────────────────────────────────────┤
│  REACT_APP_IPFS_GET_LINK=https://87...14b.ipfs.infura...    │
│  • Used for: Viewing/downloading files                       │
│  • Authentication: Not required (public access)              │
│  • URL format: <gateway>/<CID>                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Recommended Configuration (Copy-Paste Ready)

```bash
# ========================================
# IPFS Configuration (Infura) - RECOMMENDED
# ========================================
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/
REACT_APP_INFURA_PROJECT_ID=87a657c877f049279daaa7a3306d214b
REACT_APP_INFURA_PROJECT_SECRET=fe11223dd82f4c39bd9ad100821c02e3
```

---

## 🌐 Alternative Gateways (If Needed)

```bash
# Option 1: Infura Dedicated (BEST)
REACT_APP_IPFS_GET_LINK=https://87a657c877f049279daaa7a3306d214b.ipfs.infura-ipfs.io/ipfs/

# Option 2: IPFS.io Public (RELIABLE)
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/

# Option 3: Cloudflare (FAST)
REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/

# Option 4: Dweb.link (ALTERNATIVE)
REACT_APP_IPFS_GET_LINK=https://dweb.link/ipfs/
```

**Choose one and stick with it!**

---

## ✅ Quick Checklist

- [ ] Set `REACT_APP_IPFS=https://ipfs.infura.io:5001`
- [ ] Set `REACT_APP_IPFS_GET_LINK` to dedicated gateway URL
- [ ] Set `REACT_APP_INFURA_PROJECT_ID`
- [ ] Set `REACT_APP_INFURA_PROJECT_SECRET`
- [ ] **No spaces after `=`** in `.env`
- [ ] Remove old Pinata configuration
- [ ] Rebuild Docker: `docker compose build`
- [ ] Test upload & download
- [ ] Verify gateway URL works in browser

---

**Ready to deploy!** 🚀

