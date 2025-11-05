# 🔧 Infura IPFS Setup Guide (Production Ready)

## Why Infura Instead of Pinata?

**Problem:** Pinata doesn't support the standard IPFS HTTP API that `ipfs-http-client` uses.

**Solution:** Use **Infura IPFS** which:
- ✅ Works perfectly with `ipfs-http-client` library
- ✅ Supports standard IPFS HTTP API (`/api/v0/add`, `/api/v0/ls`, etc.)
- ✅ Free tier: 5GB storage, 100GB bandwidth
- ✅ Production-ready and reliable
- ✅ Simple authentication (Project ID + Secret)

---

## 📝 Step 1: Create Infura Account

1. **Go to:** https://infura.io/
2. **Click:** "Sign Up" (free account)
3. **Verify** your email

---

## 🔑 Step 2: Create IPFS Project

1. **Log in** to Infura dashboard
2. **Click:** "Create New Key" or "Create New Project"
3. **Select:** "IPFS" (not Ethereum!)
4. **Name it:** "Zarela IPFS" (or any name you like)
5. **Click:** "Create"

---

## 📋 Step 3: Get Your Credentials

After creating the project, you'll see:

```
Project ID:      2abc...xyz123  (long alphanumeric string)
Project Secret:  abc...xyz      (another long string)
```

**Copy both of these!** You'll need them in the next step.

---

## ⚙️ Step 4: Update Your .env File

**On your server**, edit your `.env` file:

```bash
nano .env
```

**Update these lines:**

```bash
# IPFS Configuration (Infura)
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/

# Infura Credentials (replace with your actual values!)
REACT_APP_INFURA_PROJECT_ID=your_project_id_here
REACT_APP_INFURA_PROJECT_SECRET=your_project_secret_here
```

**Example with real values:**
```bash
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
REACT_APP_INFURA_PROJECT_ID=2abc3d4e5f6g7h8i9j0k
REACT_APP_INFURA_PROJECT_SECRET=abcdefghijk123456789
```

**Save and exit** (`Ctrl+X`, then `Y`, then `Enter`)

---

## 🐳 Step 5: Rebuild and Deploy Docker

```bash
# Stop current container
docker compose down

# Rebuild with new configuration
docker compose build

# Start container
docker compose up -d

# Check logs
docker compose logs -f
```

**Build time:** ~10-12 minutes (first time)

---

## ✅ Step 6: Test IPFS Upload

1. **Open your app:** `http://your-server:8080`
2. **Connect MetaMask**
3. **Try uploading a file** on the "New Request" page
4. **Watch the progress** - should reach 100%
5. **Approve transaction** in MetaMask

**Expected behavior:**
- ✅ Upload reaches 100%
- ✅ MetaMask popup appears
- ✅ Transaction succeeds
- ✅ File is stored on IPFS

---

## 🔍 How Authentication Works

### Old (Pinata - didn't work):
```javascript
const ipfs = create({
  url: 'https://api.pinata.cloud',  // ❌ Wrong API
  headers: {
    authorization: 'Bearer ' + jwt
  }
});
```

### New (Infura - works!):
```javascript
const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);
const ipfs = create({
  url: 'https://ipfs.infura.io:5001',  // ✅ Standard IPFS API
  headers: {
    authorization: auth  // Basic authentication
  }
});
```

---

## 📊 Infura Free Tier Limits

| Resource | Limit |
|----------|-------|
| **Storage** | 5 GB |
| **Bandwidth** | 100 GB/month |
| **Requests** | 100,000/day |
| **Cost** | FREE |

**For most apps, this is plenty!** If you need more:
- **Growth Plan:** $50/month for 50GB storage
- **Pro Plan:** Custom pricing

---

## 🔐 Security Best Practices

### ⚠️ Never Commit Credentials

Make sure `.env` is in `.gitignore`:

```bash
# Check if .env is ignored
cat .gitignore | grep .env

# If not there, add it:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### 🔒 Rotate Credentials Regularly

Every 3-6 months:
1. Create new Infura project
2. Update `.env` with new credentials
3. Rebuild Docker
4. Delete old project

---

## 🐛 Troubleshooting

### Issue 1: Still Getting 404 Error

**Symptoms:**
```
POST https://ipfs.infura.io:5001/api/v0/add
404 Not Found
```

**Solution:**
1. Check your Project ID and Secret are correct
2. Make sure you created an **IPFS** project (not Ethereum)
3. Verify the project is active in Infura dashboard

---

### Issue 2: Unauthorized Error

**Symptoms:**
```
401 Unauthorized
```

**Solution:**
1. Double-check your credentials in `.env`
2. Make sure no extra spaces or quotes
3. Rebuild Docker after changing `.env`:
   ```bash
   docker compose build --no-cache
   docker compose up -d
   ```

---

### Issue 3: Upload Stuck at 0%

**Symptoms:**
- No progress bar movement
- No errors in console

**Solution:**
1. Check browser console for CORS errors
2. Make sure `REACT_APP_IPFS` starts with `https://`
3. Try clearing browser cache and reload

---

### Issue 4: Upload Succeeds But Can't Download

**Symptoms:**
- Upload completes
- Transaction succeeds
- Can't view/download file later

**Solution:**
1. Check `REACT_APP_IPFS_GET_LINK` is correct:
   ```bash
   REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/
   ```
2. Alternative gateways if `ipfs.io` is slow:
   ```bash
   # Option 1: Cloudflare (faster in some regions)
   REACT_APP_IPFS_GET_LINK=https://cloudflare-ipfs.com/ipfs/

   # Option 2: Infura gateway (if you have dedicated gateway)
   REACT_APP_IPFS_GET_LINK=https://your-project.infura-ipfs.io/ipfs/
   ```

---

## 🆚 Comparison: Pinata vs Infura

| Feature | Pinata | Infura |
|---------|--------|--------|
| **HTTP API Support** | ❌ No | ✅ Yes |
| **Works with ipfs-http-client** | ❌ No | ✅ Yes |
| **Free Tier** | 1 GB | 5 GB |
| **Setup Complexity** | Easy | Easy |
| **For Your App** | ❌ Won't work | ✅ Works perfectly |

---

## 📝 Complete .env Example

```bash
# ========================================
# Zarela WebApp Environment Variables
# ========================================

# Smart Contract
REACT_APP_ZARELA_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678

# Etherscan API
REACT_APP_ETHERSCAN_MAINNET_API_LINK=https://api.etherscan.io/api
REACT_APP_ETHEREUM_API_KEY=YOUR_ETHERSCAN_API_KEY
REACT_APP_ETHERSCAN_LINK=https://etherscan.io/tx/

# IPFS (Infura)
REACT_APP_IPFS=https://ipfs.infura.io:5001
REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/

# Infura Credentials
REACT_APP_INFURA_PROJECT_ID=your_infura_project_id_here
REACT_APP_INFURA_PROJECT_SECRET=your_infura_project_secret_here

# Optional Settings
REACT_APP_ZARELA_BUSINESS_CATEGORY=1
REACT_APP_EXPLORE_LINK=https://zarela.io
```

---

## 🚀 Quick Deploy Checklist

- [ ] Create Infura account
- [ ] Create IPFS project on Infura
- [ ] Copy Project ID and Secret
- [ ] Update `.env` with credentials
- [ ] Run `docker compose build`
- [ ] Run `docker compose up -d`
- [ ] Test file upload
- [ ] Verify transaction completes
- [ ] Test file download

---

## 📚 Additional Resources

- **Infura Documentation:** https://docs.infura.io/infura/networks/ipfs
- **ipfs-http-client Docs:** https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client
- **IPFS Public Gateways:** https://ipfs.github.io/public-gateway-checker/

---

## ✅ What Changed in the Code

### Files Updated:
1. `src/workers/encrypt.js` - Worker for encrypted file upload
2. `src/pages/CreateRequest.js` - New request creation page
3. `src/components/UploadFileCard/UploadFileCard.js` - File upload component
4. `src/pages/RequestDetails/RequestDetails.js` - Request details page
5. `Dockerfile` - Added Infura env vars
6. `docker-compose.yml` - Added Infura env vars

### Authentication Change:
```javascript
// Before (Pinata - broken):
authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`

// After (Infura - works):
const auth = 'Basic ' + btoa(
  process.env.REACT_APP_INFURA_PROJECT_ID + ':' + 
  process.env.REACT_APP_INFURA_PROJECT_SECRET
);
authorization: auth
```

---

## 🎯 Expected Results

### Before (Pinata):
```
❌ POST https://api.pinata.cloud/api/v0/add
❌ 404 - INVALID_ROUTE
❌ Upload stuck at 100%, no transaction
```

### After (Infura):
```
✅ POST https://ipfs.infura.io:5001/api/v0/add
✅ 200 OK
✅ Upload completes
✅ MetaMask transaction popup appears
✅ Transaction succeeds
✅ File stored on IPFS
```

---

**You're all set!** 🎉

IPFS uploads should now work perfectly with Infura!

