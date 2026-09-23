import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, MapPin, Camera, Calendar, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface MediaLightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onBookItem: (category: string) => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({
  item,
  onClose,
  onBookItem,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6"
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-5xl w-full bg-[#121216] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col lg:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media View (Left/Top) */}
          <div className="lg:w-3/5 bg-black relative flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px]">
            {item.videoUrl ? (
              <video
                src={item.videoUrl}
                poster={item.image}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-cover max-h-[500px]"
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover max-h-[500px]"
              />
            )}

            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-white/80 border border-white/10">
              {item.category}
            </div>
          </div>

          {/* Project Details (Right/Bottom) */}
          <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location}</span>
                <span>•</span>
                <span>{item.year}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">
                {item.title}
              </h3>

              <div className="mt-2 text-xs font-medium text-zinc-400 uppercase tracking-wider font-mono">
                Client: <span className="text-white font-semibold">{item.client}</span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {item.description}
              </p>

              {item.cameraSpecs && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Production Specs</span>
                  </div>
                  <p className="text-xs font-mono text-zinc-300">{item.cameraSpecs}</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  onBookItem(item.category);
                }}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Similar Shoot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
