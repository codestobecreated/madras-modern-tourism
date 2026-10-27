import React from "react";
import { motion } from "motion/react";
import { Award, Compass, Shield, CheckCircle2, ArrowRight } from "lucide-react";

interface CompanyProfileProps {
  onExploreMore: () => void;
}

export default function CompanyProfile({ onExploreMore }: CompanyProfileProps) {
  const points = [
    "Many variations of passages of lorem secure tours.",
    "Breathtaking scenery with professional guide options.",
    "Expert many variations of tourism instructors."
  ];

  return (
    <section id="about" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Multi-Photo High Fidelity Collage */}
        <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center select-none">
          {/* Main big beach chair frame element */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-4 top-8 w-[65%] h-[75%] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white"
          >
            <img
              src="/assets/input_file_9.png" // beach wicker lounge
              alt="Cozy Beach Resort"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Overlapping holiday collage elements */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-4 bottom-4 w-[55%] h-[60%] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <img
              src="/assets/input_file_14.png" // collage suitcase camera hat
              alt="Vacation Collage Pack"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Floating small circular logo emblem */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute left-1/2 top-12 z-20 -translate-x-12 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-brand-orange"
          >
            <img
              src="/assets/input_file_51.png" // Travivu white logo or white emblem icon
              alt="Emblem"
              className="w-14 h-14 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/assets/input_file_8.png";
              }}
            />
          </motion.div>

          {/* Floating backpacker icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.4 }}
            className="absolute left-6 bottom-12 z-20 w-[110px] h-[110px] rounded-2xl overflow-hidden shadow-lg border-2 border-white"
          >
            <img
              src="/assets/input_file_41.png" // plane beach view circle
              alt="Trekking portrait"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Paragraph Contents and Lists */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
              Get to Know Us
            </span>
            <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
              Experience the World with Our Company
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.
            </p>
          </div>

          {/* Cards style features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            {/* Friendly guide box */}
            <div className="bg-brand-light p-5 rounded-2xl border border-gray-100 flex items-start space-x-4">
              <div className="p-3 bg-brand-orange text-white rounded-xl shadow-md">
                <Compass size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-brand-blue font-bold text-base">Friendly Guide</h3>
                <p className="text-gray-400 text-xs leading-relaxed">Variations of passages of lorem Ipsum standard.</p>
              </div>
            </div>

            {/* Safety Travel box */}
            <div className="bg-brand-light p-5 rounded-2xl border border-gray-100 flex items-start space-x-4">
              <div className="p-3 bg-brand-blue text-white rounded-xl shadow-md">
                <Shield size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-brand-blue font-bold text-base">Safety Travel</h3>
                <p className="text-gray-400 text-xs leading-relaxed">Ultimate security kits and tracking guidance.</p>
              </div>
            </div>

          </div>

          {/* Checked lists points */}
          <div className="space-y-3 pt-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm font-semibold text-brand-blue">
                <CheckCircle2 size={16} className="text-brand-orange flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Action button */}
          <div className="pt-4">
            <button
              onClick={onExploreMore}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs md:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded-full shadow-lg shadow-brand-orange/20 transition-all select-none cursor-pointer flex items-center space-x-2 transform active:scale-95"
            >
              <span>Explore More</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
