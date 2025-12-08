import React, { useEffect, useRef, useState } from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback for browsers without IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 }); // Trigger as soon as any pixel is visible

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const animationClass = isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[20px]';
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={domRef}
      className={`${className} ${animationClass}`}
      style={{ ...style, ...delayStyle }}
    >
      {children}
    </div>
  );
};

export default FadeInUp;