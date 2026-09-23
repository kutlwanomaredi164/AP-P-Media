import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  FileCheck,
  Camera,
  Film,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mediaData';

export const ProcessTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageSquare className="w-5 h-5" />;
      case 1:
        return <FileCheck className="w-5 h-5" />;
      case 2:
        return <Camera className="w-5 h-5" />;
      case 3:
        return <Film className="w-5 h-5" />;
      case 4:
        return <Send className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="relative py-28 bg-[#0a0a0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            Seamless Client Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight uppercase mt-3">
            From Vision To Masterpiece
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Our structured five-phase production workflow guarantees complete transparency, peace of mind, and meticulous artistic finish on every commission.
          </p>
        </div>

        {/* Step Tabs for Interactive Exploration */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                    : 'bg-[#121215] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-zinc-700' : 'text-zinc-500'
                    }`}
                  >
                    STEP {step.step}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-black text-white' : 'bg-white/5 text-zinc-300'
                    }`}
                  >
                    {getStepIcon(idx)}
                  </div>
                </div>

                <h3
                  className={`text-sm font-bold font-serif uppercase tracking-wider truncate ${
                    isActive ? 'text-black' : 'text-white'
                  }`}
                >
                  {step.title.split('&')[0]}
                </h3>

                <span
                  className={`text-[10px] font-mono block mt-1 ${
                    isActive ? 'text-zinc-600 font-medium' : 'text-zinc-500'
                  }`}
                >
                  {step.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#121216] border border-white/15 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-black bg-white px-3 py-1 rounded-full">
                  PHASE {PROCESS_STEPS[activeStepIndex].step}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated Time: {PROCESS_STEPS[activeStepIndex].duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white uppercase tracking-tight">
                {PROCESS_STEPS[activeStepIndex].title}
              </h3>
              <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mt-1">
                {PROCESS_STEPS[activeStepIndex].subtitle}
              </p>

              <p className="mt-5 text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                {PROCESS_STEPS[activeStepIndex].description}
              </p>
            </div>

            {/* Deliverables Box */}
            <div className="lg:col-span-4 bg-black/50 p-6 rounded-2xl border border-white/10">
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block mb-4">
                Phase Deliverables & Milestones:
              </span>
              <ul className="space-y-3">
                {PROCESS_STEPS[activeStepIndex].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
