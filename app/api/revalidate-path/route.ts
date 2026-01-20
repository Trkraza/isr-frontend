import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// ====================
// ON-DEMAND REVALIDATION - PATH
// ====================
// This endpoint allows triggering revalidation of specific paths
// Used by admin panel to instantly update cached pages

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { path, secret } = body

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

    // Validate path
    if (!path || typeof path !== 'string') {
      return NextResponse.json(
        { message: 'Path is required' },
        { status: 400 }
      )
    }

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated ${path}`,
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