import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// ====================
// ON-DEMAND REVALIDATION - TAG
// ====================
// This endpoint allows triggering revalidation of specific cache tags
// More granular than revalidatePath - only affects tagged fetch requests

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { tag, secret } = body

    // Validate secret
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET
    if (!REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Validate tag
    if (!tag || typeof tag !== 'string') {
      return NextResponse.json(
        { message: 'Tag is required' },
        { status: 400 }
      )
    }

    // Revalidate the tag
revalidateTag(tag, {})


    return NextResponse.json({
      revalidated: true,
      tag,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated tag: ${tag}`,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}