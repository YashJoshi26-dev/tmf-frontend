import { useEffect, useState } from 'react';

/** Returns 'up' | 'down' based on last scroll direction. Useful for hiding the header on scroll-down. */
export const useScrollDirection = () => {
  const [dir, setDir] = useState('up');

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 5) {       // ignore tiny jitter
        setDir(y > lastY ? 'down' : 'up');
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return dir;
};
