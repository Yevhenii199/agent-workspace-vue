import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { validateProfile } from '@/lib/validation';

export interface OperatorProfile {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
}

export function useOperatorProfile() {
  const [profile, setProfile] = useState<OperatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { data, error: fetchError } = await supabase
        .from('operators')
        .select('id, name, email, avatar_initials')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          avatarInitials: data.avatar_initials || '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name: string, email: string) => {
    const validationErrors = validateProfile(name, email);
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors[0].message,
      };
    }

    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const avatarInitials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      if (profile) {
        const { error: updateError } = await supabase
          .from('operators')
          .update({
            name,
            email,
            avatar_initials: avatarInitials,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id);

        if (updateError) throw updateError;

        setProfile({
          ...profile,
          name,
          email,
          avatarInitials,
        });
      } else {
        const { data, error: insertError } = await supabase
          .from('operators')
          .insert({
            user_id: user.id,
            name,
            email,
            avatar_initials: avatarInitials,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          avatarInitials: data.avatar_initials,
        });
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}
