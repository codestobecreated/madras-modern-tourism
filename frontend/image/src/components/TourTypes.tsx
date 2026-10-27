import React from "react";
import { motion } from "motion/react";
import { TOUR_TYPES } from "../data";
import { Compass, Waves, Plane, Heart, Award, Shield, Landmark } from "lucide-react";

interface TourTypesProps {
  onTypeSelect: (typeTitle: string) => void;
}

export default function TourTypes({ onTypeSelect }: TourTypesProps) {
  // Mapping standard names to lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass size={28} />;
      case "Waves":
        return <Waves size={28} />;
      case "Plane":
        return <Plane size={28} />;
      case "Tree":
        return <Landmark size={28} />; // Replacing Tree with Landmark for high-fidelity look
      default:
        return <Compass size={28} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-brand-light font-sans relative overflow-hidden">
      {/* Decorative repeating patterns background */}
      <div className="absolute right-0 bottom-0 top-0 w-1/4 bg-[url('/assets/input_file_42.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
            Tour Categories & Services
          </span>
          <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
            Choose Our Tour Types & Enjoy Now
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Select a specialized category tailored perfectly with custom accommodations, sports packages, and expert safety crews.
          </p>
        </div>

        {/* Categories Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TOUR_TYPES.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onTypeSelect(type.title)}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl hover:border-brand-orange/20 transition-all select-none cursor-pointer flex flex-col justify-between group h-[260px] relative overflow-hidden"
            >
              {/* Giant background index number (01, 02...) */}
              <span className="absolute right-6 top-6 text-gray-100 font-mono font-extrabold text-5xl group-hover:text-brand-orange/10 group-hover:scale-105 transition-all">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon Container with beautiful hover animations */}
              <div className="p-3.5 bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white rounded-2xl w-fit transition-all duration-300 shadow shadow-brand-orange/5">
                {getIcon(type.iconName)}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2 mt-6">
                <h3 className="text-brand-blue text-lg font-bold group-hover:text-brand-orange transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {type.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
