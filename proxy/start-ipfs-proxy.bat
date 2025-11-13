@echo off
echo ================================================
echo 🚀 Zarela IPFS Express Proxy Setup
echo ================================================

echo.
echo 📦 Step 1: Installing Express Proxy Dependencies...
npm install express http-proxy-middleware cors

echo.
echo 🗑️  Step 2: Stopping existing IPFS container...
docker stop ipfs-fixed
docker rm ipfs-fixed

echo.
echo 🐳 Step 3: Starting IPFS on new backend ports (6001, 6002)...
docker run -d --name ipfs-backend -p 6001:5001 -p 6002:8080 -v ipfs-data:/data/ipfs ipfs/kubo:latest

echo.
echo ⏳ Waiting for IPFS to start...
timeout /t 5

echo.
echo 🔧 Step 4: Configuring IPFS CORS (optional)...
docker exec ipfs-backend ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' 2>nul || echo IPFS config already set

echo.
echo 🚀 Step 5: Starting Express Proxy Server...
echo Your React app can now upload files without CORS issues!
echo.
echo Browser will connect to: localhost:5001 (API) and localhost:8080 (Gateway)
echo Express will proxy to: localhost:6001 (IPFS API) and localhost:6002 (IPFS Gateway)
echo.
echo Press Ctrl+C to stop the proxy server
echo.

node ipfs-proxy.js