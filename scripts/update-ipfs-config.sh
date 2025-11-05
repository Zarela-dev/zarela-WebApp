#!/bin/bash
# Script to update IPFS configuration from Zarela's private IPFS to public global IPFS

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌐 IPFS Configuration Updater${NC}"
echo "=============================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create a .env file first"
    exit 1
fi

# Backup current .env
echo -e "${YELLOW}Creating backup of current .env...${NC}"
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
echo -e "${GREEN}✅ Backup created${NC}"
echo ""

# Show current IPFS configuration
echo -e "${BLUE}Current IPFS Configuration:${NC}"
grep -E "REACT_APP_IPFS" .env || echo "No IPFS config found"
echo ""

# Ask user for choice
echo "Select IPFS configuration:"
echo ""
echo "1) Infura + Cloudflare (Recommended for production)"
echo "   Upload: https://ipfs.infura.io:5001"
echo "   Download: https://cloudflare-ipfs.com/ipfs/"
echo ""
echo "2) Infura + IPFS.io"
echo "   Upload: https://ipfs.infura.io:5001"
echo "   Download: https://ipfs.io/ipfs/"
echo ""
echo "3) Local IPFS daemon (for development)"
echo "   Upload: http://localhost:5001"
echo "   Download: http://localhost:8080/ipfs/"
echo ""
echo "4) Custom (you'll be prompted for URLs)"
echo ""

read -p "Enter your choice [1-4]: " choice

case $choice in
    1)
        UPLOAD_API="https://ipfs.infura.io:5001"
        DOWNLOAD_GATEWAY="https://cloudflare-ipfs.com/ipfs/"
        ;;
    2)
        UPLOAD_API="https://ipfs.infura.io:5001"
        DOWNLOAD_GATEWAY="https://ipfs.io/ipfs/"
        ;;
    3)
        UPLOAD_API="http://localhost:5001"
        DOWNLOAD_GATEWAY="http://localhost:8080/ipfs/"
        echo -e "${YELLOW}⚠️  Make sure IPFS daemon is running: ipfs daemon${NC}"
        ;;
    4)
        read -p "Enter IPFS Upload API URL: " UPLOAD_API
        read -p "Enter IPFS Download Gateway URL: " DOWNLOAD_GATEWAY
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}Updating .env file...${NC}"

# Update REACT_APP_IPFS
if grep -q "REACT_APP_IPFS=" .env; then
    # Remove old lines
    sed -i.tmp '/^# your desired IPFS node address/d' .env
    sed -i.tmp '/^REACT_APP_IPFS=/d' .env
    sed -i.tmp '/^# your desired IPFS node Download endpoint/d' .env
    sed -i.tmp '/^# Public IPFS node address/d' .env
    sed -i.tmp '/^# Options: https:\/\/ipfs.infura.io/d' .env
    sed -i.tmp '/^# Public IPFS Gateway/d' .env
    rm -f .env.tmp
fi

# Add new configuration
cat >> .env << EOF

# Public IPFS Configuration (Updated: $(date))
# Upload API endpoint for adding files to IPFS
REACT_APP_IPFS=$UPLOAD_API

# Download gateway for retrieving files from IPFS
REACT_APP_IPFS_GET_LINK=$DOWNLOAD_GATEWAY
EOF

echo -e "${GREEN}✅ IPFS configuration updated!${NC}"
echo ""
echo -e "${BLUE}New Configuration:${NC}"
echo "  Upload API: $UPLOAD_API"
echo "  Download Gateway: $DOWNLOAD_GATEWAY"
echo ""

# Test configuration
echo -e "${BLUE}Testing IPFS endpoints...${NC}"
echo ""

# Test upload endpoint (if it's Infura)
if [[ $UPLOAD_API == *"infura"* ]]; then
    echo -n "Testing Infura API... "
    if curl -s -X POST "$UPLOAD_API/api/v0/version" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${YELLOW}⚠️  Cannot reach (may need authentication)${NC}"
    fi
fi

# Test download gateway
echo -n "Testing download gateway... "
# Test with IPFS logo hash
TEST_HASH="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"
if curl -s -I "${DOWNLOAD_GATEWAY}${TEST_HASH}" | grep -q "200 OK\|301 Moved\|302 Found"; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${YELLOW}⚠️  Cannot reach${NC}"
fi

echo ""
echo -e "${GREEN}Configuration complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. If using Docker, rebuild: ${BLUE}docker compose down && docker compose up --build -d${NC}"
echo "2. If running locally, restart: ${BLUE}npm start${NC}"
echo ""
echo "For more information, see: IPFS-SETUP.md"
echo ""
echo "Backups are saved with timestamp in case you need to revert."

