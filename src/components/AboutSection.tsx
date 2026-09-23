import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Award,
  Palette,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Video,
  Camera,
  Cpu,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Passion',
      icon: <Flame className="w-5 h-5 text-white" />,
      desc: 'An obsessive drive to discover breathtaking angles and elevate moments into enduring visual heirlooms.',
    },
    {
      title: 'Professionalism',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      desc: 'Punctual, discreet, and calibrated. Our presence puts executive keynote speakers and nervous brides equally at ease.',
    },
    {
      title: 'Creativity',
      icon: <Palette className="w-5 h-5 text-white" />,
      desc: 'Distinctive cinematic vision that transcends standard stock photography with emotive color science and dynamic lighting.',
    },
    {
      title: 'Reliability',
      icon: <Award className="w-5 h-5 text-white" />,
      desc: 'Dual-card slot backups, redundant cinema bodies, and strict adherence to turnaround promises.',
    },
    {
      title: 'Attention to Detail',
      icon: <Eye className="w-5 h-5 text-white" />,
      desc: 'Micro-adjusting every tie, dress train, microphone shadow, and audio waveform for flawless final delivery.',
    },
  ];

  const gearArsenal = [
    { label: 'Cinema Cameras', value: 'Sony FX6 & FX3 4K/120p' },
    { label: 'Prime Lenses', value: 'Sony G-Master Primes f/1.2 & f/1.4' },
    { label: 'Aerial Filming', value: 'DJI Mavic 3 Pro Cine (ProRes)' },
    { label: 'Stabilization', value: 'DJI Ronin RS3 Pro & Steadicam' },
    { label: 'Audio Capture', value: 'Sennheiser Wireless G4 & Rode NTG' },
    { label: 'Color Grading', value: 'DaVinci Resolve Studio 10-Bit Color' },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Photography Collage (Slides from left) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Primary Large Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group h-80 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                  alt="AP Media Cinematographer with Cinema Camera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                    Behind The Lens
                  </span>
                  <p className="text-sm font-bold font-serif text-white uppercase">
                    Cinema-Grade Production
                  </p>
                </div>
              </div>

              {/* Secondary Stacked Images */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-36 sm:h-44">
                  <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
                    alt="Fashion Shoot Direction"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-40 sm:h-48">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                    alt="Luxury Wedding Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-serif font-bold text-white uppercase">
                    Unscripted Emotion
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-10 bg-[#121216] border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 z-20">
                <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold font-serif text-xl">
                  8+
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white">
                    Years of Mastery
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Johannesburg • Cape Town • Nationwide
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story and Mission (Slides from right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6 mt-8 lg:mt-0"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              About AP Media
            </span>

            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight uppercase mt-3 leading-tight">
              More Than Photos. We Capture Stories.
            </h2>

            <p className="mt-6 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              AP Media was founded on a singular conviction: that life's most defining milestones—whether the exchange of wedding vows in Franschhoek, a landmark technology symposium in Sandton, a breakthrough music video, or a proud graduation walk—deserve visual preservation of uncompromising cinematic quality.
            </p>

            <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
              We reject generic poses and sterile snapshots. Our approach combines documentary authenticity with the visual grandeur of feature film cinematography, ensuring your memories remain as vivid twenty years from now as they were the moment they unfolded.
            </p>

            {/* 5 Core Values Pill Grid */}
            <div className="mt-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono block mb-2">
                Our Production Pillars:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {pillar.icon}
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear & Technical Excellence Strip */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-zinc-300 mb-3">
                <Cpu className="w-4 h-4 text-zinc-400" />
                <span>Camera & Post-Production Suite</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {gearArsenal.map((item) => (
                  <div key={item.label} className="text-[11px] bg-black/40 p-2 rounded-lg border border-white/5">
                    <span className="text-zinc-500 block font-mono text-[9px] uppercase">
                      {item.label}
                    </span>
                    <span className="text-zinc-200 font-medium truncate block">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
