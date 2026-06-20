import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products } from '@/db/schemas/products'
import { categories } from '@/db/schemas/categories'
import { eq } from 'drizzle-orm'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [product] = await db
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
      .where(eq(products.id, parseInt(id)))

    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { adminToken, nameFa, nameEn, price, descriptionFa, descriptionEn, categoryId, inStock, dimensions, weight, imageUrls, featured } = body

    if (adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [updated] = await db
      .update(products)
      .set({
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
      .where(eq(products.id, parseInt(id)))
      .returning()

    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    if (body.adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await db.delete(products).where(eq(products.id, parseInt(id)))
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
