import React from 'react';
import { Camera, ArrowUp, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { SERVICES_DATA } from '../data/mediaData';

interface FooterProps {
  onSelectService: (serviceTitle: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-serif font-black text-lg">
                AP
              </div>
              <div>
                <span className="font-serif tracking-[0.2em] font-extrabold text-xl text-white block uppercase">
                  AP MEDIA
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
                  Visual Production Agency • South Africa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              "Capturing Moments. Creating Stories."
              <br />
              South Africa’s premier creative media production agency specializing in cinematic videography, luxury wedding photography, corporate events, and milestone celebrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold">
              Services & Coverage
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onSelectService(srv.title);
                      const el = document.getElementById('contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left py-1 truncate w-full"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-bold">
              Agency Studios
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <span>Rosebank, Johannesburg & Kloof Street, Cape Town (Available Nationwide)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-300 shrink-0" />
                <a href="tel:+27824508921" className="hover:text-white font-mono">
                  +27 82 450 8921
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-300 shrink-0" />
                <a href="mailto:bookings@apmedia.co.za" className="hover:text-white font-mono">
                  bookings@apmedia.co.za
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-all text-xs font-semibold uppercase tracking-wider text-center"
              >
                Inquire For Shoot Dates
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} AP Media (Pty) Ltd. All rights reserved. Registered in South Africa.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
