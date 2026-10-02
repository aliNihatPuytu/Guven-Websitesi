'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Açılış perdesi. İçerik altında zaten render edilir (SEO için);
 * bu bileşen yalnızca kısa süreli üst katman olarak görünür.
 * Oturum başına yalnızca bir kez gösterilir.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('guven-intro') === '1';
    } catch {}
    if (seen) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem('guven-intro', '1'); } catch {}
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
          aria-hidden
        >
          <div className="absolute inset-0 grid-texture pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-8"
          >
            <div className="relative w-64 h-20 sm:w-80 sm:h-24">
              <Image src="/images/guven-white.png" alt="" fill sizes="320px" className="object-contain" priority />
            </div>
            <span className="block w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.span
                className="block h-full bg-brand-light"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
