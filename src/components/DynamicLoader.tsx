import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles } from 'lucide-react';

interface DynamicLoaderProps {
  onComplete?: () => void;
}

export const DynamicLoader: React.FC<DynamicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="ap-media-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-[#f4f4f5] px-6 select-none"
        >
          {/* Subtle radial ambient background */}
          <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm w-full text-center">
            {/* Shutter Aperture Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-20 h-20 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/30 flex items-center justify-center backdrop-blur-md">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute inset-0 border-t-2 border-white rounded-full"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-1 mb-6"
            >
              <h1 className="text-3xl font-extrabold tracking-[0.25em] uppercase font-serif text-white">
                AP MEDIA
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium">
                Capturing Moments • Creating Stories
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-800/80 rounded-full h-[2px] overflow-hidden mb-3">
              <motion.div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-zinc-400 animate-pulse" />
                Initializing Cinema Engine
              </span>
              <span>{progress}%</span>
            </div>

            {/* Skip Option */}
            <button
              id="skip-loader-btn"
              onClick={() => {
                setIsFinished(true);
                onComplete?.();
              }}
              className="mt-8 text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest underline underline-offset-4"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
