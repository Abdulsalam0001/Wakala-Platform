import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1).optional(),
}).parse(process.env);

const prisma = env.DATABASE_URL ? new PrismaClient() : null;
const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Liveness: confirms the Node process is responding.
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "wakala-platform-api",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Readiness: confirms database connectivity when DATABASE_URL is configured.
app.get("/health/ready", async (_req, res) => {
  if (!prisma) {
    res.status(503).json({ ok: false, database: "not_configured" });
    return;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, database: "connected" });
  } catch {
    res.status(503).json({ ok: false, database: "unavailable" });
  }
});

app.get("/", (_req, res) => {
  res.json({
    name: "Wakala Platform API",
    status: "prototype",
    health: "/health",
    readiness: "/health/ready",
  });
});

app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

const server = app.listen(env.PORT, () => {
  console.log(`Wakala Platform API listening on port ${env.PORT}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma?.$disconnect();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
