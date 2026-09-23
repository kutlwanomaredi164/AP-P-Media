import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { HERO_SHOWREELS } from '../data/mediaData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExplorePortfolio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExplorePortfolio }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeReel = HERO_SHOWREELS[activeReelIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectReel = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // autoplay restriction fallback
      });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#09090b]"
    >
      {/* Background Video Stream with fallback poster */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          key={activeReel.id}
          src={activeReel.videoUrl}
          poster={activeReel.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Multi-Layer Dark Overlays for Ultra High Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/40 to-[#09090b]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

        {/* Viewfinder Corner Overlays for Director/Cinema Aesthetic */}
        <div className="hidden sm:block absolute top-24 left-8 w-8 h-8 border-t-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="hidden sm:block absolute top-24 right-8 w-8 h-8 border-t-2 border-r-2 border-white/20 pointer-events-none" />
        <div className="hidden sm:block absolute bottom-12 left-8 w-8 h-8 border-b-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="hidden sm:block absolute bottom-12 right-8 w-8 h-8 border-b-2 border-r-2 border-white/20 pointer-events-none" />

        {/* Director Info Tag */}
        <div className="hidden md:flex items-center gap-2 absolute top-28 left-12 text-[11px] font-mono tracking-widest text-zinc-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>REC [4K 10-BIT PRORES]</span>
          <span className="text-zinc-600">|</span>
          <span>{activeReel.title.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-32 flex flex-col items-center">
        {/* Subtle Luxury Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-200 font-semibold font-sans">
            Capturing Moments. Creating Stories.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif tracking-tight text-white leading-[1.08] max-w-4xl uppercase drop-shadow-2xl"
        >
          Capturing Moments That Last Forever.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light tracking-wide leading-relaxed drop-shadow"
        >
          Professional Photography & Videography for Events, Brands, Businesses and Life's Biggest Milestones.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-book-shoot-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-zinc-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <span>Book A Shoot</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-view-portfolio-btn"
            onClick={onExplorePortfolio}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white bg-white/5 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>View Portfolio</span>
          </button>
        </motion.div>

        {/* Reel Category Switcher Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-14 w-full max-w-2xl"
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-zinc-400 mb-2 px-2 font-mono">
            <span>Select Cinematic Reel</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute showreel' : 'Mute showreel'}
                className="hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Quick Reel Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            {HERO_SHOWREELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => handleSelectReel(idx)}
                className={`py-2 px-3 rounded-xl text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 truncate text-center ${
                  activeReelIndex === idx
                    ? 'bg-white text-black shadow-lg font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {reel.category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.a
        href="#trust-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-zinc-400 group-hover:text-white" />
        </motion.div>
      </motion.a>
    </section>
  );
};
