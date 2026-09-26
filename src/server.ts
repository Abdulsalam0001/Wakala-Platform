import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { z } from "zod";

const env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1).optional(),
}).parse(process.env);

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "wakala-platform-api", environment: env.NODE_ENV, timestamp: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.json({ name: "Wakala Platform API", status: "prototype", documentation: "See repository README and docs." });
});

app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

app.listen(env.PORT, () => console.log(`Wakala Platform API listening on port ${env.PORT}`));
