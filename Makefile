.PHONY: install dev build preview clean setup all

# Default target - setup and run
all: setup dev

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Setup project (install dependencies)
setup: install
	@echo "✅ Project setup complete!"

# Run development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Build for production
build:
	@echo "🏗️ Building for production..."
	npm run build

# Preview production build
preview:
	@echo "👁️ Previewing production build..."
	npm run preview

# Clean node_modules and build artifacts
clean:
	@echo "🧹 Cleaning project..."
	rm -rf node_modules dist .cache

# Reinstall all dependencies
reinstall: clean install
	@echo "✅ Reinstall complete!"

# Help
help:
	@echo "Available commands:"
	@echo "  make setup    - Install dependencies"
	@echo "  make dev      - Start development server"
	@echo "  make build    - Build for production"
	@echo "  make preview  - Preview production build"
	@echo "  make clean    - Remove node_modules and build files"
	@echo "  make all      - Setup and start dev server"
