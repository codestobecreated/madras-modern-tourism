import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer id="contact" className="bg-brand-blue text-white font-sans relative overflow-hidden pt-20 border-t border-white/5">
      {/* City skyline illustration footer background */}
      <div className="absolute left-0 bottom-0 right-0 h-40 bg-[url('/assets/input_file_43.png')] opacity-10 bg-repeat-x pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
        
        {/* Column 1: App Info Logo */}
        <div className="lg:col-span-4 space-y-6">
          <img 
            src="/assets/input_file_51.png" 
            alt="Travivu white logo" 
            className="h-10 md:h-12 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://themegavias.com/wp/travivu/wp-content/uploads/2024/11/logo-white.png";
            }}
          />
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Book breathtaking tours with verified local hosts. Our customer service is standing by 24/7 to coordinate your ideal leisure or adventure tours.
          </p>
          <div className="flex space-x-3 text-white/70">
            <span className="p-2.5 bg-white/5 hover:bg-brand-orange hover:text-white rounded-full transition-colors cursor-pointer">FB</span>
            <span className="p-2.5 bg-white/5 hover:bg-brand-orange hover:text-white rounded-full transition-colors cursor-pointer">TW</span>
            <span className="p-2.5 bg-white/5 hover:bg-brand-orange hover:text-white rounded-full transition-colors cursor-pointer">IG</span>
            <span className="p-2.5 bg-white/5 hover:bg-brand-orange hover:text-white rounded-full transition-colors cursor-pointer">LI</span>
          </div>
        </div>

        {/* Column 2: Company Navigation List */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h4 className="text-base font-bold tracking-tight uppercase border-l-2 border-brand-orange pl-3">Company</h4>
          <ul className="space-y-2.5 text-sm text-gray-400 font-semibold">
            {["Tours Listed", "Destinations", "Activities", "What we do", "How it works"].map((li, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => onNavigate("tours")}
                  className="hover:text-brand-orange hover:translate-x-1 transition-all text-left"
                >
                  {li}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact details Coordinates */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="text-base font-bold tracking-tight uppercase border-l-2 border-brand-orange pl-3">Contact info</h4>
          <ul className="space-y-3.5 text-sm text-gray-400 font-semibold">
            <li className="flex items-start space-x-3">
              <MapPin size={16} className="text-brand-orange mt-1 flex-shrink-0" />
              <span>6391 Elgin St. Celina, Delaware New York, USA</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-brand-orange flex-shrink-0" />
              <a href="tel:(303)555-0105" className="hover:text-brand-orange transition-colors">
                (303) 555-0105
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-brand-orange flex-shrink-0" />
              <a href="mailto:contact@example.com" className="hover:text-brand-orange transition-colors">
                contact@example.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter newsletter__form shortcode Replicate */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="text-base font-bold tracking-tight uppercase border-l-2 border-brand-orange pl-3 font-sans">Newsletter</h4>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Signup for our latest news, exclusive discounts, & adventure trekking articles.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-brand-orange/45 transition-colors">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="bg-brand-orange hover:bg-brand-orange-hover px-4 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Subscribe Now"
              >
                {subscribed ? <Check size={16} className="animate-bounce" /> : <ArrowRight size={16} />}
              </button>
            </div>
            
            {subscribed && (
              <p className="text-xs text-brand-orange font-semibold animate-fade-in font-sans">
                Successfully subscribed! Keep an eye on your inbox.
              </p>
            )}

            <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-semibold cursor-default">
              <span className="w-3 h-3 rounded-full bg-brand-orange/20 border border-brand-orange/60 flex items-center justify-center flex-shrink-0 text-brand-orange text-[7px]">✓</span>
              <span>I agree to the privacy policy.</span>
            </div>
          </form>
        </div>

      </div>

      {/* Bottom copyright line bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-gray-500 relative z-10 font-sans">
        <p>© 2025 Copyrights by Travivu & GaviasTheme. All Rights Reserved</p>
      </div>
    </footer>
  );
}
