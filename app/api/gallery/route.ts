import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Parse query parameters for pagination (optional)
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch images from the database with pagination
    let { data: generated_images, error } = await supabase
    .from('generated_images')
    .select('*').order('created_at', { ascending: false })
    if (error) {
        throw new Error(error.message);
        }

    if (!generated_images) {
        return NextResponse.json(
            { error: 'No images found' },
            { status: 404 }
        );
    }
    
    console.log('Fetched images:', generated_images);

    // Format the images for the response
    const images = generated_images.map((image) => ({
      id: image.id,
      imageData: image.image_data,
      prompt: image.prompt,
      createdAt: image.created_at,
      user: {
        id: image.user_id,
        name: image.user_name,
      },
    }));
    // Apply pagination
    const paginatedImages = images.slice(offset, offset + limit);
    // Update the response with paginated images

    // Check if there are more images to load
    const hasMore = generated_images.length > offset + limit;

    // Return the formatted images with pagination info


    // Return the formatted images
    return NextResponse.json({
      images: paginatedImages,
      pagination: {
        limit,
        offset,
        total: images.length,
        hasMore,
      }
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
