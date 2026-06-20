import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull().default(''),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Setting = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert
