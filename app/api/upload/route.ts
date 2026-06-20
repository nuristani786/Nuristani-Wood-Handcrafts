import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_DIMENSION = 1200

/** Resize image to max 1200px on the longest side using Canvas API (Web standard) */
async function resizeImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
  try {
    // Use the OffscreenCanvas / createImageBitmap Web API available in Node 18+
    const blob = new Blob([buffer], { type: mimeType })
    const bitmap = await createImageBitmap(blob)
    const { width, height } = bitmap

    if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
      bitmap.close()
      return buffer // already small enough
    }

    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
    const newW = Math.round(width * ratio)
    const newH = Math.round(height * ratio)

    const canvas = new OffscreenCanvas(newW, newH)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0, newW, newH)
    bitmap.close()

    const outputBlob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.85 })
    const out = await outputBlob.arrayBuffer()
    return Buffer.from(out)
  } catch {
    // If resize fails (env limitation), return original
    return buffer
  }
}

/** Upload to Cloudflare R2 via CF REST API (works from any server/sandbox) */
async function uploadToR2(buffer: Buffer, filename: string, contentType: string): Promise<string> {
  const accountId = process.env.R2_ACCOUNT_ID!
  const bucketName = process.env.R2_BUCKET_NAME!
  const apiToken = process.env.R2_API_TOKEN!
  const publicUrl = process.env.R2_PUBLIC_URL!

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${filename}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': contentType,
    },
    body: buffer,
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`R2 upload failed: ${res.status} ${txt.slice(0, 200)}`)
  }

  return `${publicUrl}/${filename}`
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const adminToken = formData.get('adminToken') as string
    if (adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, WebP, or GIF.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const originalBuffer = Buffer.from(bytes)

    // Resize to max 1200px
    const resized = await resizeImage(originalBuffer, file.type)

    const ext = resized === originalBuffer
      ? (file.name.split('.').pop()?.toLowerCase() || 'jpg')
      : 'webp'
    const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const contentType = ext === 'webp' ? 'image/webp' : file.type

    // If R2 credentials are configured → use R2 (permanent storage)
    const r2Ready =
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_BUCKET_NAME &&
      process.env.R2_API_TOKEN &&
      process.env.R2_PUBLIC_URL

    if (r2Ready) {
      const publicUrl = await uploadToR2(resized, filename, contentType)
      return NextResponse.json({ url: publicUrl, storage: 'r2' })
    }

    // Fallback: local filesystem (dev / before R2 is configured)
    const localFilename = filename.replace('products/', '')
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, localFilename), resized)
    return NextResponse.json({ url: `/uploads/${localFilename}`, storage: 'local' })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
