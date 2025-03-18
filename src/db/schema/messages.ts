import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const messagesTable = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  tradeId: uuid('trade_id').notNull(),
  senderId: text('sender_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect; 