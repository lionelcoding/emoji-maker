'use client';

import { useState } from 'react';
import { EmojiForm } from '@/components/emoji-form';
import { EmojiGrid } from '@/components/emoji-grid';

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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate emoji');
      }

      if (!data.emojis || !Array.isArray(data.emojis)) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response format');
      }

      // Add timestamp to force image refresh
      const validEmojis = data.emojis.map(emoji => ({
        ...emoji,
        src: `${emoji.src}?t=${Date.now()}`
      }));

      console.log('Valid emojis:', validEmojis);
      setEmojis(prev => [...prev, ...validEmojis]);

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
