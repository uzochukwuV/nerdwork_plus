# Nerdwork+ Microservices Architecture

## Overview

This project has been transformed from a monolithic Express.js application into a microservices architecture. The system now consists of individual services that can be deployed, scaled, and maintained independently.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                             │
│                     (Port 3000)                                │
└─────────────┬───────────────────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌─────────┐ ┌─────┐ ┌─────────┐
│  Auth   │ │User │ │ Event   │
│Service  │ │Svc  │ │ Service │
│(3001)   │ │(3002)│ │ (3003) │
└─────────┘ └─────┘ └─────────┘

   ┌─────────┐ ┌─────────┐
   │ Wallet  │ │ Ticket  │
   │ Service │ │ Service │
   │ (3004)  │ │ (3005)  │
   └─────────┘ └─────────┘
```

## Services

### 1. API Gateway (Port 3000)
- **Purpose**: Request routing and load balancing
- **Technology**: Express.js + http-proxy-middleware
- **Responsibilities**:
  - Route requests to appropriate microservices
  - Handle CORS and security headers
  - Aggregate responses (future enhancement)
  - Rate limiting (future enhancement)

### 2. Auth Service (Port 3001)
- **Purpose**: Authentication and authorization
- **Endpoints**:
  - `POST /auth/signup` - User registration
  - `POST /auth/login` - User authentication  
  - `GET /auth/me` - Get current user info
- **Database Tables**: `auth_users`, `auth_sessions`, `password_resets`

### 3. User Service (Port 3002)
- **Purpose**: User profile management
- **Endpoints**:
  - `GET /users/me` - Get user profile
  - `PUT /users/me` - Update user profile
  - `POST /users/profile` - Create user profile
- **Database Tables**: `user_profiles`

### 4. Event Service (Port 3003) [TODO]
- **Purpose**: Event management and discovery
- **Endpoints**: TBD
- **Database Tables**: TBD

### 5. Wallet Service (Port 3004) [TODO]
- **Purpose**: Payment processing and wallet management
- **Endpoints**: TBD
- **Database Tables**: TBD

### 6. Ticket Service (Port 3005) [TODO]
- **Purpose**: Ticket booking and management
- **Endpoints**: TBD
- **Database Tables**: TBD

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL database

### Environment Variables
Create a `.env` file in the backend root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/nerdwork_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Local Development

#### Option 1: Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Start specific service
docker-compose up auth-service user-service api-gateway
```

#### Option 2: Individual Services
```bash
# Terminal 1: API Gateway
cd api-gateway
npm install
npm start

# Terminal 2: Auth Service
cd services/auth-service
npm install
npm start

# Terminal 3: User Service
cd services/user-service
npm install  
npm start
```

### Testing the Services

#### Health Checks
```bash
# API Gateway
curl http://localhost:3000/health

# Auth Service
curl http://localhost:3001/health

# User Service  
curl http://localhost:3002/health
```

#### API Testing
```bash
# Register a user
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "password": "password123"
  }'

# Get user profile (requires JWT token)
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Deployment

### AWS Lambda (Serverless)
Each service can be deployed independently using Serverless Framework:

```bash
# Deploy Auth Service
cd services/auth-service
npm run deploy

# Deploy User Service
cd services/user-service
npm run deploy

# Deploy API Gateway
cd api-gateway
npm run deploy
```

### AWS ECS (Containerized)
1. Deploy the AWS infrastructure:
```bash
aws cloudformation deploy \
  --template-file deployment/aws-infrastructure.yml \
  --stack-name nerdwork-infrastructure \
  --parameter-overrides \
    Environment=dev \
    DatabasePassword=YOUR_DB_PASSWORD \
    JWTSecret=YOUR_JWT_SECRET \
  --capabilities CAPABILITY_IAM
```

2. Build and push Docker images to ECR
3. Deploy ECS services using the infrastructure

## Database Schema

### Shared Tables
All services share the same database but access different tables:

- **Auth Service**: `auth_users`, `auth_sessions`, `password_resets`
- **User Service**: `user_profiles` (references `auth_users`)
- **Event Service**: `events`, `event_categories` (TBD)
- **Wallet Service**: `wallets`, `transactions` (TBD)  
- **Ticket Service**: `tickets`, `bookings` (TBD)

## Development Guidelines

### Adding a New Service
1. Create service directory: `services/new-service/`
2. Copy structure from existing service
3. Update `docker-compose.yml`
4. Add route to API Gateway
5. Update this README

### Service Communication
- **Synchronous**: HTTP calls via API Gateway
- **Asynchronous**: Message queues (future enhancement)
- **Data Consistency**: Shared database with service-specific tables

### Security
- JWT tokens for authentication
- Service-to-service communication secured
- Database access per service basis
- Environment variables for secrets

## Migration from Monolith

### Completed ✅
- [x] Auth Service extraction
- [x] User Service extraction  
- [x] API Gateway setup
- [x] Docker configuration
- [x] AWS deployment configuration

### TODO 📝
- [ ] Event Service extraction
- [ ] Wallet Service extraction
- [ ] Ticket Service extraction
- [ ] Database per service (optional)
- [ ] Message queue implementation
- [ ] Service discovery
- [ ] Distributed tracing
- [ ] Circuit breakers

## Monitoring and Logging

### Local Development
- Console logs in each service
- Health check endpoints
- Docker logs: `docker-compose logs [service-name]`

### Production
- CloudWatch logs (AWS Lambda)
- ECS logs (Containerized deployment)
- Application Performance Monitoring (future)

## API Documentation

### Postman Collection
Import the Postman collection from `docs/nerdwork-microservices.postman_collection.json`

### Swagger Documentation
Each service exposes Swagger docs at `/api-docs` endpoint (future enhancement)

## Troubleshooting

### Common Issues
1. **Service Discovery**: Ensure all services are running and accessible
2. **Database Connections**: Verify DATABASE_URL is correct for all services
3. **JWT Issues**: Ensure JWT_SECRET is consistent across services
4. **Port Conflicts**: Check no other services are using ports 3000-3005

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm start
```

## Contributing

1. Follow existing code structure
2. Add tests for new features
3. Update documentation
4. Ensure all services pass health checks
5. Test service integration

## Support

For questions about the microservices architecture:
- Review this documentation
- Check service logs for errors
- Verify environment configuration
- Test individual services before integration