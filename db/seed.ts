import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { categories } from './schemas/categories'
import { products } from './schemas/products'
import { settings } from './schemas/settings'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

async function seed() {
  console.log('Seeding database...')

  // Categories
  const cats = await db.insert(categories).values([
    { nameFa: 'ظروف چوبی', nameEn: 'Wooden Bowls & Vessels' },
    { nameFa: 'تزئینی', nameEn: 'Decorative Art' },
    { nameFa: 'صندوقچه', nameEn: 'Jewelry Boxes' },
  ]).returning()

  const [bowls, deco, boxes] = cats

  // Products
  await db.insert(products).values([
    {
      nameFa: 'کاسه گردو نورستانی',
      nameEn: 'Nuristani Walnut Bowl',
      price: 8500,
      descriptionFa: 'کاسه‌ای زیبا از چوب گردو خالص، تراشیده‌شده با دست توسط استادکاران نورستانی. دارای نقوش هندسی سنتی در لبه. هر قطعه منحصربه‌فرد است.',
      descriptionEn: 'A beautiful bowl hand-carved from pure walnut wood by Nuristani master craftsmen. Features traditional geometric patterns on the rim. Each piece is unique.',
      categoryId: bowls.id,
      inStock: true,
      dimensions: '۲۵ × ۲۵ × ۱۰ سانتی‌متر',
      weight: '۸۰۰ گرم',
      imageUrls: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
      featured: true,
    },
    {
      nameFa: 'ظرف سرو سدر',
      nameEn: 'Cedar Serving Platter',
      price: 12000,
      descriptionFa: 'سینی سرو بزرگ از چوب سدر معطر. بوی طبیعی سدر در هر وعده غذایی احساس می‌شود. مناسب برای سرو میوه، خشکبار و شیرینی.',
      descriptionEn: 'Large serving platter from aromatic cedar wood. The natural scent of cedar enhances every meal. Perfect for serving fruits, nuts and sweets.',
      categoryId: bowls.id,
      inStock: true,
      dimensions: '۴۵ × ۳۰ × ۳ سانتی‌متر',
      weight: '۶۰۰ گرم',
      imageUrls: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800'],
      featured: false,
    },
    {
      nameFa: 'پانل دیواری هندسی',
      nameEn: 'Geometric Wall Panel',
      price: 25000,
      descriptionFa: 'پانل دیواری با نقوش هندسی سنتی نورستانی. ترکیب چوب گردو و سدر با جزئیات بسیار ظریف. یک اثر هنری منحصربه‌فرد برای خانه‌های لوکس.',
      descriptionEn: 'Wall panel with traditional Nuristani geometric patterns. Combination of walnut and cedar with very fine details. A unique artwork for luxury homes.',
      categoryId: deco.id,
      inStock: true,
      dimensions: '۶۰ × ۴۰ × ۲ سانتی‌متر',
      weight: '۱.۲ کیلوگرم',
      imageUrls: ['https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800'],
      featured: true,
    },
    {
      nameFa: 'مجسمه اسب چوبی',
      nameEn: 'Carved Wooden Horse',
      price: 18000,
      descriptionFa: 'مجسمه اسب دست‌کنده‌کاری‌شده از چوب گردو. سمبل قدرت و آزادی در فرهنگ نورستانی. با جزئیات دقیق چشم، یال و سم.',
      descriptionEn: 'Hand-carved horse sculpture from walnut wood. Symbol of strength and freedom in Nuristani culture. With detailed eyes, mane and hooves.',
      categoryId: deco.id,
      inStock: false,
      dimensions: '۲۰ × ۸ × ۱۸ سانتی‌متر',
      weight: '۴۵۰ گرم',
      imageUrls: ['https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800'],
      featured: false,
    },
    {
      nameFa: 'صندوقچه جواهر گردو',
      nameEn: 'Walnut Jewelry Box',
      price: 15000,
      descriptionFa: 'صندوقچه جواهر از چوب گردو با قفل برنجی سنتی. داخل آن با پارچه مخمل پوشانده شده. نقوش کنده‌کاری شده در اطراف درب.',
      descriptionEn: 'Walnut jewelry box with traditional brass lock. Interior lined with velvet fabric. Hand-carved motifs around the lid.',
      categoryId: boxes.id,
      inStock: true,
      dimensions: '۲۵ × ۱۵ × ۱۰ سانتی‌متر',
      weight: '۷۰۰ گرم',
      imageUrls: ['https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800'],
      featured: true,
    },
    {
      nameFa: 'صندوقچه کوچک سدر',
      nameEn: 'Small Cedar Keepsake Box',
      price: 9500,
      descriptionFa: 'صندوقچه کوچک سدر برای نگهداری چیزهای ارزشمند. با قفل ساده چوبی و نقوش هندسی نورستانی در سطح.',
      descriptionEn: 'Small cedar box for keeping precious items. With simple wooden clasp and Nuristani geometric patterns on the surface.',
      categoryId: boxes.id,
      inStock: true,
      dimensions: '۱۵ × ۱۰ × ۷ سانتی‌متر',
      weight: '۳۵۰ گرم',
      imageUrls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800'],
      featured: false,
    },
  ])

  // Settings
  await db.insert(settings).values([
    { key: 'whatsapp_number', value: '93749274000' },
    { key: 'contact_email', value: 'info@nuristaniwood.com' },
    { key: 'instagram_url', value: 'https://instagram.com/nuristaniwood' },
    { key: 'facebook_url', value: 'https://facebook.com/nuristaniwood' },
  ]).onConflictDoNothing()

  console.log('Seed complete!')
  await client.end()
}

seed().catch(console.error)
