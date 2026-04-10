import { cn } from '../../lib/cn';

type AsciiArtProps = {
  className?: string;
  src?: string;
};

export function AsciiArt({
  className,
  src = '/anuj-bg-free.png',
}: AsciiArtProps) {
  return (
    <div
      aria-label="Portrait of Anuj"
      className={cn('relative h-full w-full overflow-hidden', className)}
    >
      <img
        src={src}
        alt="Portrait of Anuj"
        className="absolute inset-0 h-full w-full object-cover opacity-95 grayscale contrast-115 brightness-95 sepia-[0.12]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.1),transparent_45%),linear-gradient(180deg,rgba(5,5,8,0.04),rgba(5,5,8,0.22))]" />
    </div>
  );
}

export default AsciiArt;
