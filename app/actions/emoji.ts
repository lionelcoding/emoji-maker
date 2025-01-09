'use server'

import { supabase, supabaseAdmin } from '@/lib/supabase';
import { createOrGetProfile } from './user';

export async function uploadEmoji(imageUrl: string, prompt: string) {
    try {
        // Get the current user's profile
        const profile = await createOrGetProfile();
        
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();
        
        // Generate a unique filename
        const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
        
        // Upload to Supabase Storage using admin client
        const { data: uploadData, error: uploadError } = await supabaseAdmin
            .storage
            .from('emojis')
            .upload(filename, imageBlob);

        if (uploadError) throw uploadError;

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('emojis')
            .getPublicUrl(filename);

        // Create record in emojis table using admin client
        const { data: emojiRecord, error: dbError } = await supabaseAdmin
            .from('emojis')
            .insert([
                {
                    image_url: publicUrl,
                    prompt: prompt,
                    creator_user_id: profile.user_id
                }
            ])
            .select()
            .single();

        if (dbError) throw dbError;

        return emojiRecord;

    } catch (error) {
        console.error('Error uploading emoji:', error);
        throw error;
    }
} 