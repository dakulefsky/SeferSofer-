import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, double, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "GM", "Employee"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull().references(() => clients.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "completed", "archived"]).default("pending").notNull(),
  scheduleCronTaskUid: varchar("scheduleCronTaskUid", { length: 65 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  pageOrder: int("pageOrder").notNull(),
  imageUrl: text("imageUrl").notNull(),
  accuracyScore: double("accuracyScore").default(0.0).notNull(),
  status: mysqlEnum("status", ["pending_review", "approved"]).default("pending_review").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const wordTokens = mysqlTable("wordTokens", {
  id: int("id").autoincrement().primaryKey(),
  pageId: int("pageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  originalText: text("originalText").notNull(),
  confidence: double("confidence").notNull(),
  isScribble: boolean("isScribble").default(false).notNull(),
  boxX: int("boxX").notNull(),
  boxY: int("boxY").notNull(),
  boxWidth: int("boxWidth").notNull(),
  boxHeight: int("boxHeight").notNull(),
  tokenOrder: int("tokenOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
