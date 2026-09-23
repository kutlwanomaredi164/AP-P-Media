import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, MapPin, Eye, Filter } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/mediaData';
import { PortfolioItem, ServiceCategory } from '../types';

interface FeaturedPortfolioProps {
  onOpenItemModal: (item: PortfolioItem) => void;
}

const CATEGORIES: { label: string; value: ServiceCategory }[] = [
  { label: 'All Projects', value: 'All' },
  { label: 'Weddings', value: 'Weddings' },
  { label: 'Corporate Events', value: 'Corporate Events' },
  { label: 'Conferences', value: 'Conferences' },
  { label: 'Brand Campaigns', value: 'Brand Campaigns' },
  { label: 'Music Productions', value: 'Music Productions' },
  { label: 'Matric Dance', value: 'Matric Dance' },
  { label: 'Graduation', value: 'Graduation' },
  { label: 'Studio Shoots', value: 'Studio Shoots' },
];

export const FeaturedPortfolio: React.FC<FeaturedPortfolioProps> = ({ onOpenItemModal }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-28 bg-[#0a0a0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              Signature Body of Work
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight uppercase mt-3">
              Featured Portfolio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            A curated selection of landmark ceremonies, high-impact brand campaigns, music visualizers, and unforgettable academic achievements.
          </p>
        </div>

        {/* Categories Navigation Bar (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-white text-black font-semibold shadow-lg'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Cinematic Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Custom spanning for cinematic rhythm
              const isWide = project.aspectRatio === 'wide' || index === 0;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer ${
                    isWide ? 'md:col-span-2' : ''
                  }`}
                  onClick={() => onOpenItemModal(project)}
                >
                  {/* Image container */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Status & Video Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {project.category}
                      </span>

                      {project.videoUrl && (
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono font-bold text-black bg-white px-3 py-1 rounded-full shadow-lg">
                          <Play className="w-3 h-3 fill-black" />
                          <span>4K Video</span>
                        </span>
                      )}
                    </div>

                    {/* Center Hover Action Cue */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        {project.videoUrl ? (
                          <Play className="w-6 h-6 fill-black translate-x-0.5" />
                        ) : (
                          <Eye className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1">
                        <MapPin className="w-3 h-3 text-zinc-300" />
                        <span>{project.location}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-zinc-300 font-light mt-1 line-clamp-2">
                        {project.description}
                      </p>

                      {project.cameraSpecs && (
                        <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400 tracking-wider flex items-center justify-between">
                          <span>{project.cameraSpecs}</span>
                          <span className="text-white group-hover:underline uppercase tracking-widest text-[9px]">
                            View Story &rarr;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
