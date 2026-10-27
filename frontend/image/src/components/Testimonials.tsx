import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-24 bg-white font-sans relative overflow-hidden">
      {/* Decorative vectors top background */}
      <div className="absolute left-8 top-12 w-32 h-32 text-gray-100 opacity-50 pointer-events-none">
        <Quote size={128} className="rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
            Testimonial
          </span>
          <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
            See what they are talking about?
          </h2>
        </div>

        {/* Carousel slide box element */}
        <div className="max-w-4xl mx-auto relative bg-brand-light rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Avatar & stars */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/input_file_15.png";
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-brand-blue text-lg font-bold">{item.name}</h3>
                  <p className="text-brand-orange text-xs font-semibold">{item.role}</p>
                </div>

                <div className="flex space-x-1 justify-center">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                  ))}
                </div>
              </div>

              {/* Right Column: Quote message */}
              <div className="md:col-span-8 text-left space-y-4 relative">
                <Quote size={40} className="text-brand-orange/15 absolute -top-4 -left-2" />
                <p className="text-gray-500 text-sm md:text-base leading-relaxed pl-6 relative z-10 italic">
                  "{item.quote}"
                </p>
                <div className="w-12 h-1 bg-brand-orange rounded-full ml-6" />
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation control knobs */}
          <div className="absolute right-8 bottom-8 flex space-x-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow-md transition-all cursor-pointer select-none"
              aria-label="Previous Review"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white hover:bg-brand-orange hover:text-white flex items-center justify-center text-brand-blue shadow-md transition-all cursor-pointer select-none"
              aria-label="Next Review"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
