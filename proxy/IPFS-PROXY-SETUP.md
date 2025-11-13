# Express.js IPFS Proxy Setup Guide

## 🎯 **Solution Overview**

This eliminates CORS issues by using **Express.js as a proxy** between your React app and IPFS.

```
Browser (localhost:3000) → Express Proxy (localhost:5001/8080) → IPFS (localhost:6001/6002)
```

## 🚀 **Setup Instructions**

### **Step 1: Install Dependencies**

```bash
# Install Express proxy dependencies
npm install express http-proxy-middleware cors

# Or if using the package.json:
npm install
```

### **Step 2: Start IPFS on New Ports (6001, 6002)**

```bash
# Remove existing IPFS containers
docker rm -f ipfs-fixed

# Start IPFS on new ports (6001 API, 6002 Gateway)
docker run -d --name ipfs-backend -p 6001:5001 -p 6002:8080 -v ipfs-data:/data/ipfs ipfs/kubo:latest

# Configure CORS on new IPFS (optional since Express handles it)
docker exec ipfs-backend ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
docker restart ipfs-backend
```

### **Step 3: Start Express Proxy**

```bash
# Start the Express proxy (will run on 5001 and 8080)
node ipfs-proxy.js

# Or with nodemon for development
npm run dev
```

### **Step 4: Test the Proxy**

```bash
# Test API proxy
curl http://localhost:5001/health

# Test gateway proxy  
curl http://localhost:8080/

# Test actual IPFS upload through proxy
curl -X POST "http://localhost:5001/api/v0/add?pin=true" -F "file=@README.md"
```

## 🔧 **How It Works**

### **Before (CORS Issues):**
```
Browser → IPFS (localhost:5001) ❌ CORS Error
```

### **After (No CORS Issues):**
```
Browser → Express Proxy (localhost:5001) → IPFS (localhost:6001) ✅ Works!
```

## 📝 **Configuration**

Your `.env` file **不需要改变** (no changes needed):

```bash
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
```

The React app still connects to `localhost:5001` and `localhost:8080`, but now it connects to **Express** instead of direct IPFS.

## 🎛️ **Port Mapping**

| Component | Port | Purpose |
|-----------|------|---------|
| **React App** | 3000 | Your Zarela webapp |
| **Express Proxy** | 5001 | API proxy (upload/download) |
| **Express Proxy** | 8080 | Gateway proxy (file serving) |
| **IPFS Backend** | 6001 | Real IPFS API |
| **IPFS Backend** | 6002 | Real IPFS Gateway |

## ✅ **Benefits**

1. **Zero React Changes**: Keep using `localhost:5001` and `localhost:8080`
2. **No CORS Issues**: Express handles all cross-origin requests
3. **Clean Separation**: IPFS isolated on backend ports
4. **Easy Debugging**: All traffic goes through Express proxy
5. **Production Ready**: Can add authentication, logging, etc.

## 🐛 **Troubleshooting**

### **If Express won't start:**
```bash
# Check if ports are already in use
netstat -an | grep :5001
netstat -an | grep :8080

# Kill existing processes if needed
```

### **If IPFS upload fails:**
```bash
# Check IPFS is running on new ports
curl http://localhost:6001/api/v0/version

# Check Express proxy is running
curl http://localhost:5001/health
```

### **If still getting CORS errors:**
```bash
# Clear browser cache completely
# Try incognito/private mode
# Check browser console for exact error
```

## 🚀 **Production Deployment**

For production, you can:

1. **Deploy Express proxy** on your server
2. **Keep IPFS isolated** on backend
3. **Add authentication** to Express if needed
4. **Add logging/monitoring** to Express
5. **Use HTTPS** with Express

This solution gives you **complete control** over the proxy layer while keeping your React app unchanged!