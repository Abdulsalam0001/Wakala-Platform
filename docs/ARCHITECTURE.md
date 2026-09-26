# Wakala Platform — Architecture

## Initial stack
TypeScript / Node.js / Express, PostgreSQL on Neon, Prisma ORM, Render deployment. The first iteration is an API foundation and schema, not a live financial service.

## Logical layers
1. Client apps: responsive customer web app and internal operations/admin console.
2. API edge: routing, validation, authentication, authorization, rate limiting, request IDs.
3. Domain services: identity, wallet, double-entry ledger, transfer orchestration, FX quotes, beneficiaries, notifications, reconciliation.
4. Persistence: PostgreSQL. Prisma provides typed access; financial writes use database transactions and explicit consistency rules.
5. Provider adapters: separate interfaces for each licensed bank/payment partner. Keep provider-specific formats out of core domain logic.
6. Operations: audit events, webhook inbox, reconciliation reports, alerting, support tooling.

## Financial integrity
- Store money in integer minor units, never floating point.
- Currency is explicit on every wallet and ledger record.
- Ledger postings are append-only; corrections use compensating entries.
- Transfers use explicit states and idempotency keys.
- Webhook events are authenticated, persisted, deduplicated, and processed asynchronously.
- Cross-currency transfers require a recorded quote, fee, rate, and expiry.
- A provider success response alone is not a reconciled ledger result.

## Deployment
Render runs npm install, npm run build, and npm start. Configure DATABASE_URL, SESSION_SECRET, NODE_ENV=production, and PORT in Render environment settings. Use Neon pooled connections for application traffic where appropriate. Never commit credentials.
