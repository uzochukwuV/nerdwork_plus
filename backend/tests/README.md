# 🧪 Nerdwork+ MVP Test Suite

Comprehensive user flow tests for the Nerdwork+ MVP implementation, covering all microservices and the complete user journey from registration to comic creation and consumption.

## 📋 Test Coverage

### 1️⃣ **Complete User Flow Test** (`user-flow.test.ts`)
End-to-end integration test covering the entire MVP user journey:
- User registration & authentication
- Creator account setup
- Crypto wallet connection & payments
- File uploads (S3 + IPFS)
- Comic creation & publishing
- Consumer discovery & purchases
- Error handling & edge cases

### 2️⃣ **Authentication Service Tests** (`auth-service.test.ts`)
Focused tests for the auth service:
- User registration with validation
- Login/logout flows
- JWT token management
- Password reset functionality
- Security measures (rate limiting, SQL injection protection)
- Concurrent request handling

### 3️⃣ **Wallet Service Tests** (`wallet-service.test.ts`)
Comprehensive wallet and payment testing:
- Wallet creation & management
- Crypto wallet connection (Phantom, Solflare)
- Helio payment integration
- NWT token purchases & spending
- Transaction history & pagination
- Stripe payment methods
- Balance calculations & integrity

### 4️⃣ **File Service Tests** (`file-service.test.ts`)
File storage and management testing:
- AWS S3 uploads
- IPFS uploads via Pinata
- Dual storage (S3 + IPFS) for NFTs
- File categorization & metadata
- Presigned upload URLs
- File access control & security
- File deletion & cleanup

### 5️⃣ **Comic Creator Flow Tests** (`comic-creator.test.ts`)
Creator-focused workflow testing:
- Becoming a creator
- Comic creation & management
- Content upload & organization
- Publishing workflows
- Creator dashboard & analytics
- Consumer interaction with comics
- Cross-service integration

## 🚀 Running Tests

### Prerequisites
```bash
# Ensure all services are running
docker-compose up -d

# Or start individual services
npm run start  # In each service directory
```

### Install Test Dependencies
```bash
cd tests/
npm install
```

### Run All Tests
```bash
# Complete test suite
npm test

# Watch mode for development
npm run test:watch

# With coverage report
npm run test:coverage
```

### Run Specific Test Suites
```bash
# Integration test (full user flow)
npm run test:integration

# Individual service tests
npm run test:auth
npm run test:wallet
npm run test:files
npm run test:creator

# All service tests
npm run test:services
```

## 🔧 Environment Configuration

Set environment variables for different test environments:

```bash
# Local development (default)
export API_GATEWAY_URL=http://localhost:3000
export AUTH_SERVICE_URL=http://localhost:3001
export USER_SERVICE_URL=http://localhost:3002
export COMIC_SERVICE_URL=http://localhost:3003
export WALLET_SERVICE_URL=http://localhost:3004
export FILE_SERVICE_URL=http://localhost:3007

# Docker environment
export API_GATEWAY_URL=http://api-gateway:3000
export AUTH_SERVICE_URL=http://auth-service:3001
# ... etc

# Staging/Production
export API_GATEWAY_URL=https://api-staging.nerdwork.com
# ... etc
```

## 📊 Test Structure

### User Flow Scenarios Tested

1. **New User Registration**
   - ✅ Creator signs up and becomes creator
   - ✅ Consumer signs up for comic consumption
   - ✅ Profile creation and management

2. **Creator Journey**
   - ✅ Become creator with profile setup
   - ✅ Upload comic assets (cover + pages)
   - ✅ Create comic with metadata
   - ✅ Add pages with preview/premium content
   - ✅ Publish comic for consumers
   - ✅ View creator dashboard statistics

3. **Consumer Journey**
   - ✅ Connect crypto wallet (Phantom/Solflare)
   - ✅ Purchase NWT tokens via Helio (USDC/SOL)
   - ✅ Discover and browse comics
   - ✅ View preview pages
   - ✅ Purchase comics with NWT
   - ✅ Track reading progress
   - ✅ Leave reviews and ratings

4. **Web3 Integration**
   - ✅ Helio crypto payment processing
   - ✅ IPFS file storage via Pinata
   - ✅ NFT-ready asset preparation
   - ✅ Wallet connection and verification

5. **Service Integration**
   - ✅ Cross-service communication
   - ✅ File service integration with comics
   - ✅ Creator profile consistency
   - ✅ Transaction integrity across services

## 🛡️ Security & Error Handling Tests

- **Authentication**: Token validation, unauthorized access prevention
- **Authorization**: Role-based access control (creator vs consumer)
- **Input Validation**: SQL injection prevention, data sanitization
- **File Security**: Upload restrictions, access control
- **Rate Limiting**: Preventing abuse and spam
- **Data Integrity**: Balance calculations, transaction consistency
- **Error Handling**: Graceful failure handling, proper error responses

## 📈 Performance Tests

- **Response Times**: API endpoint performance monitoring
- **Concurrent Requests**: Multi-user scenario testing
- **File Upload**: Large file handling and timeouts
- **Database Operations**: Query performance under load

## 🎯 MVP Validation

The test suite validates all core MVP requirements:

✅ **User Authentication & Management**
✅ **Creator Role & Comic Upload**
✅ **Crypto Payments via Helio**
✅ **File Storage (AWS S3 + IPFS)**
✅ **Comic Discovery & Consumption**
✅ **NWT Token Economy**
✅ **Web3 Integration Readiness**

## 🚨 Common Issues & Troubleshooting

### Services Not Responding
```bash
# Check if all services are running
docker-compose ps

# Restart specific service
docker-compose restart auth-service

# Check service logs
docker-compose logs wallet-service
```

### Database Connection Issues
```bash
# Verify database is accessible
psql $DATABASE_URL -c "SELECT 1;"

# Check service environment variables
docker-compose exec auth-service env | grep DATABASE
```

### File Upload Failures
- Ensure AWS credentials are configured
- Check S3 bucket permissions
- Verify Pinata API keys are valid
- Check file size limits and types

### Helio Payment Issues
- Verify Helio API keys in wallet service
- Check webhook URL configuration
- Ensure receiver wallet is properly set

## 📝 Test Reports

Tests generate detailed reports including:
- ✅ Pass/fail status for each scenario
- 🕐 Response times for critical operations
- 🔍 Error details and stack traces
- 📊 Coverage reports for code paths tested

## 🔄 Continuous Integration

These tests are designed to run in CI/CD pipelines:
- Docker-based service startup
- Automated test execution
- Coverage reporting
- Integration with deployment workflows

## 🤝 Contributing

When adding new features:
1. Add corresponding test cases
2. Follow existing test structure
3. Include both happy path and error scenarios
4. Test cross-service integration points
5. Update this README with new test coverage

---

**Built for Nerdwork+ MVP validation** 🚀
*Ensuring quality and reliability across all microservices*