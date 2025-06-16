# Nerdwork+ Platform Documentation

> *Comprehensive technical and product guide for engineers contributing to the Nerdwork+ ecosystem (0-10 k user scale).*

---

## Table of Contents
1. [Introduction](#1-introduction)
2. [Product Overview](#2-product-overview)
3. [Technology Stack](#3-technology-stack)
4. [Platform Architecture](#4-platform-architecture)
5. [Nerdwork Token (NWT) Economy](#5-nerdwork-token-nwt-economy)
6. [Microservices Breakdown](#6-microservices-breakdown)
7. [Security & Governance](#7-security--governance)
8. [DevOps & Deployment](#8-devops--deployment)
9. [Contributor Guide](#9-contributor-guide)
10. [Branch Naming Convention](#10-branch-naming-convention)
11. [Pull Request Template](#11-pull-request-template)
12. [Glossary](#12-glossary)

---

## 1. Introduction
Nerdwork+ is a **comic-first community SaaS platform** enriched with Web 3 features (crypto payments, NFTs) and a closed-loop in-app currency called **Nerdwork Token (NWT)**. It is engineered as a **cloud-native microservices system** able to serve ~10 k concurrent users cost-effectively while maintaining a clear path to further scale.

This document unifies the previously separate PDFs—*Product Overview*, *Platform Architecture*, and *Integrating NWT*—into one living reference for developers. Additions and pull requests are welcome via GitHub.

---

## 2. Product Overview
### 2.1 Vision & Value
* **Engaging creator economy** – readers discover comics, tip creators, and unlock premium arcs.
* **Gamified learning & community** – loyalty quests, badges, and XP keep users returning.
* **Web 3–powered ownership** – collectible NFT drops and on-chain proof of fandom.

### 2.2 Key Functional Pillars
| Pillar | Description |
|--------|-------------|
| **Content** | Upload, curate, and read comics (pages served from S3 + CloudFront). |
| **Community** | Comments, follows, notifications, and messaging. |
| **Monetization** | NWT purchases (fiat/crypto via Helio), in-app spends, tipping, creator payouts. |
| **Rewards** | Automated NWT grants through Loyalty microservice (Verxio). |
| **Collectibles** | NFT minting & gating via Magicblock + IPFS (Pinata). |

---

## 3. Technology Stack
### 3.1 Languages & Frameworks
* **Frontend:** React (Next 13), TypeScript, Tailwind CSS
* **Backend:** Node.js (18 LTS), Express/Fastify for lightweight services
* **Smart-Contract / Web3:** Solidity (EVM), Rust (Solana) – abstracted by Helio & Magicblock SDKs
### 3.2 Cloud & Data
| Layer | Choice | Reason |
|-------|--------|--------|
| **Compute** | AWS ECS Fargate & Lambda | Container + serverless mix for cost/scale. |
| **API Edge** | Amazon API Gateway | Unified entry, auth, throttling. |
| **Databases** | Aurora (Postgres) • DynamoDB • QLDB (ledger) | Relational, key-value, and immutable ledger patterns. |
| **Object Storage** | Amazon S3 | Durable comic images & NFT media. |
| **CDN** | CloudFront + AWS Shield | Global latency + DDoS mitigation. |
| **Cache** | ElastiCache (Redis) | Optional hot data layer. |
| **Queue / Bus** | Amazon SQS + EventBridge | Async events, decoupling. |
| **Email** | AWS SES | Transactional & marketing mail. |

Third-party SaaS: **Helio** (crypto/fiat on-ramp), **Verxio** (loyalty XP), **Pinata** (IPFS), **Magicblock** (NFT mint).

---

## 4. Platform Architecture <a id="4-platform-architecture"></a>
### 4.1 High-Level Diagram
```
User→CloudFront→API Gateway→┬─Auth Svc
                           ├─User Svc
                           ├─Comic Svc
                           ├─Wallet Svc
                           ├─Payment Svc→Helio
                           ├─Loyalty Svc→Verxio
                           ├─NFT Svc→Magicblock
                           ├─Notification Svc→SES
                           └─Analytics Svc
                ↘ EventBridge bus + SQS queues for async workflows
```
All services are **stateless**; each owns its data store. Internal calls prefer **events over REST** to minimise coupling.

### 4.2 Scaling Targets
* **0–10 k active users** → 1× r5.large Aurora, on-demand DynamoDB, capping Fargate tasks at min = 1, max = 3 per service.
* Above this tier, migrate heavy read traffic to **read replicas** and introduce **gRPC** internal mesh.

---

## 5. Nerdwork Token (NWT) Economy
### 5.1 Token Properties
* Closed-loop, **non-withdrawable** in-app currency (avoids money-transmitter laws).
* Fixed-point accounting (1 NWT = 100 cents).

### 5.2 Ledger & Wallet Service
* **Double-entry ledger** stored in QLDB (immutable) with DynamoDB shadow table for fast history queries.
* APIs: `POST /wallet/credit`, `POST /wallet/debit`, `POST /wallet/transfer`.
* Idempotency via `X-Idempotency-Key` header.

### 5.3 Token Lifecycle
| Stage | Service | Flow |
|-------|---------|------|
| **Mint** | Payment Svc ↔ Helio | Fiat/crypto purchase Webhook → Wallet.credit. |
| **Earn** | Loyalty Svc | Event (UserDidX) → reward → Wallet.credit. |
| **Spend** | Comic/NFT/Tip flows via Payment Svc | Wallet.debit (buyer) & Wallet.credit (creator/platform). |
| **Sink** | Platform fees or burn account | Configurable governance lever. |

### 5.4 Anti-Fraud & Governance
* Rate-limit purchases, monitor large transfers.
* Admin dashboard to freeze wallets, adjust supply.
* Clear **Terms & Conditions**: “NWT is a limited license, not legal tender.”

---

## 6. Microservices Breakdown
| # | Service | Repo Path | Key Tech | Core Responsibilities |
|---|---------|----------|---------|------------------------|
| 1 | **Auth** | `services/auth` | Node.js + Cognito | JWT issuance, MFA, password reset. |
| 2 | **User** | `services/user` | Node.js + Postgres | Profile CRUD, avatars. |
| 3 | **Comic** | `services/comic` | Node.js + Aurora + S3 | Publish/read comics, reading progress. |
| 4 | **Wallet** | `services/wallet` | Node.js + QLDB | NWT ledger, balance APIs. |
| 5 | **Payment** | `services/payment` | Node.js + Helio SDK | Fiat/crypto on-ramp, in-app charges. |
| 6 | **Loyalty** | `services/loyalty` | Node.js + Verxio | XP rules, NWT rewards. |
| 7 | **NFT** | `services/nft` | Node.js + Magicblock | Mint/gate NFTs, IPFS pinning. |
| 8 | **Notification** | `services/notification` | Node.js + SES | Email & in-app pushes. |
| 9 | **Analytics** | `services/analytics` | Lambda + DynamoDB | Event ingestion, dashboards. |

Each service contains a `README.md` with API contract, local dev, and deployment commands.

---

## 7. Security & Governance
* **OWASP-grade WAF** rules on API Gateway.
* **GuardDuty & CloudTrail** centralised alerts.
* **Secrets** stored in AWS Secrets Manager; rotated via GitHub Actions.
* **GDPR-ready**: personal data isolation, right-to-erase API.

---

## 8. DevOps & Deployment
### 8.1 CI/CD Flow
1. **PR opened** → Lint + unit tests via GitHub Actions.
2. **Merge to `main`** → Build container images, push to ECR.
3. **Tag release** (`vX.Y.Z`) → Deploy via AWS CDK pipeline to staging, then prod after manual approval.

### 8.2 Infrastructure as Code
* **AWS CDK (TypeScript)** modules per microservice (`infra/*`).
* Shared constructs: VPC, ALB, API Gateway, EventBridge, WAF.

### 8.3 Observability
* **CloudWatch Logs & Metrics** standardised via `pino` logger.
* **X-Ray Tracing** enabled across gateway & Lambdas.
* **Grafana** dashboard (managed) aggregating service KPIs.

---

## 9. Contributor Guide
* Fork & clone ➜ `pnpm i` ➜ `pnpm dev` (root runs turbo-pack for all services).
* Follow **Conventional Commits**; semantic-release auto-bumps versions.
* Branch naming: `feat/`, `fix/`, `docs/`; PR template enforces description & checklist.
* Code style: ESLint + Prettier; commit hooks powered by **Husky**.

---

## 10. Branch Naming Convention
To ensure consistency and clarity in version control, use the following branch naming patterns:

| Branch Type    | Prefix    | Example                     |
| ------- | --------- | --------------------------- |
| Feature | `feat/`   | `feat/login-api`            |
| Bugfix  | `fix/`    | `fix/signup-validation`     |
| Hotfix  | `hotfix/` | `hotfix/critical-login-bug` |
| Chore   | `chore/`  | `chore/update-dependencies` |
| Docs    | `docs/`   | `docs/readme-formatting`    |
| Test    | `test/`   | `test/user-service-cases`   |

---
## 11. Pull Request Template

To ensure professional and consistent contributions across the Nerdwork+ Platform, all contributors should use the following pull request format:

```md
# 📝 Description
<!--- Provide a clear and concise description of your pull request -->
This PR adds/updates ...

# 📌 Changes Proposed

## 🔍 What were you told to do?
<!-- Describe the task, requirement, or feature you were assigned -->

## 🛠 What did you do?
<!-- Describe your actual implementation, files changed, services affected -->

# 🔄 Types of changes
<!--- Put an `x` in the relevant boxes to indicate your changes -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (would cause existing features to break)
- [ ] Chore (project maintenance, CI/CD, docs, etc.)

# ✅ Check List
<!-- Go over all the following points and mark those that apply -->

- [x] My changes follow the code style and standards of this project.
- [x] My changes do not include plagiarized content.
- [x] The PR title and description clearly explain the purpose and scope.
- [x] I am making a pull request against the **dev branch** (not `main`).
- [x] My commit message follows semantic commit conventions (e.g. `docs:`, `feat:`).
- [x] My code additions pass linting (`pnpm lint`) and unit tests.
- [x] I am only modifying the files assigned to me.

---

# 📷 Screenshots (if applicable)
<!-- Add screenshots of the affected components, UI views, or test logs -->

- Live preview / working component:
- Linting check:
```

---

## 12. Glossary
| Term | Definition |
|------|-----------|
| **NWT** | Nerdwork Token – closed-loop virtual currency. |
| **Helio** | Crypto/fiat on-ramp and payment gateway. |
| **Magicblock** | High-speed Web3 SDK for minting NFTs. |
| **QLDB** | AWS Quantum Ledger Database – immutable transaction log. |
| **Verxio** | Loyalty XP SaaS used for gamification.

---

### References
* Nerdwork Product Overview (2025) – internal PDF.
* Integrating NWT Currency – internal PDF.
* Nerdwork Platform Architecture (0–10 k Users) – internal PDF.

> **Last updated:** 16 June 2025 (commit `docs/initial-unified`) – Maintainers: *@team-platform-engineering*.
