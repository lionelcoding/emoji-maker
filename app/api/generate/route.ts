import { NextResponse } from 'next/server';
import Replicate from "replicate";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    
    if (!token || !token.startsWith('r8_')) {
      throw new Error('Invalid API token');
    }

    const replicate = new Replicate({
      auth: token
    });

    const { prompt } = await request.json();
    console.log('Processing prompt:', prompt);

    const prediction = await replicate.predictions.create({
      version: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      input: {
        prompt: "A TOK OF EMOJI OF " + prompt,
        apply_watermark: false
      }
    });

    // Wait for the prediction to complete
    let finalPrediction = await replicate.wait(prediction);
    console.log('Final prediction:', finalPrediction);

    if (!finalPrediction.output || !finalPrediction.output[0]) {
      throw new Error('No output generated');
    }

    const imageUrl = finalPrediction.output[0];
    console.log('Generated image URL:', imageUrl);

    const response = {
      emojis: [{
        id: Date.now(),
        src: imageUrl,
        alt: `Generated emoji for: ${prompt}`
      }]
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message,
        details: error.response?.data || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 