#!/bin/bash

# 🧪 Nerdwork+ MVP Test Runner
echo "🚀 Starting Nerdwork+ MVP Test Suite"
echo "==============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if service is running
check_service() {
    local service_name=$1
    local service_url=$2
    
    echo -n "Checking $service_name... "
    
    if curl -s "$service_url/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Running${NC}"
        return 0
    else
        echo -e "${RED}❌ Not responding${NC}"
        return 1
    fi
}

# Check if services are running
echo -e "\n${YELLOW}🔧 Checking Service Health...${NC}"
echo "-----------------------------------------------"

services_ok=true

check_service "API Gateway" "http://localhost:3000" || services_ok=false
check_service "Auth Service" "http://localhost:3001" || services_ok=false
check_service "User Service" "http://localhost:3002" || services_ok=false
check_service "Comic Service" "http://localhost:3003" || services_ok=false
check_service "Wallet Service" "http://localhost:3004" || services_ok=false
check_service "File Service" "http://localhost:3007" || services_ok=false

if [ "$services_ok" = false ]; then
    echo -e "\n${RED}⚠️  Some services are not responding!${NC}"
    echo "Please ensure all services are running:"
    echo "  docker-compose up -d"
    echo "Or start individual services in development mode"
    echo ""
    read -p "Continue with tests anyway? (y/N): " continue_tests
    if [[ ! "$continue_tests" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}📦 Installing test dependencies...${NC}"
    npm install
fi

# Set default environment variables if not set
export API_GATEWAY_URL=${API_GATEWAY_URL:-http://localhost:3000}
export AUTH_SERVICE_URL=${AUTH_SERVICE_URL:-http://localhost:3001}
export USER_SERVICE_URL=${USER_SERVICE_URL:-http://localhost:3002}
export COMIC_SERVICE_URL=${COMIC_SERVICE_URL:-http://localhost:3003}
export WALLET_SERVICE_URL=${WALLET_SERVICE_URL:-http://localhost:3004}
export FILE_SERVICE_URL=${FILE_SERVICE_URL:-http://localhost:3007}

echo -e "\n${YELLOW}🌐 Test Environment Configuration:${NC}"
echo "-----------------------------------------------"
echo "API Gateway: $API_GATEWAY_URL"
echo "Auth Service: $AUTH_SERVICE_URL"
echo "User Service: $USER_SERVICE_URL"
echo "Comic Service: $COMIC_SERVICE_URL"
echo "Wallet Service: $WALLET_SERVICE_URL"
echo "File Service: $FILE_SERVICE_URL"

# Function to run test with timing
run_test() {
    local test_name=$1
    local test_file=$2
    
    echo -e "\n${YELLOW}🧪 Running $test_name Tests...${NC}"
    echo "-----------------------------------------------"
    
    start_time=$(date +%s)
    
    if npm run test -- "$test_file" --verbose; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo -e "${GREEN}✅ $test_name tests passed in ${duration}s${NC}"
        return 0
    else
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo -e "${RED}❌ $test_name tests failed after ${duration}s${NC}"
        return 1
    fi
}

# Ask user which tests to run
echo -e "\n${YELLOW}📋 Test Suite Options:${NC}"
echo "-----------------------------------------------"
echo "1. Complete User Flow Test (Integration)"
echo "2. Authentication Service Tests"
echo "3. Wallet Service Tests"
echo "4. File Service Tests"
echo "5. Comic Creator Flow Tests"
echo "6. All Individual Service Tests"
echo "7. All Tests (Full Suite)"
echo "8. Quick Smoke Test"

read -p "Select test option (1-8): " test_option

case $test_option in
    1)
        run_test "User Flow Integration" "user-flow.test.ts"
        ;;
    2)
        run_test "Authentication Service" "auth-service.test.ts"
        ;;
    3)
        run_test "Wallet Service" "wallet-service.test.ts"
        ;;
    4)
        run_test "File Service" "file-service.test.ts"
        ;;
    5)
        run_test "Comic Creator Flow" "comic-creator.test.ts"
        ;;
    6)
        echo -e "\n${YELLOW}🚀 Running All Service Tests...${NC}"
        echo "==============================================="
        
        all_passed=true
        
        run_test "Authentication Service" "auth-service.test.ts" || all_passed=false
        run_test "Wallet Service" "wallet-service.test.ts" || all_passed=false
        run_test "File Service" "file-service.test.ts" || all_passed=false
        run_test "Comic Creator Flow" "comic-creator.test.ts" || all_passed=false
        
        if [ "$all_passed" = true ]; then
            echo -e "\n${GREEN}🎉 All service tests passed!${NC}"
        else
            echo -e "\n${RED}💥 Some service tests failed!${NC}"
            exit 1
        fi
        ;;
    7)
        echo -e "\n${YELLOW}🚀 Running Full Test Suite...${NC}"
        echo "==============================================="
        
        all_passed=true
        
        run_test "User Flow Integration" "user-flow.test.ts" || all_passed=false
        run_test "Authentication Service" "auth-service.test.ts" || all_passed=false
        run_test "Wallet Service" "wallet-service.test.ts" || all_passed=false
        run_test "File Service" "file-service.test.ts" || all_passed=false
        run_test "Comic Creator Flow" "comic-creator.test.ts" || all_passed=false
        
        if [ "$all_passed" = true ]; then
            echo -e "\n${GREEN}🎉 ALL TESTS PASSED! MVP IS READY! 🚀${NC}"
        else
            echo -e "\n${RED}💥 Some tests failed! Check logs above.${NC}"
            exit 1
        fi
        ;;
    8)
        echo -e "\n${YELLOW}⚡ Running Quick Smoke Test...${NC}"
        echo "-----------------------------------------------"
        
        # Just test one key endpoint from each service
        echo "Testing API Gateway..."
        curl -f "$API_GATEWAY_URL/health" > /dev/null || exit 1
        
        echo "Testing Auth Service..."
        curl -f "$AUTH_SERVICE_URL/health" > /dev/null || exit 1
        
        echo "Testing Basic Registration..."
        smoke_email="smoke-test-$(date +%s)@nerdwork.com"
        response=$(curl -s -X POST "$API_GATEWAY_URL/auth/signup" \
            -H "Content-Type: application/json" \
            -d "{\"email\":\"$smoke_email\",\"password\":\"SmokeTest123!\",\"username\":\"smoketest$(date +%s)\"}")
        
        if echo "$response" | grep -q "success.*true"; then
            echo -e "${GREEN}✅ Smoke test passed - Basic functionality working${NC}"
        else
            echo -e "${RED}❌ Smoke test failed - Basic functionality not working${NC}"
            echo "Response: $response"
            exit 1
        fi
        ;;
    *)
        echo "Invalid option. Exiting."
        exit 1
        ;;
esac

echo -e "\n${GREEN}🎯 Test execution completed!${NC}"
echo "==============================================="
echo "📊 Next steps:"
echo "  - Review any failed tests above"
echo "  - Check service logs if needed"
echo "  - Run with coverage: npm run test:coverage"
echo "  - For development: npm run test:watch"
echo ""
echo "🚀 MVP Status: Ready for deployment if all tests pass!"