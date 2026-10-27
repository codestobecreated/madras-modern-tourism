import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SLIDES } from "../data";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  onActionClick: () => void;
}

export default function HeroSlider({ onActionClick }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[620px] md:h-[720px] bg-brand-light overflow-hidden flex items-center">
      {/* Decorative Wave/Blob Pattern Layer (Rotates/Pulsates) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-shape-${current}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: 15 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -right-24 -top-24 w-[600px] h-[600px] pointer-events-none select-none select-none z-0"
        >
          <img 
            src={slide.bgShape || "/assets/input_file_0.png"} 
            alt="Decoration" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Animated Text Content */}
        <div className="text-left flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            <div key={`text-block-${current}`}>
              {/* Tagline cursive-tag */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-brand-orange text-3xl font-cursive md:text-4xl capitalize h-10 block"
              >
                {slide.tagline}
              </motion.p>

              {/* Display Title */}
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-brand-blue text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mt-3"
              >
                {slide.title}
              </motion.h1>

              {/* Sub description */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-gray-500 font-sans text-sm md:text-base max-w-md mt-4"
              >
                Discover the best hotels, professional tour guides, and affordable premium travel itineraries designed with safety and style.
              </motion.p>

              {/* Call-to-action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <button
                  onClick={onActionClick}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold uppercase tracking-wider text-xs md:text-sm py-3.5 px-8 rounded-full shadow-lg shadow-brand-orange/30 transition-all select-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {slide.actionText}
                </button>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>

        {/* Right Side: High Fidelity Collage Layers */}
        <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center lg:justify-end select-none">
          <AnimatePresence mode="wait">
            <div key={`image-block-${current}`} className="relative w-full h-full max-w-md flex items-center justify-center">
              
              {/* Primary Slide Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: -5, x: 80 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 5, x: -85 }}
                transition={{ duration: 1.1, type: "spring", stiffness: 70 }}
                className="relative z-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/input_file_1.png"; // Fallback to Opera House if needed
                  }}
                />
              </motion.div>

              {/* Floating Accent Circle portrait */}
              {slide.accentImage && (
                <motion.div
                  initial={{ opacity: 0, x: -100, y: 100, scale: 0.6 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, y: -100, scale: 0.6 }}
                  transition={{ duration: 1.3, type: "spring", stiffness: 80, delay: 0.2 }}
                  className="absolute -left-4 bottom-4 md:bottom-8 z-20 w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden shadow-xl border-4 border-white bg-white group hover:scale-105 transition-transform"
                >
                  <img
                    src={slide.accentImage}
                    alt="Accent Location"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/input_file_41.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-brand-blue/15 hover:bg-transparent transition-colors" />
                </motion.div>
              )}

              {/* Extra cute vector decoration */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute right-0 -top-4 md:top-4 z-20 w-24 h-24 pointer-events-none"
              >
                <img 
                  src="/assets/input_file_19.png" // plane trace path
                  alt="" 
                  className="w-full h-full object-contain opacity-40"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 50% discount Badge floating overlay */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 12 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="absolute right-8 bottom-12 md:right-16 md:bottom-20 z-30 w-20 h-20 md:w-24 md:h-20 drop-shadow-xl animate-bounce"
              >
                <img 
                  src="/assets/input_file_16.png" // "50% discount" circular badge
                  alt="Special Offer"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Nav Controls */}
      <div className="absolute bottom-8 left-4 md:left-8 flex items-center space-x-3 z-30">
        <button
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-brand-orange hover:text-white rounded-full flex items-center justify-center text-brand-blue shadow-md transition-all cursor-pointer select-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-bold text-brand-blue font-mono">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-brand-orange hover:text-white rounded-full flex items-center justify-center text-brand-blue shadow-md transition-all cursor-pointer select-none"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bullet Indicators on Right */}
      <div className="absolute right-4 md:right-8 bottom-8 flex space-x-2 z-30">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === current ? "bg-brand-orange w-8" : "bg-brand-blue/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
