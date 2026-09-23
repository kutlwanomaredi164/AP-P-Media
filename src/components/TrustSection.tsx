import React from 'react';
import { motion } from 'motion/react';
import { Camera, Film, Sparkles, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TRUST_BADGES, CLIENT_LOGOS } from '../data/mediaData';

export const TrustSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-6 h-6 text-zinc-100" />;
      case 'Film':
        return <Film className="w-6 h-6 text-zinc-100" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-zinc-100" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-zinc-100" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-zinc-100" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-zinc-100" />;
    }
  };

  return (
    <section id="trust-section" className="relative py-20 bg-[#09090b] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
              The AP Media Standard
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white tracking-tight uppercase mt-2">
              Trusted Excellence Across South Africa
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            Engineered for perfection. Whether an intimate bridal prep or a 5,000-delegate tech summit, our production standards never waver.
          </p>
        </div>

        {/* 5 Modern Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST_BADGES.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:luxury-glow"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <span className="group-hover:text-black transition-colors">
                      {getIcon(badge.iconName)}
                    </span>
                  </div>
                  {badge.stat && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {badge.stat}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold font-serif text-white uppercase tracking-wide mb-2 group-hover:text-zinc-100">
                  {badge.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {badge.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] uppercase font-mono tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span>Verified Protocol</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client & Brand Marquee */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono">
              Commissioned By Leading Brands & Prestigious Summits
            </span>
          </div>

          <div className="overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee gap-8 sm:gap-14 items-center">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex items-center gap-3 whitespace-nowrap px-4 py-2 rounded-full bg-white/[0.03] border border-white/5"
                >
                  <span className="text-sm font-serif font-bold text-zinc-300 uppercase tracking-widest">
                    {brand.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono">
                    {brand.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
