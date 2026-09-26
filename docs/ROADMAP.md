# Wakala Platform — Build Roadmap

## Phase 0 — Foundation
- [x] Repository scaffold and TypeScript API
- [x] Neon-compatible Prisma schema foundation
- [x] Health endpoint and deployment scripts
- [ ] Install dependencies and run first CI/build verification
- [ ] Configure Neon database and Render service

## Phase 1 — Identity and access
- Secure password hashing and server-side sessions
- Customer onboarding and profile
- Admin/operations roles and audit trail
- Login protections, rate limits, password reset

## Phase 2 — Wallet and ledger
- Currency configuration and wallet provisioning
- Double-entry ledger posting service
- Balance projection and transaction history
- Ledger invariant and concurrency tests

## Phase 3 — Transfers
- Beneficiaries and transfer quote/confirmation
- Idempotent transfer orchestration and state machine
- Provider adapter contract and sandbox integration
- Webhook inbox, signature verification, retry handling

## Phase 4 — Cross-border operations
- FX quote records, fees, limits, corridor configuration
- Settlement/reconciliation jobs and exception queue
- Operational dashboard and customer notifications

## Phase 5 — Client applications
- Responsive customer dashboard
- Transfers, activity, wallet management
- Admin console and customer support tools
- Accessibility, mobile QA, security review

## Production gates
No live funds until legal/compliance review, licensed provider agreements, KYC/AML controls, security testing, reconciliation procedures, incident response, and operational ownership are complete.
