# IPFS Upload Stuck at 52% - Fix Guide

## 🔴 Problem

File upload stops at 52% because:
1. **Docker container has OLD IPFS URLs** baked into the JavaScript
2. **Infura IPFS blocks browser uploads** (requires auth/API key)

## ✅ Solution Options

### **Option 1: Use Local IPFS Daemon (Best for Development)**

#### Step 1: Install & Setup IPFS
```bash
# Install IPFS
brew install ipfs

# Initialize
ipfs init

# Configure CORS for browser access
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://localhost"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'

# Start daemon (keep running)
ipfs daemon
```

#### Step 2: Update .env
```bash
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

#### Step 3: Rebuild Docker
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

### **Option 2: Use Pinata (Requires Free API Key)**

#### Step 1: Get Pinata API Key
1. Go to https://pinata.cloud
2. Sign up (free)
3. Get your JWT token

#### Step 2: Update .env
```bash
# Note: Pinata requires API key in code, need to modify ipfs-http-client usage
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_jwt_token_here
```

#### Step 3: Modify IPFS client creation
Edit `src/workers/encrypt.js` and `src/components/UploadFileCard/UploadFileCard.js`:

```javascript
// Change from:
const ipfs = create(process.env.REACT_APP_IPFS);

// To:
const ipfs = create({
  url: process.env.REACT_APP_IPFS,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
  }
});
```

---

### **Option 3: Use Fleek (Free, No Auth Required)**

#### Step 1: Update .env
```bash
REACT_APP_IPFS=https://ipfs.fleek.co
REACT_APP_IPFS_GET_LINK=https://ipfs.fleek.co/ipfs/
```

#### Step 2: Rebuild Docker
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

### **Option 4: Keep Zarela's IPFS (If Still Available)**

If Zarela's IPFS is still online and you have access:

#### Update .env back
```bash
REACT_APP_IPFS=https://ipfs.zarela.io/
REACT_APP_IPFS_GET_LINK=https://get-ipfs.zarela.io/ipfs/
```

#### Rebuild Docker
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## 🎯 Recommended: Use Local IPFS Daemon

**Pros:**
- ✅ Free, unlimited
- ✅ Full control
- ✅ No authentication
- ✅ Fast
- ✅ Private

**Cons:**
- ❌ Need to run daemon
- ❌ Files only available when daemon is running

**One-Command Setup:**
```bash
./fix-ipfs-upload.sh
```

This script will:
1. Install & configure IPFS
2. Update .env
3. Rebuild Docker
4. Start IPFS daemon

---

## 🔍 Verify Current IPFS Config in Running Container

Check what IPFS URL is currently compiled into your app:

```bash
# Check build environment
docker compose exec zarela-webapp sh -c 'grep -r "ipfs.zarela.io" /usr/share/nginx/html/static/js/ && echo "OLD CONFIG FOUND" || echo "Config updated"'
```

---

## 🧪 Test IPFS Connection

### Test Local IPFS:
```bash
curl -X POST http://localhost:5001/api/v0/version
```

### Test Upload:
```bash
echo "test" | curl -X POST -F file=@- http://localhost:5001/api/v0/add
```

---

## 📝 Important Notes

1. **Environment variables are baked into React build** - you MUST rebuild Docker after changing IPFS URLs
2. **Infura IPFS blocks browser uploads** - don't use it without authentication
3. **Always rebuild with --no-cache** to ensure clean build:
   ```bash
   docker compose build --no-cache
   ```

---

## ⚡ Quick Commands

### Rebuild Docker (after changing .env):
```bash
docker compose down && docker compose build --no-cache && docker compose up -d
```

### Check container logs:
```bash
docker compose logs -f zarela-webapp
```

### Check browser console:
Open DevTools → Console → Look for IPFS errors

---

## 🐛 Still Not Working?

### Check browser Network tab:
1. Open DevTools → Network
2. Try uploading again
3. Look for failed POST requests to IPFS
4. Check the error message

### Common errors:

**"NetworkError" or "Failed to fetch":**
- IPFS endpoint is not accessible
- CORS not configured

**"Timeout":**
- IPFS node is slow or down
- File is too large

**"401 Unauthorized":**
- IPFS endpoint requires authentication

---

## 💡 Best Practice

For production, use:
- **Pinata** (paid, reliable)
- **Web3.Storage** (free for now)
- **Your own IPFS node** (full control)

For development:
- **Local IPFS daemon** (best option)


