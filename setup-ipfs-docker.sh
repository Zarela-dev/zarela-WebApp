#!/bin/bash

echo "🐳 Setting up IPFS for Docker..."
echo ""

# Check if IPFS daemon is running
if ! curl -s -X POST http://localhost:5001/api/v0/version > /dev/null; then
    echo "❌ IPFS daemon is NOT running!"
    echo "💡 Start it first: ipfs daemon"
    exit 1
fi

echo "✅ IPFS daemon is running"
echo ""

# Create backup
if [ -f .env ]; then
    cp .env .env.backup.docker.$(date +%Y%m%d_%H%M%S)
    echo "✅ Created backup of .env"
fi

# Update .env for Docker
sed -i.tmp '/^REACT_APP_IPFS=/d' .env
sed -i.tmp '/^REACT_APP_IPFS_GET_LINK=/d' .env
rm -f .env.tmp

echo "" >> .env
echo "# IPFS Configuration for Docker" >> .env
echo "REACT_APP_IPFS=http://host.docker.internal:5001" >> .env
echo "REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/" >> .env

echo "✅ Updated .env for Docker"
echo ""
echo "📝 Configuration:"
echo "   REACT_APP_IPFS=http://host.docker.internal:5001"
echo "   REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/"
echo ""
echo "🔨 Now rebuild Docker image:"
echo "   docker compose down"
echo "   docker compose build --no-cache"
echo "   docker compose up -d"
echo ""
echo "⚠️  IMPORTANT: Keep IPFS daemon running on your Mac!"
echo "   The Docker container needs to access it via host.docker.internal"
echo ""

