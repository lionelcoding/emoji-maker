'use client';

import { useState } from 'react';
import { EmojiForm } from '@/components/emoji-form';
import { EmojiGrid } from '@/components/emoji-grid';
import { uploadEmoji } from '@/app/actions/emoji';

interface Emoji {
  id: number;
  src: string;
  alt: string;
}

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setEmojis(prev => prev.filter(emoji => emoji.id !== id));
  };

  const handleLike = (id: number) => {
    // Implement like functionality here
    console.log('Liked emoji:', id);
  };

  const generateEmoji = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
        // First generate the emoji using the AI
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate emoji');
        }

        if (!data.emojis || !Array.isArray(data.emojis)) {
            throw new Error('Invalid response format');
        }

        // Upload each generated emoji
        const uploadPromises = data.emojis.map(async (emoji) => {
            const uploadedEmoji = await uploadEmoji(emoji.src, prompt);
            return {
                id: uploadedEmoji.id,
                src: uploadedEmoji.image_url,
                alt: prompt
            };
        });

        const uploadedEmojis = await Promise.all(uploadPromises);
        setEmojis(prev => [...prev, ...uploadedEmojis]);

    } catch (error) {
        console.error('Generation error:', error);
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emoji Generator</h1>
      <EmojiForm onSubmit={generateEmoji} isLoading={isLoading} />
      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}
      <EmojiGrid 
        emojis={emojis} 
        onDelete={handleDelete}
        onLike={handleLike}
      />
    </main>
  );
}
