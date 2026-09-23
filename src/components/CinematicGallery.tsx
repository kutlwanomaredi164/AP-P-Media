import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2, Camera, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mediaData';

interface CinematicGalleryProps {
  onOpenLightbox: (imageUrl: string, title: string, caption: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const GALLERY_CATEGORIES: { label: string; value: string }[] = [
  { label: 'All', value: 'All' },
  { label: 'Weddings', value: 'Weddings' },
  { label: 'Corporate Events', value: 'Corporate Events' },
  { label: 'Brand Campaigns', value: 'Brand Campaigns' },
  { label: 'Conferences', value: 'Conferences' },
  { label: 'Studio Shoots', value: 'Studio Shoots' },
  { label: 'Music Productions', value: 'Music Productions' },
  { label: 'Matric Dance', value: 'Matric Dance' },
  { label: 'Graduation', value: 'Graduation' },
];

export const CinematicGallery: React.FC<CinematicGalleryProps> = ({
  onOpenLightbox,
  selectedCategory: externalCategory = 'All',
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(externalCategory);

  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory?.(category);
  };

  const filteredGallery =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section id="gallery" className="relative py-28 bg-[#09090b] border-t border-white/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-zinc-300" />
              Visual Storyboard
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight uppercase mt-3">
              Cinematic Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            Every frame a deliberate composition. Immerse yourself in high-definition stillness and filmic tones across diverse moments.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.value.toLowerCase()
                  ? 'bg-white text-black font-bold shadow-md scale-105'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Filter Badge / Reset */}
        {selectedCategory !== 'All' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 w-fit"
          >
            <span className="text-xs font-mono text-zinc-400">
              Active Category: <span className="text-white font-bold">{selectedCategory}</span> ({filteredGallery.length} {filteredGallery.length === 1 ? 'photo' : 'photos'})
            </span>
            <button
              onClick={() => handleCategoryChange('All')}
              className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-300 hover:text-white underline underline-offset-2 transition-colors ml-2"
            >
              <span>View All</span>
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        {/* Dynamic Gallery Grid with Asymmetric Sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item, index) => {
            // Asymmetric layout logic for visual luxury appeal
            const isTall = index % 3 === 0;
            const isWide = index === 1 || index === 6;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                onClick={() => onOpenLightbox(item.image, item.title, item.caption)}
                className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer ${
                  isTall ? 'sm:row-span-2 h-96 sm:h-auto' : 'h-64 sm:h-72'
                } ${isWide ? 'lg:col-span-2' : ''}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption & Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-base font-bold font-serif text-white uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-300 font-light mt-0.5 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
