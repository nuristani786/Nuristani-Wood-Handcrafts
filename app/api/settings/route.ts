import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { settings } from '@/db/schemas/settings'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const all = await db.select().from(settings)
    const result: Record<string, string> = {}
    for (const s of all) result[s.key] = s.value
    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allowedKeys = ['whatsapp_number', 'contact_email', 'instagram_url', 'facebook_url']
    for (const key of allowedKeys) {
      if (key in body) {
        const existing = await db.select().from(settings).where(eq(settings.key, key))
        if (existing.length > 0) {
          await db.update(settings).set({ value: body[key], updatedAt: new Date() }).where(eq(settings.key, key))
        } else {
          await db.insert(settings).values({ key, value: body[key] })
        }
      }
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
