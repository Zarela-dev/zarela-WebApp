# Zarela WebApp - Docker Makefile
# Simplified single-configuration setup for Ethereum Mainnet

.PHONY: help build start stop restart logs shell clean rebuild health stats check-env prune

# Default target
.DEFAULT_GOAL := help

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
RED := \033[0;31m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Zarela WebApp - Docker Commands$(NC)"
	@echo "=================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

dev: ## Start local development server with Node 14
	@echo "$(BLUE)Starting development server with Node 14...$(NC)"
	@export PATH="/tmp/node-v14.21.3-darwin-x64/bin:$$PATH" && npm run start

build: ## Build the Docker image
	@echo "$(BLUE)Building Zarela WebApp image...$(NC)"
	docker-compose build

start: ## Start the application
	@echo "$(BLUE)Starting Zarela WebApp...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✅ Application running at http://localhost$(NC)"
	@echo "View logs with: make logs"

stop: ## Stop the application
	@echo "$(BLUE)Stopping Zarela WebApp...$(NC)"
	docker-compose down

restart: ## Restart the application
	@echo "$(BLUE)Restarting Zarela WebApp...$(NC)"
	docker-compose restart

up: ## Build and start the application
	@echo "$(BLUE)Building and starting Zarela WebApp...$(NC)"
	docker-compose up --build -d
	@echo "$(GREEN)✅ Application running at http://localhost$(NC)"

logs: ## View application logs
	docker-compose logs -f

logs-tail: ## View last 100 lines of logs
	docker-compose logs --tail=100

shell: ## Open shell in container
	docker-compose exec zarela-webapp sh

ps: ## Show container status
	@echo "$(BLUE)Container status:$(NC)"
	@docker-compose ps

health: ## Check health status
	@echo "$(BLUE)Health status:$(NC)"
	@docker inspect --format='{{.State.Health.Status}}' zarela-webapp 2>/dev/null || echo "Container not running"

stats: ## Show container resource usage
	@echo "$(BLUE)Resource usage:$(NC)"
	@docker stats --no-stream zarela-webapp 2>/dev/null || echo "Container not running"

clean: ## Remove container, image, and network
	@echo "$(RED)⚠️  This will remove the container, image, and network$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(BLUE)Cleaning up...$(NC)"; \
		docker-compose down; \
		docker rmi zarela-webapp:latest 2>/dev/null || true; \
		echo "$(GREEN)✅ Cleanup complete$(NC)"; \
	fi

rebuild: ## Rebuild from scratch (no cache)
	@echo "$(BLUE)Rebuilding image (no cache)...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✅ Rebuild complete$(NC)"

check-env: ## Verify .env file configuration
	@echo "$(BLUE)Checking environment configuration...$(NC)"
	@if [ -f .env ]; then \
		echo "$(GREEN)✅ .env file found$(NC)"; \
		grep -q "REACT_APP_ZARELA_CONTRACT_ADDRESS" .env && echo "$(GREEN)✅ Contract address configured$(NC)" || echo "$(RED)❌ Contract address missing$(NC)"; \
		grep -q "REACT_APP_ETHERSCAN_MAINNET_API_LINK" .env && echo "$(GREEN)✅ Etherscan API link configured$(NC)" || echo "$(RED)❌ Etherscan API link missing$(NC)"; \
		grep -q "REACT_APP_ETHEREUM_API_KEY" .env && echo "$(GREEN)✅ Ethereum API key configured$(NC)" || echo "$(RED)❌ Ethereum API key missing$(NC)"; \
	else \
		echo "$(RED)❌ .env file not found$(NC)"; \
		echo "Create a .env file with required variables"; \
	fi

prune: ## Remove all unused Docker resources
	@echo "$(RED)⚠️  This will remove ALL unused Docker resources$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(BLUE)Pruning Docker system...$(NC)"; \
		docker system prune -a --volumes -f; \
		echo "$(GREEN)✅ Prune complete$(NC)"; \
	fi

images: ## List Zarela Docker images
	@echo "$(BLUE)Zarela Docker images:$(NC)"
	@docker images | grep -E "zarela|REPOSITORY"

deploy: build start ## Build and deploy the application
	@echo "$(GREEN)✅ Deployment complete$(NC)"
	@echo "$(BLUE)Application is running at http://localhost$(NC)"
	@echo ""
	@echo "Useful commands:"
	@echo "  View logs:    make logs"
	@echo "  Stop:         make stop"
	@echo "  Restart:      make restart"
	@echo "  Health:       make health"
