import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { BookingFormState } from '../types';

interface BookingSectionProps {
  initialService?: string;
  onExploreWork?: () => void;
}

const SA_LOCATIONS = [
  'Johannesburg / Sandton (Gauteng)',
  'Pretoria / Tshwane (Gauteng)',
  'Cape Town & Winelands (Western Cape)',
  'Durban & Umhlanga (KwaZulu-Natal)',
  'Gqeberha / Garden Route (Eastern Cape)',
  'Free State / Bloemfontein',
  'Limpopo / Mpumalanga (Kruger Safari)',
  'Other / Nationwide Travel',
];

const SERVICE_OPTIONS = [
  'Wedding Photography & Videography',
  'Event Coverage & Ceremonies',
  'Corporate & Conferences',
  'Brand Shoots',
  'Studio Shoots',
  'Music & Creative Productions',
  'Matric Dance Coverage',
  'Graduation Shoots',
  'Custom Hybrid Production',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialService = 'Wedding Photography & Videography',
  onExploreWork,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: initialService,
    packageTier: 'Signature',
    eventDate: '',
    locationCity: 'Johannesburg / Sandton (Gauteng)',
    budgetRange: 'R 15,000 - R 35,000',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync if initialService changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  // Generate direct WhatsApp link with pre-populated message
  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi AP Media! I'm interested in booking a shoot.\n\nName: ${formData.fullName || 'Prospective Client'}\nService: ${formData.serviceType}\nTier: ${formData.packageTier}\nTarget Date: ${formData.eventDate || 'TBD'}\nLocation: ${formData.locationCity}\n\nLooking forward to hearing from you!`
    );
    return `https://wa.me/27824508921?text=${text}`;
  };

  return (
    <section id="contact" className="relative py-28 bg-[#09090b]">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Dates Booking For 2026 & 2027
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight uppercase mt-3">
            Secure Your Production Date
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Due to our high-touch cinema workflow, AP Media accepts a limited number of commissions per month. Inquire below for availability, comprehensive pricing guides, or direct WhatsApp priority response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: High-Converting Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121216] border border-white/15 relative overflow-hidden">
              <AnimatePresence>
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 shadow-2xl">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-2">
                      Inquiry Dispatched Successfully
                    </h3>

                    <p className="text-sm text-zinc-300 max-w-md font-light leading-relaxed mb-8">
                      Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Our executive producer will review your shoot date and reply with our full digital treatment brochure within 24 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Instantly On WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white underline underline-offset-4 py-2"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. Lerato Ndlovu"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-email"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          name="email"
                          required
                          placeholder="lerato@example.co.za"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone & Service Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          name="phone"
                          required
                          placeholder="+27 82 000 0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-service"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Service Required *
                        </label>
                        <select
                          id="booking-service"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white transition-colors text-sm"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-zinc-900 text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date & Location in South Africa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Target Event / Shoot Date
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-location"
                          className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                        >
                          Province / Venue Location
                        </label>
                        <select
                          id="booking-location"
                          name="locationCity"
                          value={formData.locationCity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white transition-colors text-sm"
                        >
                          {SA_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc} className="bg-zinc-900 text-white">
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Package Tier Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                        Desired Production Tier
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Standard', 'Signature', 'Luxury Cinema'] as const).map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData({ ...formData, packageTier: tier })}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                              formData.packageTier === tier
                                ? 'bg-white text-black border-white shadow-md'
                                : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2"
                      >
                        Tell Us About Your Vision / Details
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={3}
                        name="notes"
                        placeholder="Provide details about expected timeline, venue, vibe, aesthetic goals, or specific creative requests..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors text-sm"
                      />
                    </div>

                    {/* Submit CTA & WhatsApp Direct Action */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="submit-booking-btn"
                        className="w-full sm:flex-1 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Processing Commission...</span>
                        ) : (
                          <>
                            <span>Book Your Shoot</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Instant WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Contact Information & Direct Access */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 rounded-3xl bg-[#121216] border border-white/15 space-y-6">
              <h3 className="text-xl font-bold font-serif text-white uppercase tracking-wide">
                Direct Agency Contacts
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+27824508921"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                      Direct Line / WhatsApp
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      +27 82 450 8921
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:bookings@apmedia.co.za"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                      Official Bookings
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      bookings@apmedia.co.za
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                      Studios & Base
                    </span>
                    <span className="text-sm font-medium text-white">
                      Rosebank, JHB & Kloof St, Cape Town
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating hours */}
              <div className="pt-4 border-t border-white/10 text-xs text-zinc-400 space-y-1 font-mono">
                <div className="flex items-center justify-between">
                  <span>Mon – Fri:</span>
                  <span className="text-white">08:00 – 18:00 SAST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sat & Shoots:</span>
                  <span className="text-white">By Appointment</span>
                </div>
              </div>
            </div>

            {/* Secondary CTA Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/15">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-zinc-300" />
                <span>Our Guarantee</span>
              </div>
              <h4 className="text-lg font-bold font-serif text-white uppercase">
                Zero Compromise. Prompt Delivery.
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                48-hour social highlight trailers, master color graded 4K films, and dedicated client proofing galleries with lifetime cloud archiving.
              </p>

              {onExploreWork && (
                <button
                  type="button"
                  onClick={onExploreWork}
                  className="mt-5 text-xs font-bold uppercase tracking-widest text-white hover:underline flex items-center gap-1.5"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
