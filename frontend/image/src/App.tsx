import React, { useState } from "react";
import { TOURS, GALLERY } from "./data";
import { Tour } from "./types";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import SearchFilter from "./components/SearchFilter";
import Destinations from "./components/Destinations";
import ToursSection from "./components/ToursSection";
import CompanyProfile from "./components/CompanyProfile";
import TourTypes from "./components/TourTypes";
import StatsProgress from "./components/StatsProgress";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Calendar, Users, Award, Shield, DollarSign, Compass, Video } from "lucide-react";

export default function App() {
  const [toursList, setToursList] = useState<Tour[]>(TOURS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [lightboxImage, setLightboxUrlImage] = useState<string | null>(null);

  // Booking details form state
  const [travelerName, setTravelerName] = useState("");
  const [travelerEmail, setTravelerNameEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-07-15");
  const [travelersCount, setTravelersCount] = useState(2);
  const [extraGuide, setExtraGuide] = useState(false);
  const [extraInsurance, setExtraInsurance] = useState(false);
  const [extraShuttle, setExtraShuttle] = useState(false);
  
  // Boarding Pass modal trigger
  const [showBoardingPass, setShowBoardingPass] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<any>(null);

  // Handle filtrations from the Trip Search bar
  const handleFilterChange = (filters: { destination: string; type: string; price: number }) => {
    let result = TOURS;

    // Filter by destination name matching
    if (filters.destination) {
      result = result.filter(
        (t) => t.location.toLowerCase().includes(filters.destination.toLowerCase()) || 
               t.title.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    // Filter by category type matching
    if (filters.type) {
      result = result.filter((t) => t.category.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by maximum cost value
    result = result.filter((t) => t.price <= filters.price);

    setToursList(result);

    // Smooth scroll down to tours list directly to preview output
    const section = document.getElementById("tours");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigations routing smooth scroll helper
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Trigger Booking wizard popup for target tour
  const handleBookClick = (tour: Tour) => {
    setSelectedTour(tour);
    setTravelersCount(2);
    setExtraGuide(false);
    setExtraInsurance(false);
    setExtraShuttle(false);
  };

  // Confirm booking & generate beautiful Boarding Pass voucher
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour || !travelerName.trim()) return;

    // Calculate final receipt numbers
    const baseTotal = selectedTour.price * travelersCount;
    const guideCost = extraGuide ? 50 * travelersCount : 0;
    const insuranceCost = extraInsurance ? 25 * travelersCount : 0;
    const shuttleCost = extraShuttle ? 35 : 0; // One-time private shuttle cost
    const grandSum = baseTotal + guideCost + insuranceCost + shuttleCost;

    const boardingCode = "TV-" + Math.floor(Math.random() * 90000 + 10000);
    const assignedSeat = "SEAT " + Math.floor(Math.random() * 18 + 1) + ["A", "B", "C", "F"][Math.floor(Math.random() * 4)];

    setBookedDetails({
      tourTitle: selectedTour.title,
      name: travelerName,
      email: travelerEmail,
      date: bookingDate,
      travelers: travelersCount,
      boardingCode,
      seat: assignedSeat,
      totalPaid: grandSum,
      shuttle: extraShuttle,
      guide: extraGuide
    });

    setSelectedTour(null);
    setShowBoardingPass(true);
  };

  // Calculate dynamic subtotals on the fly in the form popup
  const calculateLiveTotal = () => {
    if (!selectedTour) return 0;
    const baseTotal = selectedTour.price * travelersCount;
    const guideCost = extraGuide ? 50 * travelersCount : 0;
    const insuranceCost = extraInsurance ? 25 * travelersCount : 0;
    const shuttleCost = extraShuttle ? 35 : 0;
    return baseTotal + guideCost + insuranceCost + shuttleCost;
  };

  return (
    <div className="w-full bg-white select-text font-sans scroll-smooth">
      {/* Header element */}
      <Header
        onSearch={(q) => handleFilterChange({ destination: q, type: "", price: 360 })}
        onNavigate={handleNavigation}
        onActionClick={() => handleNavigation("tours")}
        favoritesCount={favorites.length}
      />

      {/* Hero Slide show carousel element */}
      <HeroSlider onActionClick={() => handleNavigation("tours")} />

      {/* Main filter column bar */}
      <SearchFilter onFilterChange={handleFilterChange} />

      {/* Destinations sliding visual gallery */}
      <Destinations onSelectDestination={(id) => handleFilterChange({ destination: id, type: "", price: 360 })} />

      {/* Company profile list with ticket checks */}
      <CompanyProfile onExploreMore={() => handleNavigation("tours")} />

      {/* Special services & categories cards icons */}
      <TourTypes onTypeSelect={(cat) => handleFilterChange({ destination: "", type: cat, price: 360 })} />

      {/* Centerpiece Tours gallery listings */}
      <ToursSection
        tours={toursList}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onBookClick={handleBookClick}
        onVideoClick={(url) => setLightboxUrl(url)}
      />

      {/* Achievements counting numbers widget */}
      <StatsProgress />

      {/* Clients feedback testimonials sliding box */}
      <Testimonials />

      {/* Extra high-end Promo Circular Lightbox Gallery Section */}
      <section className="py-20 bg-brand-light font-sans text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1.5 rounded-full inline-block">
              Visual Tour
            </span>
            <h2 className="text-brand-blue text-3xl md:text-5xl font-extrabold tracking-tight">
              Snapshot Gallery
            </h2>
            <p className="text-gray-400 text-xs">
              Click on any location snapshot to trigger full-fidelity lightbox previews instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GALLERY.map((imgUrl, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setLightboxUrlImage(imgUrl)}
                className="relative rounded-2xl overflow-hidden h-[180px] shadow-md border-2 border-white cursor-pointer group"
              >
                <img
                  src={imgUrl}
                  alt={`Gallery snapshot ${i + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-blue/30 group-hover:bg-brand-blue/0 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-brand-blue/80 py-1.5 px-3 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Feature Promotion banners */}
      <section className="py-12 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Banner 1 */}
          <div className="relative rounded-3xl overflow-hidden h-[240px] md:h-[280px] flex items-center p-8 md:p-12 text-left group">
            <img 
              src="/assets/input_file_20.png" 
              alt="Promo background" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              referrerPolicy="no-referrer"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-brand-blue/60 group-hover:bg-brand-blue/65 transition-colors" />
            <div className="relative z-10 space-y-4 max-w-sm text-white">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-wider">Special offer</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">Book Your Adventure Today!</h3>
              <button 
                onClick={() => handleNavigation("tours")}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow transition-all cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-3xl overflow-hidden h-[240px] md:h-[280px] flex items-center p-8 md:p-12 text-left group">
            <img 
              src="/assets/input_file_9.png" 
              alt="Promo background" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              referrerPolicy="no-referrer"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-brand-orange/60 group-hover:bg-brand-orange/65 transition-colors" />
            <div className="relative z-10 space-y-4 max-w-sm text-white">
              <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/20 py-1.5 px-3 rounded-full inline-block backdrop-blur-sm">Limited Season</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">Pack Your Bags and Go!</h3>
              <button 
                onClick={() => handleNavigation("tours")}
                className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow transition-all cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer component */}
      <Footer onNavigate={handleNavigation} />

      {/* INTERACTIVE BOOKING FORM WIZARD POPUP MODAL */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTour(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Dialog Content Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative max-w-lg w-full bg-white rounded-[32px] shadow-2xl p-6 md:p-8 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest block">Secure Reservation</span>
                  <h3 className="text-brand-blue text-xl font-extrabold tracking-tight">{selectedTour.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTour(null)} 
                  className="p-1.5 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full text-gray-400 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form element */}
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                
                {/* Traveler name */}
                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emily Watson"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full bg-brand-light font-semibold text-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-orange focus:outline-none border border-gray-100 text-brand-blue"
                  />
                </div>

                {/* Email address */}
                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="emily@example.com"
                    value={travelerEmail}
                    onChange={(e) => setTravelerNameEmail(e.target.value)}
                    className="w-full bg-brand-light font-semibold text-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-orange focus:outline-none border border-gray-100 text-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Select Date */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                      <Calendar size={12} className="text-brand-orange" />
                      <span>Depart Date</span>
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-brand-light font-semibold text-sm rounded-xl p-3 focus:ring-2 focus:ring-brand-orange focus:outline-none border border-gray-100 text-brand-blue cursor-pointer"
                    />
                  </div>

                  {/* Travelers slots */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                      <Users size={12} className="text-brand-orange" />
                      <span>Travelers</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="18"
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-brand-light font-semibold text-sm rounded-xl p-3 focus:ring-2 focus:ring-brand-orange focus:outline-none border border-gray-100 text-brand-blue"
                    />
                  </div>
                </div>

                {/* Extra Services Checklist (mimics wp travel engine features) */}
                <div className="pt-2 text-left space-y-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Add Extra Services</span>
                  
                  {/* Guide */}
                  <div className="flex items-center justify-between p-3 bg-brand-light rounded-xl hover:border-brand-orange/20 border border-gray-100 transition-colors">
                    <label className="flex items-center space-x-3 text-xs font-bold text-brand-blue cursor-pointer">
                      <input
                        type="checkbox"
                        checked={extraGuide}
                        onChange={(e) => setExtraGuide(e.target.checked)}
                        className="accent-brand-orange w-4 h-4 rounded cursor-pointer"
                      />
                      <span>Professional Personal Guide</span>
                    </label>
                    <span className="text-xs text-brand-orange font-mono font-bold">+$50 / Pax</span>
                  </div>

                  {/* Insurance */}
                  <div className="flex items-center justify-between p-3 bg-brand-light rounded-xl hover:border-brand-orange/20 border border-gray-100 transition-colors">
                    <label className="flex items-center space-x-3 text-xs font-bold text-brand-blue cursor-pointer">
                      <input
                        type="checkbox"
                        checked={extraInsurance}
                        onChange={(e) => setExtraInsurance(e.target.checked)}
                        className="accent-brand-orange w-4 h-4 rounded cursor-pointer"
                      />
                      <span>Trekking/Health Insurance</span>
                    </label>
                    <span className="text-xs text-brand-orange font-mono font-bold">+$25 / Pax</span>
                  </div>

                  {/* Shuttle */}
                  <div className="flex items-center justify-between p-3 bg-brand-light rounded-xl hover:border-brand-orange/20 border border-gray-100 transition-colors">
                    <label className="flex items-center space-x-3 text-xs font-bold text-brand-blue cursor-pointer">
                      <input
                        type="checkbox"
                        checked={extraShuttle}
                        onChange={(e) => setExtraShuttle(e.target.checked)}
                        className="accent-brand-orange w-4 h-4 rounded cursor-pointer"
                      />
                      <span>Private Private Airport Shuttle</span>
                    </label>
                    <span className="text-xs text-brand-orange font-mono font-bold">+$35 (Flat)</span>
                  </div>
                </div>

                {/* dynamic cost calculation preview section */}
                <div className="bg-brand-light rounded-2xl p-4 mt-4 space-y-2 border border-gray-100 text-left text-sm">
                  <div className="flex justify-between text-gray-500 font-semibold text-xs">
                    <span>Base Fare (${selectedTour.price} x {travelersCount})</span>
                    <span className="font-mono font-bold text-brand-blue">${selectedTour.price * travelersCount}</span>
                  </div>
                  {(extraGuide || extraInsurance || extraShuttle) && (
                    <div className="flex justify-between text-gray-500 font-semibold text-xs border-b border-gray-200 pb-2">
                      <span>Addons / Shuttle</span>
                      <span className="font-mono font-bold text-brand-blue">
                        +${(extraGuide ? 50 * travelersCount : 0) + (extraInsurance ? 25 * travelersCount : 0) + (extraShuttle ? 35 : 0)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-brand-blue">Total Amount Payable</span>
                    <span className="text-xl font-bold font-mono text-brand-orange">${calculateLiveTotal()}</span>
                  </div>
                </div>

                {/* Submits form */}
                <button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg shadow-brand-orange/20 transition-all select-none cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Check size={16} />
                  <span>Confirm Reservation Now</span>
                </button>

              </form> 
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECEPTIVE BOARDING PASS VOUCHER GRAPHIC SUCCESS MODAL */}
      <AnimatePresence>
        {showBoardingPass && bookedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBoardingPass(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-xl w-full bg-orange-50 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 border-4 border-brand-orange"
            >
              {/* Confetti celebration backdrop decoration */}
              <div className="absolute right-0 top-0 w-24 h-24 transform -rotate-12 pointer-events-none select-none opacity-20">
                <img src="/assets/input_file_25.png" alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>

              {/* Heading */}
              <div className="text-center space-y-2 mb-8">
                <div className="p-3 bg-brand-orange text-white rounded-full w-fit mx-auto shadow-lg shadow-brand-orange/20 animate-bounce">
                  <Check size={28} />
                </div>
                <h3 className="text-brand-blue text-2xl font-extrabold tracking-tight">Trip Confirmed!</h3>
                <p className="text-xs text-gray-500">Your gorgeous boarding pass has been registered securely.</p>
              </div>

              {/* The high-fidelity flight boarding pass container */}
              <div className="bg-white rounded-2xl border-2 border-dashed border-brand-orange/30 p-6 space-y-6 shadow-sm">
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <img src="/assets/input_file_8.png" className="h-6 object-contain" alt="Logo" referrerPolicy="no-referrer" />
                  <span className="text-xs font-mono font-bold bg-brand-orange/10 text-brand-orange py-1.5 px-3 rounded-full uppercase tracking-widest">
                    Boarding Voucher
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-left">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Tour Package</span>
                    <span className="text-sm font-extrabold text-brand-blue">{bookedDetails.tourTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Confirmation ID</span>
                    <span className="text-sm font-extrabold font-mono text-brand-orange">{bookedDetails.boardingCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Guest Name</span>
                    <span className="text-sm font-extrabold text-brand-blue">{bookedDetails.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Travel Date</span>
                    <span className="text-sm font-extrabold font-mono text-brand-blue">{bookedDetails.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Travelers Count</span>
                    <span className="text-sm font-extrabold text-brand-blue">{bookedDetails.travelers} Pax</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Assigned Seat</span>
                    <span className="text-sm font-extrabold font-mono text-brand-orange">{bookedDetails.seat}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Payment Total</span>
                    <span className="text-xl font-extrabold font-mono text-brand-blue">${bookedDetails.totalPaid}</span>
                  </div>
                  <div className="text-right space-y-1">
                    {bookedDetails.shuttle && (
                      <span className="text-[9px] bg-green-100 text-green-700 py-1 px-2 rounded font-bold uppercase tracking-wider block">Shuttle Reserved</span>
                    )}
                    {bookedDetails.guide && (
                      <span className="text-[9px] bg-blue-100 text-blue-700 py-1 px-2 rounded font-bold uppercase tracking-wider block">Guide Assigned</span>
                    )}
                  </div>
                </div>

                {/* Simulated barcode representation */}
                <div className="flex flex-col items-center justify-center pt-4 border-t border-gray-100 space-y-1 select-none">
                  <div className="flex space-x-1.5 h-10 w-full max-w-[280px] bg-gray-100 p-1.5 border border-gray-100 rounded">
                    {Array.from({ length: 42 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-brand-blue h-full rounded" 
                        style={{ width: `${(i % 3 === 0 ? 5 : i % 2 === 0 ? 2 : 1)}px` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest text-gray-400">{bookedDetails.boardingCode} PASS BOARD v2.0</span>
                </div>

              </div>

              {/* Actions buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowBoardingPass(false)}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow"
                >
                  Done
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC VIDEO LIGHTBOX IFRAME OVERLAY MODAL */}
      <AnimatePresence>
        {lightboxUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxUrl(null)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setLightboxUrl(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-red-500 rounded-full text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <iframe
                title="Tour video preview"
                className="w-full h-full"
                src="https://www.youtube.com/embed/MtCMtC50gwY?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC IMAGE LIGHTBOX PREVIEW OVERLAY MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxUrlImage(null)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-10 p-2"
            >
              <button
                onClick={() => setLightboxUrlImage(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-red-500 rounded-full text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <img
                src={lightboxImage}
                alt="Enlarged Location Preview"
                className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
