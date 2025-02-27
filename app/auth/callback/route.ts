import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {

  // Get the authorization code from the URL
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  
  
  if (code) {
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(new URL('/auth/error', req.url));
      }
      
      // Extract the access token
      const accessToken = data.session?.access_token;
      
      if (accessToken) {
        // Store the access token (could store in Supabase or handle as needed)
        // You could store it in a secure cookie or pass it to client via URL parameters if needed
        
        // Example: Store in user metadata (if your app requires this)
        await supabase.auth.updateUser({
          data: {
            has_active_session: true,
            last_sign_in: new Date().toISOString(),
          }
        });
        
        // Redirect to the home page or dashboard after successful authentication
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (err) {
      console.error('Unexpected error during authentication:', err);
      return NextResponse.redirect(new URL('/auth/error', req.url));
    }
  }
  
  // Fallback redirect to the home page
  return NextResponse.redirect(new URL('/', req.url));
}
