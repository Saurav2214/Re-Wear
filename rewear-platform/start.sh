#!/bin/bash

# ReWear Platform Startup Script
# This script starts both the frontend and backend services

echo "🌱 Starting ReWear Platform..."
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js (v16+)${NC}"
    exit 1
fi

if ! command_exists java; then
    echo -e "${RED}❌ Java not found. Please install Java (v21+)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Start backend
echo -e "${YELLOW}Starting Spring Boot backend...${NC}"
cd backend

# Check if mvnw exists, if not create it
if [ ! -f "./mvnw" ]; then
    echo "Creating Maven wrapper..."
    mvn wrapper:wrapper
fi

# Start backend in background
chmod +x mvnw
./mvnw spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo "📊 Backend logs: tail -f backend.log"
echo "🌐 Backend URL: http://localhost:8080"
echo "📋 H2 Console: http://localhost:8080/api/h2-console"

# Wait for backend to start
echo -e "${YELLOW}Waiting for backend to start...${NC}"
sleep 10

# Start frontend
echo -e "${YELLOW}Starting React frontend...${NC}"
cd ../frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "📊 Frontend logs: tail -f frontend.log"
echo "🌐 Frontend URL: http://localhost:3000"

# Save PIDs for cleanup
echo $BACKEND_PID > ../backend.pid
echo $FRONTEND_PID > ../frontend.pid

echo ""
echo "🎉 ReWear Platform is starting up!"
echo "=================================="
echo "🖥️  Frontend: http://localhost:3000"
echo "⚡ Backend:  http://localhost:8080"
echo "📊 Database: http://localhost:8080/api/h2-console"
echo ""
echo "📋 Demo Accounts:"
echo "   User: demo@rewear.com / password123"
echo "   Admin: admin@rewear.com / admin123"
echo ""
echo "📝 Logs:"
echo "   Backend: tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop services: ./stop.sh"
echo ""
echo -e "${GREEN}Happy Swapping! 🌱♻️${NC}"

# Wait for user to stop
echo "Press Ctrl+C to stop all services..."
trap 'echo "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait