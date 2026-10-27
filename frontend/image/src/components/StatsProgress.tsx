import React from "react";
import { motion } from "motion/react";
import { STATS } from "../data";
import { Users, Tent, Smile, Award } from "lucide-react";

export default function StatsProgress() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users size={24} className="text-white" />;
      case "Tent":
        return <Tent size={24} className="text-white" />;
      case "Smile":
        return <Smile size={24} className="text-white" />;
      case "Award":
        return <Award size={24} className="text-white" />;
      default:
        return <Award size={24} className="text-white" />;
    }
  };

  return (
    <section className="py-16 bg-brand-blue text-white font-sans relative overflow-hidden">
      {/* Background World Map / plane line loop overlay graphic */}
      <div className="absolute inset-0 bg-[url('/assets/input_file_45.png')] opacity-5 bg-cover bg-center pointer-events-none select-none" />

      {/* Repeating lines path drawing decoration */}
      <div className="absolute right-4 top-4 w-28 h-28 transform rotate-12 pointer-events-none select-none opacity-20">
        <img src="/assets/input_file_22.png" alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4 p-4"
            >
              {/* Icon Box */}
              <div className="p-4 bg-brand-orange rounded-2xl shadow-lg shadow-brand-orange/20 flex-shrink-0 animate-pulse">
                {getIcon(stat.icon)}
              </div>

              {/* Data numbers count details */}
              <div className="space-y-1">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-brand-orange block">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-white/80 block uppercase tracking-wider text-xs">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
