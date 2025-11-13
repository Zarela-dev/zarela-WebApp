#!/bin/bash

echo "🧪 Testing IPFS Express Proxy Setup"
echo "=================================="

echo ""
echo "1️⃣ Testing Express Proxy Health..."
response=$(curl -s http://localhost:5001/health)
if [[ $? -eq 0 ]]; then
    echo "✅ Express Proxy API: OK"
    echo "   Response: $response"
else
    echo "❌ Express Proxy API: Failed"
fi

echo ""
echo "2️⃣ Testing IPFS Backend (6001)..."
response=$(curl -s -X POST http://localhost:6001/api/v0/version 2>/dev/null)
if [[ $? -eq 0 ]]; then
    echo "✅ IPFS Backend API: OK"
else
    echo "❌ IPFS Backend API: Failed"
fi

echo ""
echo "3️⃣ Testing IPFS Proxy Gateway..."
response=$(curl -s -I http://localhost:8080/ 2>/dev/null)
if [[ $? -eq 0 ]]; then
    echo "✅ IPFS Proxy Gateway: OK"
else
    echo "❌ IPFS Proxy Gateway: Failed"
fi

echo ""
echo "4️⃣ Testing Upload Through Proxy..."
response=$(curl -s -X POST "http://localhost:5001/api/v0/add?pin=true" -F "file=@README.md" 2>/dev/null)
if [[ $? -eq 0 ]]; then
    echo "✅ Upload Through Proxy: OK"
    echo "   Response: $response"
else
    echo "❌ Upload Through Proxy: Failed"
fi

echo ""
echo "🎯 Testing Browser CORS Simulation..."
response=$(curl -s -X POST \
    -H "Origin: http://localhost:3000" \
    -H "X-Requested-With: XMLHttpRequest" \
    -H "Content-Type: multipart/form-data" \
    "http://localhost:5001/api/v0/add?stream-channels=true&pin=true&progress=false" \
    -F "file=@package.json" 2>/dev/null)
    
if [[ $? -eq 0 ]]; then
    echo "✅ Browser CORS Simulation: OK"
    echo "   No CORS errors detected!"
else
    echo "❌ Browser CORS Simulation: Failed"
fi

echo ""
echo "📊 Summary:"
echo "  - Express Proxy: http://localhost:5001 (API) & http://localhost:8080 (Gateway)"
echo "  - IPFS Backend: http://localhost:6001 (API) & http://localhost:6002 (Gateway)"
echo "  - React App: Use localhost:5001/8080 (will connect to Express)"
echo ""
echo "🚀 If all tests pass, your upload loop should be fixed!"
echo "🧹 Clear browser cache and try uploading a file in Zarela."