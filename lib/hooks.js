import { useEffect, useState } from 'react';

export const useScrollDetect = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [y, setY] = useState(0);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [isScrolled, y];
};
