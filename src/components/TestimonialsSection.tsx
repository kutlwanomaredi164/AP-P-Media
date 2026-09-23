import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mediaData';

export const TestimonialsSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-28 bg-[#0a0a0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-zinc-200 fill-zinc-200" />
              Endorsements & Praise
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight uppercase mt-3">
              Words From Our Clients
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            Real stories from couples, marketing leaders, graduates, and families whose biggest life moments we had the honor to capture.
          </p>
        </div>

        {/* Featured Large Carousel Testimonial */}
        <div className="relative mb-12">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#121216] border border-white/15 relative overflow-hidden"
          >
            <Quote className="absolute top-8 right-8 w-20 h-20 text-white/[0.04] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                {/* Star Rating & Category */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(TESTIMONIALS_DATA[currentIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-white" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {TESTIMONIALS_DATA[currentIdx].category}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-2xl font-serif text-white font-normal leading-relaxed italic">
                  "{TESTIMONIALS_DATA[currentIdx].quote}"
                </p>

                {/* Author Info */}
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={TESTIMONIALS_DATA[currentIdx].avatar}
                    alt={TESTIMONIALS_DATA[currentIdx].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wider">
                      {TESTIMONIALS_DATA[currentIdx].author}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono">
                      {TESTIMONIALS_DATA[currentIdx].role} • {TESTIMONIALS_DATA[currentIdx].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Badge / Verified Verification */}
              <div className="lg:col-span-4 bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verified Production Client</span>
                </div>
                <div className="text-sm font-bold text-white uppercase font-serif">
                  {TESTIMONIALS_DATA[currentIdx].event}
                </div>
                <p className="text-xs text-zinc-400 mt-2 font-light">
                  Commissioned for complete photo & cinematic video delivery.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-3 rounded-full bg-[#121216] border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-zinc-500">
              {currentIdx + 1} / {TESTIMONIALS_DATA.length}
            </span>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-3 rounded-full bg-[#121216] border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Supporting Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.slice(1, 4).map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-white fill-white" />
                    ))}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono">
                    {test.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-serif">
                  "{test.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-9 h-9 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {test.author}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {test.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
