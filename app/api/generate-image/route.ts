import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const LOCATION = 'us-central1';
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const MODEL_VERSION = 'imagen-3.0-generate-002';

async function getAccessToken() {
  try {
    const { stdout } = await execAsync('gcloud auth print-access-token');
    return stdout.trim();
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get access token');
  }
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const accessToken = process.env.NEXT_PUBLIC_GCLOUD_AUTH_KEY || await getAccessToken();
    
    const response = await fetch(
      `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
          }
        })
      }
    );

    console.log('Response Status:', response.status);
    console.log('Response Status Text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('API Response Status:', result.predictions[0]?.prompt);


    const imageData = result.predictions[0]?.bytesBase64Encoded;
    if (!imageData) {
      throw new Error('No image data received in the response');
    }

    return NextResponse.json({ 
      imageUrl: `data:image/png;base64,${imageData}` ,
      enhancedPrompt: result.predictions[0]?.prompt,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
