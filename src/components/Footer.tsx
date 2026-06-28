import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // JSON-LD Schema markup object
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ExcavationBusiness",
    "name": "Weldon Excavating LLC",
    "image": "https://weldonexcavating.com/logo.jpg",
    "@id": "https://weldonexcavating.com/#business",
    "url": "https://weldonexcavating.com",
    "telephone": "+12562237541",
    "email": "weldonmatt@yahoo.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1485 Stockdale Rd",
      "addressLocality": "Munford",
      "addressRegion": "AL",
      "postalCode": "36268",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5332,
      "longitude": -85.9525
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Munford" },
      { "@type": "AdministrativeArea", "name": "Talladega County" },
      { "@type": "AdministrativeArea", "name": "Anniston" },
      { "@type": "AdministrativeArea", "name": "Oxford" }
    ],
    "slogan": "Your Site. Our Strength.",
    "sameAs": [
      "https://www.facebook.com/people/Weldon-Excavating-LLC/61556214349918/"
    ]
  };

  return (
    <footer className="bg-brand-black border-t border-brand-border text-gray-400 pt-16 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded overflow-hidden border border-brand-border bg-white flex items-center justify-center p-0.5">
              <img src="/logo.jpg" alt="Weldon Excavating" className="object-contain w-full h-full" />
            </div>
            <div>
              <span className="block font-display text-white font-extrabold tracking-wider leading-none">
                WELDON EXCAVATING
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-brand-yellow font-bold mt-1">
                Your Site. Our Strength.
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mt-2">
            Reliable site prep, land clearing, demolition, and driveways. Serving Munford, AL, and surrounding communities with heavy-equipment excellence.
          </p>
          <div className="flex gap-3 items-center mt-3">
            <a
              href="https://www.facebook.com/people/Weldon-Excavating-LLC/61556214349918/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-brand-charcoal hover:bg-brand-yellow text-gray-400 hover:text-brand-black transition duration-300"
              aria-label="Facebook Page"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-base font-bold uppercase tracking-wider border-b border-brand-border/40 pb-2">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-yellow transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-yellow transition duration-300">About Us</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-yellow transition duration-300">Our Services</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-brand-yellow transition duration-300">Projects Portfolio</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-yellow transition duration-300">Contact Us</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-brand-yellow/60 transition duration-300 text-gray-600 text-xs">Admin Login</Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-base font-bold uppercase tracking-wider border-b border-brand-border/40 pb-2">
            Services
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/services/land-clearing" className="hover:text-brand-yellow transition duration-300">Land Clearing & Stump Grinding</Link>
            </li>
            <li>
              <Link to="/services/grading-prep" className="hover:text-brand-yellow transition duration-300">Grading & Site Preparation</Link>
            </li>
            <li>
              <Link to="/services/demolition" className="hover:text-brand-yellow transition duration-300">Demolition & Debris Removal</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-yellow transition duration-300">Stump Grinding & Grappling</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-yellow transition duration-300">Driveway & Gravel Installation</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info (NAP) */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-base font-bold uppercase tracking-wider border-b border-brand-border/40 pb-2">
            Business Info
          </h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white leading-tight">Weldon Excavating LLC</span>
                <span className="block text-gray-500 mt-1">1485 Stockdale Rd, Munford, AL 36268</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-yellow shrink-0" />
              <a href="tel:+12562237541" className="hover:text-brand-yellow transition duration-300 font-semibold text-white">
                +1 (256) 223-7541
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-yellow shrink-0" />
              <a href="mailto:weldonmatt@yahoo.com" className="hover:text-brand-yellow transition duration-300 text-gray-400">
                weldonmatt@yahoo.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-brand-yellow text-xs font-bold uppercase">
              <ShieldCheck className="w-5 h-5 text-brand-yellow shrink-0" />
              <span>Licensed & Fully Insured</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {currentYear} Weldon Excavating LLC. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> in Munford, Alabama
        </p>
      </div>
    </footer>
  );
}
