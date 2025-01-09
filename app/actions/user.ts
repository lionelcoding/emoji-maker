'use server'

import { auth, currentUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

export async function createOrGetProfile() {
    try {
        console.log('1. Starting profile creation/fetch...');

        // Try both methods for better reliability
        let userId: string | null = null;
        
        try {
            // First attempt: Using currentUser
            const user = await currentUser();
            userId = user?.id;
        } catch {
            // Fallback: Using auth
            const authResult = auth();
            userId = authResult.userId;
        }

        console.log('2. Current user:', userId);

        if (!userId) {
            console.log('3. No user found');
            throw new Error('Not authenticated');
        }

        console.log('4. Checking for existing profile...');
        const { data: existingProfile, error: selectError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (selectError) {
            console.log('5. Select error:', selectError);
            throw selectError;
        }

        if (existingProfile) {
            console.log('6. Found existing profile:', existingProfile);
            return existingProfile;
        }

        console.log('7. Creating new profile...');
        const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
                {
                    user_id: userId,
                    credits: 3,
                    tier: 'free'
                }
            ])
            .select()
            .single();

        if (insertError) {
            console.log('8. Insert error:', insertError);
            throw insertError;
        }

        console.log('9. Created new profile:', newProfile);
        return newProfile;
    } catch (error) {
        console.error('10. Error in createOrGetProfile:', {
            error,
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
} 