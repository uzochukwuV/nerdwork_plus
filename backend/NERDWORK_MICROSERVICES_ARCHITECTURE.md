# Nerdwork+ Microservices Architecture
*Comic Reading Platform with Web3 Integration*

## 🎯 Platform Overview

**Nerdwork+** is a digital comic reading platform with native NWT token system, designed to scale from 0 to 10,000+ users using AWS microservices architecture.

### Core Business Functions:
- **Comic Reading & Discovery**
- **NWT Token System** (Native Web3 Token)
- **User Profiles & Authentication** 
- **Wallet & Payments**
- **Event Management & Tickets**

## 🏗️ Microservices Architecture

```
                    ┌─────────────────────────────────────┐
                    │            API Gateway              │
                    │         (Port 3000)                 │
                    │    Request Routing & Auth           │
                    └─────────────┬───────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│ Auth Service│           │ User Service│           │Comic Service│
│  (Port 3001)│           │ (Port 3002) │           │ (Port 3003) │
│             │           │             │           │             │
│ - Signup    │           │ - Profiles  │           │ - Discovery │
│ - Login     │           │ - Settings  │           │ - Reading   │
│ - JWT       │           │ - History   │           │ - Progress  │
└─────────────┘           └─────────────┘           └─────────────┘

        │                         │                         │
        ▼                         ▼                         ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│Wallet Service│          │Event Service│           │Ledger Service│
│ (Port 3004) │           │ (Port 3005) │           │ (Port 3006) │
│             │           │             │           │             │
│ - NWT Tokens│           │ - Events    │           │ - Accounting│
│ - Purchases │           │ - Tickets   │           │ - Audit     │
│ - Balance   │           │ - Booking   │           │ - Integrity │
└─────────────┘           └─────────────┘           └─────────────┘
```

## 📋 Service Breakdown

### 1. **API Gateway** (Port 3000)
- **Technology**: Express.js + http-proxy-middleware
- **Purpose**: Single entry point for all client requests
- **Responsibilities**:
  - Route requests to microservices
  - JWT authentication validation
  - Rate limiting & CORS
  - Request/response logging

### 2. **Auth Service** (Port 3001) ✅ *Implemented*
- **Purpose**: User authentication & authorization
- **Endpoints**:
  - `POST /auth/signup` - User registration
  - `POST /auth/login` - Authentication
  - `GET /auth/me` - Current user info
  - `POST /auth/refresh` - Token refresh
- **Database**: `auth_users`, `auth_sessions`, `password_resets`

### 3. **User Service** (Port 3002) ✅ *Implemented*
- **Purpose**: User profile & preferences management
- **Endpoints**:
  - `GET /users/me` - Get user profile
  - `PUT /users/me` - Update profile
  - `GET /users/:id/reading-history` - Reading history
- **Database**: `user_profiles`

### 4. **Comic Service** (Port 3003) 📝 *TODO*
- **Purpose**: Comic catalog, reading, and progress tracking
- **Endpoints**:
  - `GET /comics` - Comic discovery/search
  - `GET /comics/:id` - Comic details
  - `GET /comics/:id/pages` - Comic pages
  - `POST /comics/:id/progress` - Update reading progress
- **Database**: `comics`, `comic_pages`, `reading_progress`

### 5. **Event Service** (Port 3005) 📝 *TODO*
- **Purpose**: Events, conventions, and ticket management
- **Endpoints**:
  - `GET /events` - List events
  - `GET /events/:id` - Event details
  - `POST /events/:id/tickets` - Book tickets
- **Database**: `events`, `tickets`, `bookings`

### 6. **Wallet Service** (Port 3004) 📝 *TODO*
- **Purpose**: NWT token management & payments
- **Endpoints**:
  - `GET /wallet/balance` - Get NWT balance
  - `POST /wallet/purchase` - Buy NWT tokens
  - `POST /wallet/spend` - Spend NWT tokens
- **Database**: `wallets`, `transactions`

### 7. **Ledger Service** (Port 3006) 📝 *TODO*
- **Purpose**: Financial integrity & double-entry bookkeeping
- **Endpoints**:
  - `POST /ledger/transaction` - Record transaction
  - `GET /ledger/audit` - Audit trail
  - `GET /ledger/balance` - Account balances
- **Database**: `ledger_entries`, `accounts`

## 💾 Database Design

### **Shared PostgreSQL Database**
Services share database but own specific tables:

```sql
-- Auth Service Tables
auth_users (id, email, username, password_hash, created_at)
auth_sessions (id, user_id, token, expires_at)
password_resets (id, user_id, token, used, expires_at)

-- User Service Tables  
user_profiles (id, auth_user_id, display_name, bio, preferences, created_at)

-- Comic Service Tables
comics (id, title, author, description, cover_url, created_at)
comic_pages (id, comic_id, page_number, image_url)
reading_progress (id, user_id, comic_id, current_page, completed_at)

-- Event Service Tables
events (id, title, description, date, location, ticket_price)
tickets (id, event_id, ticket_type, price, available_count)
bookings (id, user_id, event_id, ticket_id, booking_date)

-- Wallet Service Tables
wallets (id, user_id, nwt_balance, created_at, updated_at)
transactions (id, user_id, type, amount, description, created_at)

-- Ledger Service Tables (Double-Entry Bookkeeping)
accounts (id, name, type, balance, created_at)
ledger_entries (id, transaction_id, account_id, debit_amount, credit_amount, description)
```

## 🚀 Development Workflow

### **Local Development Setup**
```bash
# Option 1: Docker Compose (Recommended)
cd backend
docker-compose up --build

# Option 2: Individual Services
# Terminal 1: API Gateway
cd api-gateway && npm install && npm start

# Terminal 2: Auth Service
cd services/auth-service && npm install && npm start

# Terminal 3: User Service  
cd services/user-service && npm install && npm start
```

### **Environment Configuration**
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/nerdwork_db

# JWT & Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Service Discovery
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
COMIC_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
EVENT_SERVICE_URL=http://localhost:3005
LEDGER_SERVICE_URL=http://localhost:3006

# AWS (Production)
AWS_REGION=us-east-1
S3_BUCKET_NAME=nerdwork-assets
```

## 🔐 Security & Compliance

### **Authentication Flow**
1. User logs in via Auth Service
2. JWT token issued with user claims
3. API Gateway validates JWT on each request  
4. Services trust authenticated requests from gateway

### **NWT Token Security**
- Double-entry ledger ensures financial integrity
- All transactions logged in audit trail
- Debit = Credit validation on every transaction
- Immutable transaction history

## 📈 Scalability Plan

### **0-1K Users** (Current)
- Single RDS instance
- Lambda functions for services
- Basic monitoring

### **1K-10K Users**
- RDS read replicas  
- ECS Fargate containers
- CloudWatch monitoring & alarms
- Auto-scaling policies

### **10K+ Users**
- Multi-AZ RDS deployment
- ElastiCache for session storage
- CDN for comic content
- Advanced analytics (Redshift)

## 🛠️ Implementation Status

### ✅ **Completed**
- [x] API Gateway with request routing
- [x] Auth Service (signup, login, JWT)
- [x] User Service (profiles, preferences)
- [x] Docker Compose setup
- [x] AWS deployment configuration
- [x] Documentation & README

### 📝 **TODO** (Next Phase)
- [ ] Comic Service (catalog, reading, progress)
- [ ] Wallet Service (NWT tokens, payments)
- [ ] Event Service (events, tickets, booking) 
- [ ] Ledger Service (double-entry bookkeeping)
- [ ] Integration testing
- [ ] Production deployment

## 🎯 Business Value

### **Microservices Benefits for Nerdwork+**
1. **Independent Scaling** - Scale comic reading vs token purchases separately
2. **Team Autonomy** - Different teams can own Auth, Comics, Wallet services
3. **Technology Flexibility** - Use optimal tech stack per service
4. **Fault Isolation** - Comic service issues won't affect payments
5. **Deployment Speed** - Deploy new comic features without touching wallet code

### **NWT Token Integration** 
- Seamless token purchases through Wallet Service
- Spending tokens on premium comics via Comic Service  
- Event tickets purchased with NWT tokens
- Complete audit trail through Ledger Service

## 📞 Next Steps

1. **Test Current Setup** - Verify Auth & User services work end-to-end
2. **Implement Comic Service** - Core platform functionality
3. **Add Wallet Service** - NWT token management
4. **Deploy to AWS** - Production environment
5. **Load Testing** - Validate 10K user capacity

This microservices architecture positions Nerdwork+ for rapid growth while maintaining the financial integrity required for a token-based comic platform.