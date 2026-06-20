import { pgTable, serial, text, integer, boolean, json, timestamp } from 'drizzle-orm/pg-core'
import { categories } from './categories'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  nameFa: text('name_fa').notNull(),
  nameEn: text('name_en').notNull(),
  price: integer('price').notNull(), // in USD cents
  descriptionFa: text('description_fa').notNull().default(''),
  descriptionEn: text('description_en').notNull().default(''),
  categoryId: integer('category_id').references(() => categories.id),
  inStock: boolean('in_stock').notNull().default(true),
  dimensions: text('dimensions'),
  weight: text('weight'),
  imageUrls: json('image_urls').$type<string[]>().notNull().default([]),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
