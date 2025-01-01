'use client';

import Image from 'next/image';
import { Download, Trash2, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Emoji {
  id: number;
  src: string;
  alt: string;
}

interface EmojiGridProps {
  emojis: Emoji[];
  onDelete?: (id: number) => void;
  onLike?: (id: number) => void;
}

export function EmojiGrid({ emojis, onDelete, onLike }: EmojiGridProps) {
  const handleDownload = async (emoji: Emoji) => {
    try {
      const response = await fetch(emoji.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emoji-${emoji.id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {emojis.map((emoji) => (
        <div 
          key={emoji.id} 
          className="relative aspect-square group"
        >
          <Image
            src={emoji.src}
            alt={emoji.alt}
            fill
            className="object-contain rounded-lg"
            unoptimized
          />
          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleDownload(emoji)}
              className="h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onLike?.(emoji.id)}
              className="h-8 w-8"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDelete?.(emoji.id)}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
} 