import React, { useState } from "react";
import { Search, MapPin, Calendar, CreditCard, Compass } from "lucide-react";

interface SearchFilterProps {
  onFilterChange: (filters: { destination: string; type: string; price: number }) => void;
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("");
  const [maxPrice, setMaxPrice] = useState(359);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      destination,
      type: tripType,
      price: maxPrice
    });
  };

  const destinationsList = [
    { value: "", label: "All Destinations" },
    { value: "italy", label: "Italy" },
    { value: "france", label: "France" },
    { value: "maldives", label: "Maldives" },
    { value: "rome", label: "Rome" }
  ];

  const tripTypesList = [
    { value: "", label: "All Categories" },
    { value: "Adventure", label: "Adventure" },
    { value: "Beache Tour", label: "Beach Tour" },
    { value: "Water Sports", label: "Water Sports" },
    { value: "Nature Walks", label: "Nature Walks" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative -mt-16 z-30 font-sans">
      <div className="bg-white rounded-3xl md:rounded-[40px] shadow-2xl p-6 md:p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Destination Column */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-1">
              <MapPin size={12} className="text-brand-orange" />
              <span>Location</span>
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-brand-light text-brand-blue font-semibold text-sm rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-orange focus:outline-none appearance-none cursor-pointer"
              >
                {destinationsList.map((dest) => (
                  <option key={dest.value} value={dest.value}>
                    {dest.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Trip Type column */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-1">
              <Compass size={12} className="text-brand-orange" />
              <span>Type</span>
            </label>
            <div className="relative">
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full bg-brand-light text-brand-blue font-semibold text-sm rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-orange focus:outline-none appearance-none cursor-pointer"
              >
                {tripTypesList.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Max Price Range Filter Slider */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center space-x-1">
                <CreditCard size={12} className="text-brand-orange" />
                <span>Max Price</span>
              </span>
              <span className="text-brand-blue normal-case font-mono font-bold text-sm bg-brand-orange/10 px-2 py-0.5 rounded-lg">
                ${maxPrice}
              </span>
            </div>
            <div className="flex items-center py-2">
              <input
                type="range"
                min="100"
                max="360"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-orange cursor-pointer bg-gray-200 h-2 rounded-lg"
              />
            </div>
          </div>

          {/* Submit Action Block */}
          <div className="flex flex-col justify-end pt-4 sm:pt-0 sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold uppercase tracking-wider py-4 md:py-4 px-6 rounded-2xl md:rounded-3xl shadow-lg shadow-brand-orange/20 transition-all select-none cursor-pointer flex items-center justify-center space-x-2 transform active:scale-95"
            >
              <Search size={16} />
              <span>Search Tours</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
