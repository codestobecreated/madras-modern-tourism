import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DESTINATIONS } from "../data";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

interface DestinationsProps {
  onSelectDestination: (destId: string) => void;
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // number of items to show at once on desktop

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, DESTINATIONS.length - visibleCount) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount >= DESTINATIONS.length ? 0 : prev + 1));
  };

  return (
    <section id="destinations" className="py-20 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header with Left-Aligned Info and Action Navigator Buttons on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
              Destination List
            </span>
            <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
              Explore the Beautiful Places Around World
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Flexible options refers to professional local guides guiding travelers through secure trails safely.
            </p>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-12 h-12 rounded-full border border-gray-200 hover:border-brand-orange hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow transition-all cursor-pointer disabled:opacity-40 select-none"
              aria-label="Previous Destinations"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + visibleCount >= DESTINATIONS.length}
              className="w-12 h-12 rounded-full border border-gray-200 hover:border-brand-orange hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow transition-all cursor-pointer disabled:opacity-40 select-none"
              aria-label="Next Destinations"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.slice(startIndex, startIndex + visibleCount).map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectDestination(dest.id)}
              className="relative rounded-3xl overflow-hidden shadow-lg h-[380px] group cursor-pointer"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/30 to-transparent opacity-90 group-hover:via-brand-blue/40 transition-all duration-300" />

              {/* Bottom text block tag */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col space-y-1">
                <span className="text-xs uppercase tracking-wider text-brand-orange font-bold font-sans">
                  {dest.tagline || "Places in"}
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-brand-orange transition-colors">
                  {dest.name}
                </h3>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-white/90 bg-white/10 py-1.5 px-3 rounded-full flex items-center space-x-1 backdrop-blur-sm">
                    <MapPin size={10} className="text-brand-orange" />
                    <span>{dest.listingsCount} Listings</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
