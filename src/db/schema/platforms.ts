import { pgEnum } from 'drizzle-orm/pg-core';

export const platformEnum = pgEnum('platform', ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile']); 