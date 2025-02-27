import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export async function saveGeneratedImage(userId: string, imageUrl: string, prompt: string, enhancedPrompt: string) {
  try {
    const { data, error } = await supabase
      .from('generated_images')
      .insert([
        {
          user_id: userId,
          image_data: imageUrl,
          prompt: prompt,
          created_at: new Date().toISOString(),
          enhanced_prompt: enhancedPrompt,
        },
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving image:', error)
    throw error
  }
}

export async function getUserImages(userId: string) {
  try {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user images:', error);
    throw error;
  }
}
