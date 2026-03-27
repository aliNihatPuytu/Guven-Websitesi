'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface VideoIntroProps {
  onClose: () => void;
}

export function VideoIntro({ onClose }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Auto-play when mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, still show the modal
      });
    }
  }, []);

  const handleVideoEnd = () => {
    // Close after video finishes
    setTimeout(onClose, 400);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] bg-[#0B1929]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Modal container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blue accent border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#1E5AA8]/60 via-transparent to-[#4A90D9]/30" />

        <div className="relative bg-[#0B1929] rounded-2xl overflow-hidden shadow-2xl shadow-[#1E5AA8]/20">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1E5AA8] animate-pulse" />
              <span className="text-white/70 text-sm font-medium tracking-wide">
                Güven İş ve İstif Makinaları — Tanıtım
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors"
                title={isMuted ? 'Sesi aç' : 'Sesi kapat'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video area */}
          <div className="relative aspect-video bg-[#060F1A]">
            {/* 
              VIDEO ENTEGRASYONU:
              Aşağıdaki video elementine src="/videos/tanitim.mp4" ekleyin
              ve public/videos/ klasörüne tanıtım videonuzu yükleyin.
              
              YOUTUBE KULLANMAK İSTERSENİZ:
              video elementini kaldırıp aşağıdaki iframe ile değiştirin:
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=1&rel=0"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            */}
            <video
              ref={videoRef}
              src="/videos/tanitim.mp4"
              className="w-full h-full object-cover"
              muted={isMuted}
              playsInline
              controls
              onEnded={handleVideoEnd}
              onLoadedData={() => setIsLoaded(true)}
              poster="/images/hero-construction.jpg"
            />

            {/* Loading overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060F1A]">
                <div className="relative w-36 h-12 mb-6">
                  {/* Logo placeholder area */}
                </div>
                <div className="w-12 h-12 border-2 border-[#1E5AA8]/30 border-t-[#1E5AA8] rounded-full animate-spin" />
                <p className="text-white/40 text-sm mt-4">Video yükleniyor...</p>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/8">
            <p className="text-white/40 text-xs">
              1978'den Bu Yana Güvenle Hizmet
            </p>
            <button
              onClick={onClose}
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-2"
            >
              Videoyu Atla
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
