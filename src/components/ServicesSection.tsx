import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Sparkles,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Camera,
  Briefcase,
  Users,
  Music,
  Heart,
  GraduationCap,
  Sparkle,
  Images,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mediaData';
import { ServiceItem, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onViewGallery: (category: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewGallery,
}) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'event-coverage':
        return <Users className="w-6 h-6" />;
      case 'brand-shoots':
        return <Sparkles className="w-6 h-6" />;
      case 'corporate-conferences':
        return <Briefcase className="w-6 h-6" />;
      case 'studio-shoots':
        return <Camera className="w-6 h-6" />;
      case 'music-creative':
        return <Music className="w-6 h-6" />;
      case 'wedding-coverage':
        return <Heart className="w-6 h-6" />;
      case 'matric-dance':
        return <Sparkle className="w-6 h-6" />;
      case 'graduation-shoots':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <Camera className="w-6 h-6" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  return (
    <section id="services" className="relative py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Specialized Production Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight uppercase mt-3">
            Cinematic Services Tailored For Impact
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            From life-defining personal celebrations to multi-day corporate conferences and commercial brand campaigns, AP Media delivers world-class visuals crafted with technical precision.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service: ServiceItem, idx: number) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative rounded-2xl bg-[#121216] border border-white/10 hover:border-white/40 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:luxury-glow"
              >
                {/* Visual Image Header with Gradient Veil */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/60 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {service.number}
                    </span>

                    {service.highlightTag && (
                      <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-black bg-white px-2.5 py-1 rounded-full shadow-md">
                        {service.highlightTag}
                      </span>
                    )}
                  </div>

                  {/* Service Icon floating on image */}
                  <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                      {service.subtitle}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white uppercase tracking-tight mt-1 mb-3 group-hover:text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Deliverables List (Expandable or preview) */}
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-2">
                        Deliverables Include:
                      </span>
                      {service.deliverables.slice(0, isExpanded ? 4 : 2).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}

                      {service.deliverables.length > 2 && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono mt-1 pt-1 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show less</span>
                              <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <span>+ {service.deliverables.length - 2} more details</span>
                              <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA & Price Tier */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 block font-mono">
                        Investment
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        {service.startingRate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewGallery(service.category)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
                        title={`View ${service.title} Gallery`}
                      >
                        <Images className="w-3.5 h-3.5 text-black" />
                        <span>View Gallery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 text-xs font-semibold uppercase tracking-wider border border-white/15 hover:border-transparent active:scale-[0.98]"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
