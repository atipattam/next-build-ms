import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    if (!url) {
      throw new Error('URL is required')
    }
    const response = await axios.get(url)
    return NextResponse.json({ status: response.status, data: response.data })
  } catch (error) {
    console.error('Error fetching URL:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
