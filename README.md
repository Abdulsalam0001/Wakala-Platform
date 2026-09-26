# Wakala Platform

A multi-currency wallet and payments platform foundation.

> **Status:** Early prototype scaffold. No live money movement is enabled. Provider integrations require approved access, credentials, and compliance review.

## Stack
- Node.js + TypeScript + Express
- PostgreSQL (Neon-ready) + Prisma
- Zod environment validation
- Vitest for tests
- Render-ready build and start scripts

## Local setup
1. Install Node.js 20+ and PostgreSQL (or create a Neon database).
2. Copy .env.example to .env and set DATABASE_URL.
3. Run npm install
4. Run npm run db:generate
5. Run npm run db:push
6. Run npm run dev

Health endpoint: GET /health

See docs/ARCHITECTURE.md and docs/ROADMAP.md.

## Core safety principles
- Ledger entries are immutable records; balances are derived from ledger activity.
- Money-moving operations must be idempotent and transactionally consistent.
- Provider webhooks must be verified, deduplicated, and reconciled.
- Secrets belong in deployment environment variables, never source control.
- Sandbox only until licensing, partner access, and operational controls are in place.
