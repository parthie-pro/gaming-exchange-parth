import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tradesTable = pgTable('trades', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  gameId: uuid('game_id').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export type InsertTrade = typeof tradesTable.$inferInsert;
export type SelectTrade = typeof tradesTable.$inferSelect; 