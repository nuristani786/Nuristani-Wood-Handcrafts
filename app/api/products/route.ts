import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products } from '@/db/schemas/products'
import { categories } from '@/db/schemas/categories'
import { eq, ilike, and, or } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const categoryId = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const allProducts = await db
      .select({
        id: products.id,
        nameFa: products.nameFa,
        nameEn: products.nameEn,
        price: products.price,
        descriptionFa: products.descriptionFa,
        descriptionEn: products.descriptionEn,
        categoryId: products.categoryId,
        categoryNameFa: categories.nameFa,
        categoryNameEn: categories.nameEn,
        inStock: products.inStock,
        dimensions: products.dimensions,
        weight: products.weight,
        imageUrls: products.imageUrls,
        featured: products.featured,
        createdAt: products.createdAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(
          categoryId ? eq(products.categoryId, parseInt(categoryId)) : undefined,
          featured ? eq(products.featured, true) : undefined,
          search
            ? or(
                ilike(products.nameFa, `%${search}%`),
                ilike(products.nameEn, `%${search}%`)
              )
            : undefined
        )
      )
      .orderBy(products.createdAt)

    return NextResponse.json(allProducts)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { adminToken } = body
    if (adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { nameFa, nameEn, price, descriptionFa, descriptionEn, categoryId, inStock, dimensions, weight, imageUrls, featured } = body

    const [product] = await db
      .insert(products)
      .values({
        nameFa,
        nameEn,
        price: Math.round(parseFloat(price) * 100),
        descriptionFa: descriptionFa ?? '',
        descriptionEn: descriptionEn ?? '',
        categoryId: categoryId ? parseInt(categoryId) : null,
        inStock: inStock ?? true,
        dimensions: dimensions ?? null,
        weight: weight ?? null,
        imageUrls: imageUrls ?? [],
        featured: featured ?? false,
      })
      .returning()

    return NextResponse.json(product)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
