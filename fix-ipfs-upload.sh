#!/bin/bash
# Quick fix for IPFS upload issue

set -e

echo "🔧 Fixing IPFS Upload Issue..."
echo ""

# Backup current .env
cp .env .env.backup.fix

# Update to working IPFS endpoints
echo "📝 Updating IPFS configuration to use local IPFS daemon..."
sed -i.tmp '/^REACT_APP_IPFS=/d' .env
sed -i.tmp '/^REACT_APP_IPFS_GET_LINK=/d' .env
sed -i.tmp '/^# Public IPFS/d' .env
sed -i.tmp '/^# Upload API/d' .env  
sed -i.tmp '/^# Download gateway/d' .env
rm -f .env.tmp

cat >> .env << 'EOF'

# Local IPFS Configuration (requires: ipfs daemon)
REACT_APP_IPFS=http://localhost:5001
REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/
EOF

echo "✅ Updated .env"
echo ""

# Check if IPFS is installed
if ! command -v ipfs &> /dev/null; then
    echo "❌ IPFS not installed"
    echo ""
    echo "Install with: brew install ipfs"
    echo "Or update .env manually with a working IPFS endpoint"
    exit 1
fi

# Check if IPFS is initialized
if [ ! -d ~/.ipfs ]; then
    echo "🔧 Initializing IPFS..."
    ipfs init
fi

# Configure CORS
echo "🔧 Configuring IPFS CORS..."
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://localhost", "http://127.0.0.1:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'

echo "✅ IPFS configured"
echo ""

# Start IPFS daemon in background
echo "🚀 Starting IPFS daemon..."
ipfs daemon &
IPFS_PID=$!

sleep 3

if ps -p $IPFS_PID > /dev/null; then
    echo "✅ IPFS daemon running (PID: $IPFS_PID)"
else
    echo "❌ IPFS daemon failed to start"
    exit 1
fi

echo ""
echo "🐳 Rebuilding Docker container with new configuration..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo ""
echo "✅ All done!"
echo ""
echo "🌐 Application: http://localhost"
echo "📦 IPFS API: http://localhost:5001"
echo "🔗 IPFS Gateway: http://localhost:8080"
echo ""
echo "⚠️  Keep IPFS daemon running while using the app"
echo "   To stop: kill $IPFS_PID"
echo ""
echo "Try uploading your file again!"


