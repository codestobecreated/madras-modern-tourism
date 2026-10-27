import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tour } from "../types";
import { Clock, Users, Star, Heart, Check, X, ArrowLeft, ArrowRight, Play } from "lucide-react";

interface ToursSectionProps {
  tours: Tour[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBookClick: (tour: Tour) => void;
  onVideoClick: (url: string) => void;
}

export default function ToursSection({ tours, favorites, onToggleFavorite, onBookClick, onVideoClick }: ToursSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // Show 3 cards at once on desktop

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, tours.length - visibleCount) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount >= tours.length ? 0 : prev + 1));
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />);
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={14} />);
      }
    }
    return stars;
  };

  return (
    <section id="tours" className="py-24 bg-brand-light font-sans relative">
      {/* Decorative lines / backgrounds */}
      <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-[url('/assets/input_file_30.png')] opacity-10 pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
              Featured Tours
            </span>
            <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
              Most Favorite Tour Places
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Choose your next breathtaking destination, curated securely with verified professional local guides.
            </p>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:border-brand-orange hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow transition-all cursor-pointer disabled:opacity-40 select-none"
              aria-label="Previous Tours"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + visibleCount >= tours.length}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:border-brand-orange hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow transition-all cursor-pointer disabled:opacity-40 select-none"
              aria-label="Next Tours"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Slidable Grid list */}
        {tours.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl max-w-xl mx-auto">
            <p className="text-lg font-semibold text-brand-blue mb-2">No matched tours found.</p>
            <p className="text-sm text-gray-400">Please adjust your filtration parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(startIndex, startIndex + visibleCount).map((tour, index) => {
              // Calculate discount % if available
              const hasDiscount = !!tour.discountPrice;
              const discountPercentage = hasDiscount 
                ? Math.round(((tour.discountPrice! - tour.price) / tour.discountPrice!) * 100)
                : 0;

              const isFav = favorites.includes(tour.id);

              return (
                <motion.article
                  key={tour.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Image/Thumbnail Panel with tags */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 " />

                    {/* Discount ribbon */}
                    {hasDiscount && (
                      <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg shadow-brand-orange/30 animate-pulse">
                        {discountPercentage}% Off
                      </span>
                    )}

                    {/* Right floating functional icons: Favorite and Video Play icon */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                      <button
                        onClick={() => onToggleFavorite(tour.id)}
                        className="p-2.5 bg-white/90 hover:bg-white text-brand-blue rounded-full shadow-md backdrop-blur-sm transition-all transform active:scale-90 cursor-pointer"
                        aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : "text-brand-blue/80"} />
                      </button>

                      <button
                        onClick={() => onVideoClick("https://www.youtube.com/watch?v=MtCMtC50gwY")}
                        className="p-2.5 bg-brand-orange text-white rounded-full shadow-md transition-all hover:bg-brand-orange-hover transform active:scale-90 cursor-pointer"
                        aria-label="Play Tour Video"
                      >
                        <Play size={14} className="fill-white" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-4">
                      {/* Name */}
                      <h3 className="text-brand-blue text-xl font-extrabold tracking-tight group-hover:text-brand-orange transition-colors">
                        {tour.title}
                      </h3>

                      {/* Brief description */}
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {tour.description || "Explore beautiful standard destinations guided securely by professional travel teams."}
                      </p>

                      {/* Rating details display */}
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-0.5">{renderStars(tour.rating)}</div>
                        <span className="text-xs font-bold text-brand-blue/80 font-mono">
                          {tour.rating} ({tour.reviewsCount} Reviews)
                        </span>
                      </div>

                      {/* Info badges */}
                      <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3.5 mt-2">
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
                          <Clock size={14} className="text-brand-orange" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
                          <Users size={14} className="text-brand-orange" />
                          <span>{tour.capacity} Pax</span>
                        </div>
                      </div>

                      {/* Coordinates / Address Location info */}
                      <div className="text-[11px] text-gray-400 font-bold tracking-wider flex items-center space-x-1.5 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange inline-block" />
                        <span>{tour.location}</span>
                      </div>
                    </div>

                    {/* Price and CTA booking actions */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block">From</span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-brand-blue text-2xl font-extrabold font-mono">${tour.price}</span>
                          {hasDiscount && (
                            <span className="text-gray-300 text-sm font-bold font-mono line-through">${tour.discountPrice}</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookClick(tour)}
                        className="bg-brand-blue hover:bg-brand-orange text-white hover:text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-2xl shadow transition-all select-none cursor-pointer transform active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
