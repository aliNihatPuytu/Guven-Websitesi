'use client';

import { useEffect } from 'react';
import { scrollToHashAfterRender } from '@/lib/section-navigation';

export function HashScrollHandler() {
  useEffect(() => {
    scrollToHashAfterRender();

    const handleHashChange = () => {
      scrollToHashAfterRender();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
