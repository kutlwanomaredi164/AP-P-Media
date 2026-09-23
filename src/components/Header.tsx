import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Menu, X, Calendar, ArrowUpRight, Phone, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      try {
        // Play a subtle shutter audio frequency using web audio API
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch {
        // audio context fallback
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-serif font-black text-lg tracking-tighter transition-transform duration-300 group-hover:scale-105 shadow-md">
            AP
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.2em] font-extrabold text-lg text-white group-hover:text-zinc-200 transition-colors uppercase leading-none">
              AP MEDIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 mt-1 font-sans font-medium">
              Photo & Cinema • SA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-white transition-colors duration-200 font-medium relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Subtle Ambient Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label="Toggle camera sound effects"
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
            title={soundEnabled ? 'Audio cues enabled' : 'Enable audio cues'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Call Button */}
          <a
            href="tel:+27824508921"
            className="text-xs uppercase tracking-widest text-zinc-300 hover:text-white px-3 py-2 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-[11px]">+27 82 450 8921</span>
          </a>

          {/* Book A Shoot Primary CTA */}
          <button
            id="header-book-btn"
            onClick={() => onOpenBooking()}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-white text-black hover:bg-zinc-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book A Shoot</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-book-header-btn"
            onClick={() => onOpenBooking()}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white text-black sm:hidden"
          >
            Book
          </button>

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2.5 text-zinc-300 hover:text-white focus:outline-none rounded-lg bg-zinc-900/60 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#09090b]/98 border-b border-white/10 backdrop-blur-2xl px-6 py-8"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base uppercase tracking-[0.2em] font-serif text-zinc-300 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  Book A Shoot Now
                </button>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 font-mono">
                  <span>Johannesburg • Cape Town</span>
                  <a href="tel:+27824508921" className="text-white hover:underline">
                    +27 82 450 8921
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
