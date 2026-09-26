# Local setup

## Requirements
- Node.js 20 or newer
- npm
- A PostgreSQL database (Neon is supported)

## Install
```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to your PostgreSQL connection string. For Neon, copy the pooled connection string from the Neon dashboard and retain its SSL parameters. Never commit `.env` or paste database credentials into issues or chat.

## Generate Prisma Client and apply the initial schema
```bash
npm run db:generate
npm run db:push
```

This prototype currently uses `prisma db push` for the first database setup. Before production, create and review versioned migrations, then deploy them with `prisma migrate deploy`.

## Run the API
```bash
npm run dev
```

- `GET /health` checks that the API process is running.
- `GET /health/ready` checks database connectivity and returns HTTP 503 when the database is not configured or unavailable.

The database connection is optional for local API liveness, but database-backed features will require it. Do not use real customer funds or personal data in this prototype.
