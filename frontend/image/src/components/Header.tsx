import React, { useState } from "react";
import { Phone, Mail, MapPin, User, Search, ShoppingBag, Menu, X, ArrowRight, Heart } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
  onActionClick: () => void;
  favoritesCount: number;
}

export default function Header({ onSearch, onNavigate, onActionClick, favoritesCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Tours", id: "tours" },
    { label: "Destinations", id: "destinations" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <header className="relative w-full z-50 bg-white font-sans">
      {/* Top Banner (hidden on mobile) */}
      <div className="bg-brand-blue text-white/90 text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin size={13} className="text-brand-orange" />
            <span className="hidden sm:inline">30 Road Fratton, Australia</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={13} className="text-brand-orange" />
            <a href="mailto:contact@travivu.com" className="hover:text-brand-orange transition-colors">
              contact@travivu.com
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 hover:text-brand-orange transition-all cursor-pointer">
            <User size={13} className="text-brand-orange" />
            <span>Sign in / Register</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex space-x-3 text-white/70">
            <a href="#" className="hover:text-brand-orange transition-colors">FB</a>
            <a href="#" className="hover:text-brand-orange transition-colors">TW</a>
            <a href="#" className="hover:text-brand-orange transition-colors font-semibold text-brand-orange">IG</a>
            <a href="#" className="hover:text-brand-orange transition-colors">PN</a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate("hero")} 
          className="flex items-center space-x-2 cursor-pointer group"
          id="site-logo"
        >
          <img 
            src="/assets/input_file_8.png" 
            alt="Travivu Logo" 
            className="h-10 md:h-12 object-contain group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback if for some reason logo doesn't resolve instantly
              e.currentTarget.src = "https://themegavias.com/wp/travivu/wp-content/uploads/2024/11/logo-white.png";
              e.currentTarget.className = "h-10 md:h-12 object-contain bg-brand-blue p-2 rounded";
            }}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-brand-blue">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="hover:text-brand-orange transition-colors cursor-pointer relative py-2 group text-base"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Desktop widgets & booking */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Call widget */}
          <div className="hidden xl:flex items-center space-x-2">
            <div className="p-2.5 bg-brand-orange/10 rounded-full text-brand-orange">
              <Phone size={18} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Call Anytime</p>
              <a href="tel:(69)868168" className="text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors">
                (69)-868 168
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search toggler */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2 text-brand-blue hover:text-brand-orange transition-colors relative cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Favourites tracker */}
            <button 
              onClick={() => onNavigate("tours")}
              className="p-2 text-brand-blue hover:text-brand-orange transition-colors relative cursor-pointer"
            >
              <Heart size={20} className={favoritesCount > 0 ? "fill-red-500 text-red-500" : ""} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setCartOpen(!cartOpen)} 
              className="p-2 text-brand-blue hover:text-brand-orange transition-colors relative cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* CTA action Button */}
            <button
              onClick={onActionClick}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs md:text-sm font-bold uppercase tracking-wider py-2.5 px-5 rounded-full shadow-lg shadow-brand-orange/20 transition-all select-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              id="header-booking-btn"
            >
              Start Booking
            </button>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center space-x-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="p-2 text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Global Interactive Search Dropdown overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-blue text-white p-4 shadow-xl border-t border-white/10 z-50 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center bg-white/10 rounded-full border border-white/20 px-4 py-2">
            <Search className="text-gray-300 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search adventures, cities or packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-300 focus:outline-none"
              autoFocus
            />
            <button 
              type="submit" 
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-lg font-bold text-brand-blue">Your Shopping Cart</h3>
                <button onClick={() => setCartOpen(false)} className="p-1 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <ShoppingBag size={48} className="mb-4 text-gray-300" />
                <p className="text-sm font-semibold">No products in the cart.</p>
                <p className="text-xs text-gray-400 text-center mt-1">Start adding your favorite tours now!</p>
              </div>
            </div>
            <button 
              onClick={() => { setCartOpen(false); onNavigate("tours"); }}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 rounded-full font-bold transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Tours</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-blue text-white z-40 flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <img src="/assets/input_file_51.png" alt="Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/80 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-lg font-bold text-left ml-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="hover:text-brand-orange text-left transition-colors cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Phone size={16} className="text-brand-orange" />
              <span>(69)-868 168</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Mail size={16} className="text-brand-orange" />
              <span>contact@travivu.com</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onActionClick();
              }}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 rounded-full font-bold select-none cursor-pointer"
            >
              Start Booking
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
