'use client';

import { motion } from 'framer-motion';
import type { Machine } from '@/lib/machine-data';

export function MachineDetailClient({ machine }: { machine: Machine }) {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block text-xs font-semibold text-white/70 tracking-widest uppercase bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4"
      >
        Güven İş ve İstif Makinaları
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-3"
      >
        {machine.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white/75 max-w-xl"
      >
        {machine.shortDesc}
      </motion.p>
    </>
  );
}
