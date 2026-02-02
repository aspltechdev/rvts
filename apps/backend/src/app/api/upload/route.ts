import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert File → Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const isImage = file.type.startsWith('image/')
    const originalName = file.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-')

    let name = ''
    let finalBuffer: Buffer = buffer

    if (isImage) {
      try {
        const bgrFormData = new FormData()

        // CRITICAL FIX:
        // Convert Node Buffer → Uint8Array → Blob (Web compatible)
        const blob = new Blob([new Uint8Array(buffer)], { type: file.type })
        bgrFormData.append('image_file', blob, file.name)
        bgrFormData.append('size', 'auto')

        const bgrResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': 'MsodFsUSBWNuGxpoGNGiNdfV',
          },
          body: bgrFormData,
        })

        if (!bgrResponse.ok) {
          const err = await bgrResponse.text()
          throw new Error(err)
        }

        const bgrArrayBuffer = await bgrResponse.arrayBuffer()
        const bgrBuffer = Buffer.from(bgrArrayBuffer)

        finalBuffer = await sharp(bgrBuffer)
          .resize({
            width: 1200,
            height: 1200,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .png({ quality: 90, palette: true })
          .toBuffer()

        name = `${Date.now()}-${originalName}.png`
      } catch (err: any) {
        console.warn('Background removal failed, using fallback:', err.message)

        finalBuffer = await sharp(buffer)
          .resize({
            width: 1200,
            height: 1200,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .png()
          .toBuffer()

        name = `${Date.now()}-${originalName}.png`
      }
    } else {
      const ext = file.name.split('.').pop()
      name = `${Date.now()}-${originalName}.${ext}`
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, name), finalBuffer)

    const baseUrl = process.env.APP_URL || 'http://localhost:3002'
    const url = `${baseUrl}/uploads/${name}`
    return NextResponse.json({ url })
  } catch (e: any) {
    console.error('Upload error:', e)
    return NextResponse.json(
      { error: 'Upload failed: ' + e.message },
      { status: 500 }
    )
  }
}
