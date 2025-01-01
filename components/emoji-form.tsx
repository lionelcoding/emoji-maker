'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';

interface EmojiFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function EmojiForm({ onSubmit, isLoading }: EmojiFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-2">
      <Input
        placeholder="Enter a prompt to generate an emoji"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        <Send className="h-4 w-4 mr-2" />
        Generate
      </Button>
    </form>
  );
} 