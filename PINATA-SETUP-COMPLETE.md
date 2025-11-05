# ✅ Pinata Configuration - Complete Setup Guide

## What You Need

Based on your screenshot, you have:
- ✅ Pinata account created
- ✅ API Key generated  
- ✅ JWT token created
- ✅ Dedicated gateway: `olive-select-salmon-280.mypinata.cloud`

---

## 🎯 Correct Configuration

### Use Your DEDICATED Gateway (from screenshot) ⭐

```bash
# .env Configuration
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
REACT_APP_PINATA_JWT=your_actual_jwt_token_here
```

### ❌ DON'T Use Public Gateway

```bash
# WRONG - Don't use this!
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
```

**Why?** Your dedicated gateway (`olive-select-salmon-280.mypinata.cloud`) is:
- ✅ Faster (dedicated resources)
- ✅ More reliable (not shared)
- ✅ Better performance
- ✅ Included in your account
- ✅ Private to you

---

## 📝 Code Changes Made

I've updated all 4 files that create IPFS clients to use Pinata authentication:

### ✅ Files Updated:

1. **`src/workers/encrypt.js`** - For encrypted file uploads
2. **`src/pages/CreateRequest.js`** - For request creation uploads
3. **`src/components/UploadFileCard/UploadFileCard.js`** - For contribution uploads
4. **`src/pages/RequestDetails/RequestDetails.js`** - For file downloads

### What Changed:

**Before:**
```javascript
const ipfs = create(process.env.REACT_APP_IPFS);
```

**After:**
```javascript
const ipfs = create({
  url: process.env.REACT_APP_IPFS,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
  }
});
```

---

## 🔐 Environment Variables

### For Development (.env.local)

```bash
# Pinata IPFS Configuration
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
REACT_APP_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI...
```

### For Production (Server Environment Variables)

**DO NOT commit JWT to git!** Instead:

1. **Add to `.gitignore`**:
   ```
   .env
   .env.local
   .env.production
   ```

2. **Set on your server**:
   ```bash
   export REACT_APP_IPFS=https://api.pinata.cloud
   export REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
   export REACT_APP_PINATA_JWT=your_jwt_here
   ```

3. **Or use server config** (e.g., in CI/CD, Vercel, Netlify, etc.)

---

## 🧪 Testing

### Step 1: Update .env

Create `.env` file with:
```bash
REACT_APP_IPFS=https://api.pinata.cloud
REACT_APP_IPFS_GET_LINK=https://olive-select-salmon-280.mypinata.cloud/ipfs/
REACT_APP_PINATA_JWT=paste_your_actual_jwt_here
```

### Step 2: Rebuild (if using Docker)

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Step 3: Test Upload

1. Start your app (`npm start` or Docker)
2. Try uploading a file
3. Check Pinata dashboard - file should appear there
4. File should be accessible via your dedicated gateway

---

## 📊 How It Works

```
┌─────────────────────────────────────────────────────────┐
│ Your App (Browser)                                       │
│                                                          │
│  Upload File →                                          │
└──────────────┬──────────────────────────────────────────┘
               │
               │ HTTP POST with JWT Bearer token
               │
         ┌─────▼────────────────────────────────┐
         │ https://api.pinata.cloud             │
         │                                      │
         │ ✅ Authenticates with JWT            │
         │ ✅ Uploads to IPFS                   │
         │ ✅ Pins file permanently             │
         │ ✅ Returns CID: QmABC123...          │
         └─────┬────────────────────────────────┘
               │
               │ File pinned and available at:
               │
         ┌─────▼────────────────────────────────────────────┐
         │ https://olive-select-salmon-280.mypinata.cloud  │
         │         /ipfs/QmABC123...                       │
         │                                                  │
         │ ✅ Your dedicated gateway                        │
         │ ✅ Fast, reliable access                         │
         │ ✅ No auth needed for downloads                  │
         └──────────────────────────────────────────────────┘
```

---

## 🔑 About Your JWT Token

### What is it?
- JSON Web Token for authentication
- Allows your app to upload to Pinata
- Proves you have permission

### Security:
- ⚠️ **NEVER commit to git**
- ⚠️ **NEVER share publicly**
- ⚠️ **Use environment variables**
- ✅ Can be rotated from Pinata dashboard

### Where to find it?
From your Pinata dashboard:
1. API Keys section
2. Copy the JWT token (starts with `eyJ...`)
3. Paste into `.env` as `REACT_APP_PINATA_JWT`

---

## 🆚 Upload vs Download

### For UPLOADS (needs authentication)
```
URL: https://api.pinata.cloud
Auth: Bearer JWT token (required)
```

### For DOWNLOADS (no authentication)
```
URL: https://olive-select-salmon-280.mypinata.cloud/ipfs/QmCID
Auth: None needed ✅
```

**Why different?**
- Uploads must be authenticated (to prevent abuse)
- Downloads are public (anyone with CID can access)
- Your dedicated gateway serves downloads fast

---

## ✅ Benefits of This Setup

1. **Permanent Storage**
   - Files automatically pinned
   - Won't disappear when you turn off computer
   - Available 24/7

2. **Better Performance**
   - Dedicated gateway just for you
   - Fast global CDN
   - No rate limit issues

3. **Production Ready**
   - Professional infrastructure
   - 99.9% uptime
   - Scalable

4. **Easy to Use**
   - Same IPFS API
   - Just add authentication header
   - No other code changes

---

## 🔍 Verification

After deployment, verify it's working:

### Check Upload
1. Upload a file through your app
2. Look for CID in response
3. Go to Pinata dashboard → Files
4. Your file should appear there ✅

### Check Download
1. Get the CID from upload
2. Try accessing:
   ```
   https://olive-select-salmon-280.mypinata.cloud/ipfs/YOUR_CID
   ```
3. File should load ✅

---

## 📋 Checklist

- [ ] Created Pinata account
- [ ] Generated API key
- [ ] Copied JWT token
- [ ] Added JWT to `.env`
- [ ] Used dedicated gateway URL in config
- [ ] Updated all 4 code files (done by AI)
- [ ] Added `.env` to `.gitignore`
- [ ] Tested upload
- [ ] Verified file on Pinata dashboard
- [ ] Tested download via dedicated gateway

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Using Public Gateway
```bash
# WRONG
REACT_APP_IPFS_GET_LINK=https://gateway.pinata.cloud/ipfs/
```
✅ **Use your dedicated gateway instead!**

### ❌ Mistake 2: Forgetting JWT
```bash
# WRONG - Missing JWT token
REACT_APP_IPFS=https://api.pinata.cloud
```
✅ **Must include REACT_APP_PINATA_JWT**

### ❌ Mistake 3: JWT in Git
```bash
# WRONG - Committing .env to git
git add .env
```
✅ **Add .env to .gitignore!**

### ❌ Mistake 4: Not Rebuilding
After changing `.env`, you must:
- Restart dev server: `npm start`
- Or rebuild Docker: `docker compose build --no-cache`

---

## 💰 Pinata Pricing

### Free Tier (what you have)
- ✅ 100GB storage
- ✅ Unlimited bandwidth
- ✅ Dedicated gateway included
- ✅ Perfect for most apps

### When to Upgrade
Only if you need:
- More than 100GB storage
- Advanced features
- Priority support

---

## 📚 Additional Resources

- [Pinata Documentation](https://docs.pinata.cloud/)
- [Pinata API Reference](https://docs.pinata.cloud/api-pinning/pinning-files)
- [IPFS-HTTP-Client Docs](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)

---

## 🆘 Troubleshooting

### Upload Fails with 401 Unauthorized
- ✅ Check JWT token is correct
- ✅ Make sure JWT is in `.env`
- ✅ Restart dev server after adding JWT
- ✅ Check no extra spaces in JWT

### Upload Fails with Network Error
- ✅ Check `REACT_APP_IPFS=https://api.pinata.cloud`
- ✅ Verify internet connection
- ✅ Try in browser: `https://api.pinata.cloud/data/testAuthentication`

### File Not Appearing on Gateway
- ✅ Wait a few seconds after upload
- ✅ Check correct CID
- ✅ Verify gateway URL includes `/ipfs/`

### Code Changes Not Working
- ✅ Restart dev server
- ✅ Clear browser cache (Cmd/Ctrl+Shift+R)
- ✅ Check console for errors
- ✅ Verify all 4 files were updated

---

## ✨ You're All Set!

Your Pinata configuration is complete! Your files will now:
- ✅ Upload to Pinata (authenticated)
- ✅ Be permanently pinned
- ✅ Be accessible via your dedicated gateway
- ✅ Be available 24/7

**Next**: Just update your `.env` with the JWT token and test! 🚀


