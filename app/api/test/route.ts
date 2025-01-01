import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasToken: !!process.env.REPLICATE_API_TOKEN,
    nodeEnv: process.env.NODE_ENV,
    envKeys: Object.keys(process.env).filter(key => key.includes('REPLICATE')),
  });
} 