import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hi AP Media! I'm interested in booking a photography / videography shoot. Could you please share your availability and package guide?"
  );
  const whatsappUrl = `https://wa.me/27824508921?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip Dialog */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-3 max-w-xs bg-[#121216] border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl relative text-left"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-white p-1"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300 font-bold">
                AP Media Desk
              </span>
            </div>

            <p className="text-xs text-zinc-200 leading-snug">
              Need immediate date availability or a fast quote? Chat directly with our team on WhatsApp.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-wider"
            >
              <span>Start WhatsApp Chat &rarr;</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#18181b] hover:bg-[#27272a] text-white border border-white/20 hover:border-emerald-500/50 shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Chat with AP Media on WhatsApp"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>

          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
            WhatsApp Us
          </span>
        </a>
      </div>
    </div>
  );
};
