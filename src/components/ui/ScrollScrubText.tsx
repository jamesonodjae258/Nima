'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollScrubTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

export function ScrollScrubText({
  text,
  highlightWords = [],
  className = '',
}: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start illuminating when top enters lower half of screen
      const start = windowHeight * 0.85;
      // Fully illuminated when bottom reaches center of screen
      const end = windowHeight * 0.25;

      const totalDistance = start - end;
      const currentDistance = start - rect.top;

      const rawProgress = currentDistance / totalDistance;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.3] flex flex-wrap gap-x-2.5 gap-y-1.5 justify-center text-center">
        {words.map((word, idx) => {
          const wordThreshold = idx / words.length;
          const isIlluminated = progress >= wordThreshold;
          const isHighlight = highlightWords.some(
            (hw) => word.toLowerCase().includes(hw.toLowerCase())
          );

          return (
            <span
              key={idx}
              className="transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] inline-block"
              style={{
                opacity: isIlluminated ? 1 : 0.18,
                transform: isIlluminated ? 'translateY(0)' : 'translateY(4px)',
                color: isIlluminated
                  ? isHighlight
                    ? '#FF8C61'
                    : '#F5F5F7'
                  : '#5C6370',
                textShadow:
                  isIlluminated && isHighlight
                    ? '0 0 20px rgba(255, 107, 53, 0.4)'
                    : undefined,
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}
