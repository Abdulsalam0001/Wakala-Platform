import "dotenv/config";
import crypto from "node:crypto";
import path from "node:path";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1).optional(),
  SESSION_SECRET: z.string().min(32).default("development-only-change-this-session-secret-123456"),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(12).optional(),
  ADMIN_NAME: z.string().min(2).default("Wakala Administrator"),
}).parse(process.env);

const prisma = env.DATABASE_URL ? new PrismaClient() : null;
const app = express();
const SESSION_COOKIE = "wakala_session";
const SESSION_DAYS = 7;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${derived.toString("hex")}`;
}
function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, key] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !key) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(key, "hex");
  return expected.length === derived.length && crypto.timingSafeEqual(expected, derived);
}
function tokenHash(token: string) { return crypto.createHash("sha256").update(`${env.SESSION_SECRET}:${token}`).digest("hex"); }
function setSessionCookie(res: Response, token: string) {
  const secure = env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure}`);
}
function clearSessionCookie(res: Response) { res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`); }
function readCookie(req: Request, name: string) {
  const raw = req.headers.cookie ?? "";
  return raw.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;
}
async function createSession(userId: string, res: Response) {
  if (!prisma) throw new Error("Database is not configured");
  const token = crypto.randomBytes(32).toString("base64url");
  await prisma.session.create({ data: { tokenHash: tokenHash(token), userId, expiresAt: new Date(Date.now() + SESSION_DAYS * 86400000) } });
  setSessionCookie(res, token);
}
async function currentUser(req: Request) {
  if (!prisma) return null;
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { tokenHash: tokenHash(token) }, include: { user: true } });
  if (!session || session.revokedAt || session.expiresAt <= new Date() || session.user.status !== UserStatus.ACTIVE) return null;
  return session.user;
}
function requireUser(req: Request, res: Response, next: NextFunction) {
  currentUser(req).then(user => {
    if (!user) return res.status(401).json({ error: "Authentication required." });
    res.locals.user = user; next();
  }).catch(() => res.status(500).json({ error: "Authentication check failed." }));
}
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  currentUser(req).then(user => {
    if (!user) return res.status(401).json({ error: "Authentication required." });
    if (user.role !== UserRole.ADMIN) return res.status(403).json({ error: "Administrator access required." });
    res.locals.user = user; next();
  }).catch(() => res.status(500).json({ error: "Authentication check failed." }));
}
async function bootstrapAdmin() {
  if (!prisma || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return;
  const email = env.ADMIN_EMAIL.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.role !== UserRole.ADMIN || existing.status === UserStatus.CLOSED) await prisma.user.update({ where: { id: existing.id }, data: { role: UserRole.ADMIN, status: UserStatus.ACTIVE } });
    return;
  }
  await prisma.user.create({ data: { email, fullName: env.ADMIN_NAME, passwordHash: hashPassword(env.ADMIN_PASSWORD), role: UserRole.ADMIN, status: UserStatus.ACTIVE } });
  console.log(`Bootstrapped admin account: ${email}`);
}

app.get("/health", (_req, res) => res.json({ ok: true, service: "wakala-platform-api", environment: env.NODE_ENV, timestamp: new Date().toISOString() }));
app.get("/health/ready", async (_req, res) => {
  if (!prisma) return res.status(503).json({ ok: false, database: "not_configured" });
  try { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true, database: "connected" }); } catch { res.status(503).json({ ok: false, database: "unavailable" }); }
});
app.get("/api", (_req, res) => res.json({ name: "Wakala Platform API", status: "prototype", health: "/health", readiness: "/health/ready" }));

app.post("/api/auth/login", async (req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Enter a valid email and password." });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.trim().toLowerCase() } });
  if (!user || user.status !== UserStatus.ACTIVE || !verifyPassword(parsed.data.password, user.passwordHash)) return res.status(401).json({ error: "Invalid email or password." });
  await createSession(user.id, res);
  res.json({ user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
});
app.get("/api/auth/me", requireUser, (_req, res) => {
  const user = res.locals.user;
  res.json({ user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
});
app.post("/api/auth/logout", async (req, res) => {
  if (prisma) {
    const token = readCookie(req, SESSION_COOKIE);
    if (token) await prisma.session.updateMany({ where: { tokenHash: tokenHash(token), revokedAt: null }, data: { revokedAt: new Date() } });
  }
  clearSessionCookie(res); res.json({ ok: true });
});

app.get("/api/admin/overview", requireAdmin, async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const [totalUsers, activeUsers, adminCount, transferCounts, recentUsers] = await Promise.all([
    prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
    prisma.user.count({ where: { role: UserRole.CUSTOMER, status: UserStatus.ACTIVE } }),
    prisma.user.count({ where: { role: UserRole.ADMIN } }),
    prisma.transfer.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.user.findMany({ where: { role: UserRole.CUSTOMER }, orderBy: { createdAt: "desc" }, take: 8, select: { id: true, fullName: true, email: true, status: true, createdAt: true } })
  ]);
  res.json({ totalUsers, activeUsers, adminCount, transferCounts, recentUsers });
});
app.get("/api/admin/users", requireAdmin, async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const users = await prisma.user.findMany({ where: { role: UserRole.CUSTOMER }, orderBy: { createdAt: "desc" }, take: 100, select: { id: true, fullName: true, email: true, phone: true, status: true, createdAt: true, wallets: { select: { id: true, currency: true }, orderBy: { createdAt: "asc" } } } });
  res.json({ users });
});
app.post("/api/admin/users", requireAdmin, async (req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const parsed = z.object({ fullName: z.string().min(2).max(120), email: z.string().email(), password: z.string().min(12), phone: z.string().max(30).optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Full name, valid email and a 12+ character password are required." });
  const email = parsed.data.email.trim().toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) return res.status(409).json({ error: "A user with this email already exists." });
  const user = await prisma.user.create({ data: { fullName: parsed.data.fullName.trim(), email, phone: parsed.data.phone?.trim() || null, passwordHash: hashPassword(parsed.data.password), role: UserRole.CUSTOMER, status: UserStatus.ACTIVE } });
  await prisma.auditLog.create({ data: { actorId: res.locals.user.id, action: "admin.create_user", targetType: "User", targetId: user.id } });
  res.status(201).json({ user: { id: user.id, fullName: user.fullName, email: user.email, phone: user.phone, status: user.status } });
});
app.post("/api/admin/users/:id/status", requireAdmin, async (req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const parsed = z.enum(["ACTIVE", "SUSPENDED", "CLOSED"]).safeParse(req.body?.status);
  if (!parsed.success) return res.status(400).json({ error: "Invalid status." });
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { status: parsed.data } });
  await prisma.auditLog.create({ data: { actorId: res.locals.user.id, action: "admin.update_user_status", targetType: "User", targetId: user.id, metadata: { status: parsed.data } } });
  res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, status: user.status } });
});
app.get("/api/admin/transfers", requireAdmin, async (_req, res) => {
  if (!prisma) return res.status(503).json({ error: "Database is not configured." });
  const transfers = await prisma.transfer.findMany({ orderBy: { createdAt: "desc" }, take: 100, select: { id: true, userId: true, destinationWallet: true, amountMinor: true, currency: true, status: true, provider: true, providerReference: true, createdAt: true } });
  res.json({ transfers: transfers.map(t => ({ ...t, amountMinor: t.amountMinor.toString() })) });
});

const webDist = path.resolve(process.cwd(), "web", "dist");
app.use(express.static(webDist));
app.get("/", (_req, res) => res.sendFile(path.join(webDist, "index.html"), error => { if (error && !res.headersSent) res.status(404).json({ error: "Web application is not built." }); }));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) return next();
  res.sendFile(path.join(webDist, "index.html"), error => { if (error && !res.headersSent) next(error); });
});
app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

async function start() {
  if (prisma) { await prisma.$connect(); await bootstrapAdmin(); }
  const server = app.listen(env.PORT, () => console.log(`Wakala Platform API listening on port ${env.PORT}`));
  const shutdown = () => server.close(async () => { await prisma?.$disconnect(); process.exit(0); });
  process.on("SIGTERM", shutdown); process.on("SIGINT", shutdown);
}
start().catch(error => { console.error("Startup failed", error); process.exit(1); });
