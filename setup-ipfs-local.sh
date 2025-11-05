#!/bin/bash

echo "💻 Setting up IPFS for Local Development (npm start)..."
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
    cp .env .env.backup.local.$(date +%Y%m%d_%H%M%S)
    echo "✅ Created backup of .env"
fi

# Update .env for local development
sed -i.tmp '/^REACT_APP_IPFS=/d' .env
sed -i.tmp '/^REACT_APP_IPFS_GET_LINK=/d' .env
rm -f .env.tmp

echo "" >> .env
echo "# IPFS Configuration for Local Development" >> .env
echo "REACT_APP_IPFS=http://localhost:5001" >> .env
echo "REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/" >> .env

echo "✅ Updated .env for local development"
echo ""
echo "📝 Configuration:"
echo "   REACT_APP_IPFS=http://localhost:5001"
echo "   REACT_APP_IPFS_GET_LINK=http://localhost:8080/ipfs/"
echo ""
echo "🚀 Now restart your dev server:"
echo "   npm start"
echo ""

