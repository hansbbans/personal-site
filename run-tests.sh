#!/bin/bash

# Comprehensive test runner for personal site
set -e

echo "🧪 Personal Site Test Suite"
echo "=========================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results tracking
UNIT_TESTS_PASSED=false
E2E_TESTS_PASSED=false
PERFORMANCE_TESTS_PASSED=false

# Function to print colored output
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo ""
echo "🔍 Pre-test checks..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Install Playwright browsers if needed
if [ ! -d "node_modules/@playwright/test" ]; then
    print_warning "Installing Playwright browsers..."
    npx playwright install
fi

echo ""
echo "🔧 Unit Tests"
echo "-------------"

# Run unit tests
if npm run test:unit; then
    UNIT_TESTS_PASSED=true
    print_status "Unit tests passed" 0
else
    print_status "Unit tests failed" 1
fi

echo ""
echo "🌐 E2E Tests"
echo "------------"

# Start local server for E2E tests
echo "Starting local server..."
npx http-server -p 3000 > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "Server started successfully"
    
    # Run E2E tests
    if npm run test:e2e; then
        E2E_TESTS_PASSED=true
        print_status "E2E tests passed" 0
    else
        print_status "E2E tests failed" 1
    fi
else
    print_status "Failed to start local server" 1
fi

echo ""
echo "🚀 Performance Tests"
echo "-------------------"

# Run performance tests (Lighthouse)
if npm run test:performance; then
    PERFORMANCE_TESTS_PASSED=true
    print_status "Performance tests passed" 0
else
    print_status "Performance tests failed" 1
fi

# Clean up server
echo ""
echo "🧹 Cleaning up..."
if [ ! -z "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null || true
    echo "Local server stopped"
fi

echo ""
echo "📊 Test Results Summary"
echo "======================"

# Print summary
if [ "$UNIT_TESTS_PASSED" = true ]; then
    echo -e "${GREEN}✅ Unit Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Unit Tests: FAILED${NC}"
fi

if [ "$E2E_TESTS_PASSED" = true ]; then
    echo -e "${GREEN}✅ E2E Tests: PASSED${NC}"
else
    echo -e "${RED}❌ E2E Tests: FAILED${NC}"
fi

if [ "$PERFORMANCE_TESTS_PASSED" = true ]; then
    echo -e "${GREEN}✅ Performance Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Performance Tests: FAILED${NC}"
fi

echo ""

# Final status
if [ "$UNIT_TESTS_PASSED" = true ] && [ "$E2E_TESTS_PASSED" = true ] && [ "$PERFORMANCE_TESTS_PASSED" = true ]; then
    echo -e "${GREEN}🎉 All tests passed! Site is ready for deployment.${NC}"
    exit 0
else
    echo -e "${RED}💥 Some tests failed. Please fix issues before deployment.${NC}"
    
    echo ""
    echo "📝 Next steps:"
    echo "- Check test-results/ directory for detailed reports"
    echo "- Fix failing tests and run again"
    echo "- Use 'npm run test:watch' for development"
    
    exit 1
fi