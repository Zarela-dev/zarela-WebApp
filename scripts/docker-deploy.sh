#!/bin/bash
# Zarela WebApp Docker deployment script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Zarela WebApp - Docker Deployment${NC}"
echo "=============================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create a .env file with required environment variables"
    exit 1
fi

# Load environment variables
source .env

# Validate required variables
REQUIRED_VARS=(
    "REACT_APP_ZARELA_CONTRACT_ADDRESS"
    "REACT_APP_ETHERSCAN_MAINNET_API_LINK"
    "REACT_APP_ETHEREUM_API_KEY"
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}❌ Error: $var is not set in .env${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables validated${NC}"
echo ""

# Check Docker installation
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Error: Docker is not installed${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Error: Docker Compose is not installed${NC}"
    exit 1
fi

# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

echo "Building Docker image..."
echo ""

# Build the image
docker-compose build

echo ""
echo -e "${GREEN}✅ Docker image built successfully${NC}"
echo ""

# Check if port 80 is available
if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Warning: Port 80 is already in use${NC}"
    echo "Stop the process using port 80 or use a different port"
    exit 1
fi

# Start the container
echo "Starting container..."
docker-compose up -d

echo ""
echo -e "${GREEN}✅ Container started successfully${NC}"
echo ""
echo "🌐 Application is running at: http://localhost"
echo ""
echo "Useful commands:"
echo "  View logs:    docker-compose logs -f"
echo "  Stop:         docker-compose down"
echo "  Restart:      docker-compose restart"
echo "  Status:       docker-compose ps"
echo "  Health:       docker inspect --format='{{.State.Health.Status}}' zarela-webapp"
echo ""

# Wait for health check
echo "Waiting for health check..."
sleep 5

HEALTH=$(docker inspect --format='{{.State.Health.Status}}' zarela-webapp 2>/dev/null || echo "unknown")
if [ "$HEALTH" = "healthy" ]; then
    echo -e "${GREEN}✅ Container is healthy${NC}"
elif [ "$HEALTH" = "starting" ]; then
    echo -e "${YELLOW}⏳ Container is starting (health check pending)${NC}"
else
    echo -e "${YELLOW}⚠️  Health status: $HEALTH${NC}"
    echo "Check logs with: docker-compose logs"
fi

echo ""
echo -e "${GREEN}Deployment complete!${NC}"

