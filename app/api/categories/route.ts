import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schemas/categories'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const all = await db.select().from(categories).orderBy(categories.id)
    return NextResponse.json(all)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const [cat] = await db
      .insert(categories)
      .values({ nameFa: body.nameFa, nameEn: body.nameEn })
      .returning()
    return NextResponse.json(cat)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const [cat] = await db
      .update(categories)
      .set({ nameFa: body.nameFa, nameEn: body.nameEn })
      .where(eq(categories.id, parseInt(body.id)))
      .returning()
    return NextResponse.json(cat)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await db.delete(categories).where(eq(categories.id, parseInt(body.id)))
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
