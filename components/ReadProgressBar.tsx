'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ReadProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show after initial scroll or some delay to avoid flash
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
