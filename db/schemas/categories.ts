import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  nameFa: text('name_fa').notNull(),
  nameEn: text('name_en').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
