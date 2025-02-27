import { createClient } from '@supabase/supabase-js';
import { User, Session } from '@supabase/supabase-js'

export interface AuthResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: Error | null;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Regular email/password sign in
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

// Google sign in
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });
  
  return { data, error };
};

// Sign up with email and password
export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

// Sign out
export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (err) {
    return { error: err as Error };
  }
};

// Get the currently logged in user
export const getCurrentUser = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { user: session?.user || null, error: null }
  } catch (error) {
    return {
      user: null,
      error: {
        message: (error as Error).message || 'Error getting user'
      }
    }
  }
}

// Get the current session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

// Refresh the session if needed
export const refreshSession = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  return { session: data.session, error };
};
