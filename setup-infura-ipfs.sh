#!/bin/bash

# Zarela - Switch to Infura IPFS Configuration
# This script updates .env to use Infura IPFS

echo "🔧 Zarela - Infura IPFS Setup"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file first."
    exit 1
fi

echo "📋 You'll need your Infura credentials:"
echo "1. Go to: https://infura.io/"
echo "2. Create an IPFS project"
echo "3. Copy your Project ID and Secret"
echo ""

# Ask for credentials
read -p "Enter your Infura Project ID: " PROJECT_ID
read -sp "Enter your Infura Project Secret: " PROJECT_SECRET
echo ""

if [ -z "$PROJECT_ID" ] || [ -z "$PROJECT_SECRET" ]; then
    echo "❌ Error: Project ID and Secret are required!"
    exit 1
fi

# Backup .env
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backed up .env"

# Update .env with Infura configuration
echo ""
echo "📝 Updating .env..."

# Remove old Pinata config if exists
sed -i.tmp '/REACT_APP_PINATA_JWT/d' .env 2>/dev/null

# Update or add Infura config
if grep -q "REACT_APP_IPFS=" .env; then
    sed -i.tmp "s|REACT_APP_IPFS=.*|REACT_APP_IPFS=https://ipfs.infura.io:5001|" .env
else
    echo "REACT_APP_IPFS=https://ipfs.infura.io:5001" >> .env
fi

if grep -q "REACT_APP_IPFS_GET_LINK=" .env; then
    sed -i.tmp "s|REACT_APP_IPFS_GET_LINK=.*|REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/|" .env
else
    echo "REACT_APP_IPFS_GET_LINK=https://ipfs.io/ipfs/" >> .env
fi

if grep -q "REACT_APP_INFURA_PROJECT_ID=" .env; then
    sed -i.tmp "s|REACT_APP_INFURA_PROJECT_ID=.*|REACT_APP_INFURA_PROJECT_ID=${PROJECT_ID}|" .env
else
    echo "REACT_APP_INFURA_PROJECT_ID=${PROJECT_ID}" >> .env
fi

if grep -q "REACT_APP_INFURA_PROJECT_SECRET=" .env; then
    sed -i.tmp "s|REACT_APP_INFURA_PROJECT_SECRET=.*|REACT_APP_INFURA_PROJECT_SECRET=${PROJECT_SECRET}|" .env
else
    echo "REACT_APP_INFURA_PROJECT_SECRET=${PROJECT_SECRET}" >> .env
fi

# Clean up temporary files
rm -f .env.tmp 2>/dev/null

echo "✅ Updated .env with Infura configuration"
echo ""
echo "📋 Current IPFS Configuration:"
echo "================================"
grep "REACT_APP_IPFS" .env
echo ""

echo "🐳 Next Steps:"
echo "1. Rebuild Docker: docker compose build"
echo "2. Start Docker:   docker compose up -d"
echo "3. Test upload at: http://your-server:8080"
echo ""
echo "✅ Done! See INFURA-IPFS-SETUP.md for full guide."

