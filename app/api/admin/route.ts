import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const correct = process.env.ADMIN_PASSWORD
  if (!correct) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 })
  }
  if (body.password === correct) {
    return NextResponse.json({ token: correct })
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}
