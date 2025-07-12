#!/bin/bash

# ReWear Platform Stop Script
# This script stops both the frontend and backend services

echo "🛑 Stopping ReWear Platform..."
echo "================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Stop backend
if [ -f "backend.pid" ]; then
    BACKEND_PID=$(cat backend.pid)
    echo -e "${YELLOW}Stopping backend (PID: $BACKEND_PID)...${NC}"
    kill $BACKEND_PID 2>/dev/null
    rm backend.pid
    echo -e "${GREEN}✅ Backend stopped${NC}"
else
    echo -e "${YELLOW}⚠️ Backend PID file not found${NC}"
fi

# Stop frontend
if [ -f "frontend.pid" ]; then
    FRONTEND_PID=$(cat frontend.pid)
    echo -e "${YELLOW}Stopping frontend (PID: $FRONTEND_PID)...${NC}"
    kill $FRONTEND_PID 2>/dev/null
    rm frontend.pid
    echo -e "${GREEN}✅ Frontend stopped${NC}"
else
    echo -e "${YELLOW}⚠️ Frontend PID file not found${NC}"
fi

# Kill any remaining processes on ports 3000 and 8080
echo -e "${YELLOW}Checking for remaining processes...${NC}"

# Kill process on port 3000 (React)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Killing process on port 3000..."
    lsof -Pi :3000 -sTCP:LISTEN -t | xargs kill -9 2>/dev/null
fi

# Kill process on port 8080 (Spring Boot)
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Killing process on port 8080..."
    lsof -Pi :8080 -sTCP:LISTEN -t | xargs kill -9 2>/dev/null
fi

echo ""
echo -e "${GREEN}🎉 ReWear Platform stopped successfully!${NC}"
echo "Thank you for using ReWear! 🌱"