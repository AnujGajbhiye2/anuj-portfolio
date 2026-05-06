import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

type AspectRatio = '16/9' | '4/3' | '3/2' | '1/1' | 'auto';

const aspectClasses: Record<AspectRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3':  'aspect-[4/3]',
  '3/2':  'aspect-[3/2]',
  '1/1':  'aspect-square',
  'auto': '',
};

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: AspectRatio;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
}

export const LazyImage = ({ src, alt, className, aspectRatio = 'auto', sizes, objectFit = 'cover' }: LazyImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'relative overflow-hidden bg-background-secondary',
        aspectClasses[aspectRatio],
        className,
      )}
    >
      {!isLoaded && !hasError && (
        <>
          <div className="absolute inset-0 animate-pulse bg-background-tertiary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-text-dim">[loading...]</span>
          </div>
        </>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center border border-surface">
          <span className="font-mono text-xs text-red-400">[img error]</span>
        </div>
      )}

      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'h-full w-full transition-opacity duration-300',
            objectFit === 'contain' ? 'object-contain' : 'object-cover',
            isLoaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
};
