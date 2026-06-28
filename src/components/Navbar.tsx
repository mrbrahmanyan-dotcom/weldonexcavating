import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onQuoteClick?: () => void;
}

export default function Navbar({ onQuoteClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scrolled background effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner (Desktop Only) */}
      <div className="bg-brand-black border-b border-brand-border text-gray-400 py-2 px-4 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📍 Serving Munford, AL and surrounding residential & commercial areas</span>
          <div className="flex gap-4 items-center">
            <a href="tel:+12562237541" className="hover:text-brand-yellow transition flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5" /> +1 256-223-7541
            </a>
            <span>•</span>
            <span>Licensed & Fully Insured</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-brand-black/95 backdrop-blur-md shadow-lg border-b border-brand-border py-3'
            : 'bg-brand-black/80 backdrop-blur-sm border-b border-brand-border/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded overflow-hidden border border-brand-border bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105 duration-300">
              <img src="/logo.jpg" alt="Weldon Excavating LLC" className="object-contain w-full h-full" />
            </div>
            <div>
              <span className="block font-display text-lg tracking-wider text-white font-extrabold group-hover:text-brand-yellow transition duration-300">
                WELDON EXCAVATING
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-brand-yellow font-bold leading-none">
                Your Site. Our Strength.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold tracking-wide text-sm transition duration-300 hover:text-brand-yellow ${
                  location.pathname === link.path ? 'text-brand-yellow font-bold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sticky Header CTAs (Phone + Get Quote) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+12562237541"
              className="text-white hover:text-brand-yellow font-bold transition flex items-center gap-2 text-sm"
            >
              <span className="p-2 bg-brand-charcoal border border-brand-border rounded-full text-brand-yellow">
                <Phone className="w-4 h-4" />
              </span>
              <span>(256) 223-7541</span>
            </a>
            
            {onQuoteClick ? (
              <button onClick={onQuoteClick} className="btn-primary py-2 px-4 text-sm">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link to="/contact" className="btn-primary py-2 px-4 text-sm">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6 text-brand-yellow" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-black border-b border-brand-border shadow-2xl py-4 px-6 slide-down">
            <nav className="flex flex-col gap-4 mb-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-bold tracking-wide py-2 border-b border-brand-border/40 text-base ${
                    location.pathname === link.path ? 'text-brand-yellow' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+12562237541"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-charcoal border border-brand-border rounded-md text-brand-yellow font-extrabold"
              >
                <Phone className="w-4 h-4" /> Call: (256) 223-7541
              </a>
              <Link to="/contact" className="btn-primary w-full py-3">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Floating Sticky Mobile Quick Action Bar (Bottom of screen) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-black/95 backdrop-blur-md border-t border-brand-border py-2.5 px-4 shadow-xl flex gap-3">
        <a
          href="tel:+12562237541"
          className="flex-1 bg-brand-charcoal hover:bg-brand-slate border border-brand-border text-brand-yellow font-extrabold py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-300"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <Link
          to="/contact"
          className="flex-1 bg-brand-yellow hover:bg-brand-yellowDark text-brand-black font-extrabold py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-300 shadow-brand"
        >
          Get Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
