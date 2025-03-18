import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { gameConditionEnum } from '@/lib/validations/collection';

export const gamesTable = pgTable('games', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  externalId: text('external_id').notNull(),
  name: text('name').notNull(),
  platform: text('platform').notNull(),
  condition: text('condition').notNull().$type<typeof gameConditionEnum["_type"]>(),
  notes: text('notes'),
  forTrade: boolean('for_trade').default(false).notNull(),
  coverImageId: text('cover_image_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export type InsertGame = typeof gamesTable.$inferInsert;
export type SelectGame = typeof gamesTable.$inferSelect; 