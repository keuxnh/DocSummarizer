import {
  users,
  summaries,
  type User,
  type UpsertUser,
  type Summary,
  type InsertSummary,
} from "./schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Summary operations
  createSummary(summary: InsertSummary): Promise<Summary>;
  getUserSummaries(userId: string): Promise<Summary[]>;
  getSummary(id: number, userId: string): Promise<Summary | undefined>;
  deleteSummary(id: number, userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Summary operations
  async createSummary(summary: InsertSummary): Promise<Summary> {
    const [newSummary] = await db
      .insert(summaries)
      .values(summary)
      .returning();
    return newSummary;
  }

  async getUserSummaries(userId: string): Promise<Summary[]> {
    return await db
      .select()
      .from(summaries)
      .where(eq(summaries.userId, userId))
      .orderBy(desc(summaries.createdAt));
  }

  async getSummary(id: number, userId: string): Promise<Summary | undefined> {
    const [summary] = await db
      .select()
      .from(summaries)
      .where(and(eq(summaries.id, id), eq(summaries.userId, userId)));
    return summary;
  }

  async deleteSummary(id: number, userId: string): Promise<void> {
    await db
      .delete(summaries)
      .where(and(eq(summaries.id, id), eq(summaries.userId, userId)));
  }
}

export const storage = new DatabaseStorage();
