import Image from 'next/image';

interface EmojiCardProps {
  emoji: {
    id: number;
    src: string;
    alt: string;
  };
}

export function EmojiCard({ emoji }: EmojiCardProps) {
  if (!emoji?.src) {
    return (
      <div className="p-4 border rounded-lg shadow-sm">
        <p className="text-red-500">Invalid emoji data</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <Image
        src={emoji.src}
        alt={emoji.alt || 'Generated emoji'}
        width={150}
        height={150}
        className="rounded-lg"
      />
    </div>
  );
} 