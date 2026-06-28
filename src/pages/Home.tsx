import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, Award, HardHat, CheckCircle2, ChevronRight } from 'lucide-react';
import LeadForm from '../components/LeadForm';

export default function Home() {
  const quoteFormRef = useRef<HTMLDivElement>(null);

  const scrollToQuoteForm = () => {
    if (quoteFormRef.current) {
      quoteFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coreServices = [
    {
      id: 'land-clearing',
      title: 'Land Clearing & Stump Grinding',
      description: 'Clear trees, thick underbrush, and stumps to prepare your land for building or landscaping. We utilize heavy forestry mulchers and root rakes.',
      icon: <Award className="w-8 h-8 text-brand-yellow" />,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'grading-prep',
      title: 'Grading & Site Preparation',
      description: 'Establish correct slopes and drainage for foundations, driveways, or landscapes. We shape and compact soil to ensure absolute stability.',
      icon: <HardHat className="w-8 h-8 text-brand-yellow" />,
      image: '/equipment-hero.png'
    },
    {
      id: 'demolition',
      title: 'Demolition & Debris Removal',
      description: 'Safe tearing down of residential and commercial structures. Full clean up, stump grinding, and grappling debris removal included.',
      icon: <ShieldCheck className="w-8 h-8 text-brand-yellow" />,
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden pt-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/equipment-hero.png"
            alt="Weldon Excavating Equipment"
            className="object-cover w-full h-full opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
          <div className="max-w-3xl">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              🚧 Professional & Reliable Local Contractor
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase mb-6">
              YOUR SITE.<br />
              <span className="yellow-gradient-text">OUR STRENGTH.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-medium">
              Weldon Excavating LLC provides premier excavation, land clearing, grading, site prep, and demolition services. Serving Munford, AL, and surrounding communities with heavy equipment expertise you can count on.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToQuoteForm}
                className="btn-primary py-4 px-8 text-base font-extrabold"
              >
                Request A Free Quote <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+12562237541"
                className="btn-secondary py-4 px-8 text-base font-extrabold"
              >
                <Phone className="w-5 h-5" /> Call (256) 223-7541
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="bg-brand-charcoal border-y border-brand-border py-8 px-4 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-brand-yellow font-black text-2xl sm:text-3xl block">100%</span>
            <span className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">Licensed & Insured</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-brand-border/60">
            <span className="text-brand-yellow font-black text-2xl sm:text-3xl block">FREE</span>
            <span className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">Estimates & Site Visits</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-brand-border/60">
            <span className="text-brand-yellow font-black text-2xl sm:text-3xl block">LOCAL</span>
            <span className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">Munford, AL Native</span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-brand-border/60">
            <span className="text-brand-yellow font-black text-2xl sm:text-3xl block">5-STAR</span>
            <span className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">Reliable Services</span>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-yellow font-black text-sm uppercase tracking-widest block mb-2">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-4 tracking-wide">
            Our Core Excavating Services
          </h2>
          <p className="text-gray-400">
            We operate top-tier equipment (skid steers, excavators, forestry mulchers) to handle residential site prep, commercial grading, land clearing, driveways, and debris removal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="glass-card hover:border-brand-yellow/30 group flex flex-col justify-between h-full transition duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow to-brand-yellowDark opacity-0 group-hover:opacity-100 transition duration-300"></div>
              
              <div>
                {/* Service Card Image */}
                <div className="h-48 w-full overflow-hidden rounded mb-6 border border-brand-border/40 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 p-2 bg-brand-black/80 rounded-md border border-brand-border/60">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <Link
                to={`/services/${service.id}`}
                className="text-brand-yellow font-bold text-sm tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition duration-300"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-secondary inline-flex py-3 px-6 text-sm">
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Before / After Showcase Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-charcoal/40 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-yellow font-black text-sm uppercase tracking-widest block mb-2">
              Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-6 tracking-wide">
              Before & After Transformations
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our professional site clearing and grading transforms dense, unusable land into perfect, construction-ready surfaces. View our catalog of stump grinding, debris grappling, and foundation grading.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-gray-300 font-semibold mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                <span>Heavy underbrush completely mulched and cleared</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                <span>Root raking and stump grinding to sub-grade level</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                <span>Laser-precise finish grading for correct water run-off</span>
              </li>
            </ul>
            <Link to="/gallery" className="btn-secondary py-3 px-6 text-sm inline-flex">
              View Project Gallery
            </Link>
          </div>

          {/* Simple Before / After Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card border-brand-border/40 p-3 bg-brand-charcoal relative overflow-hidden group">
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600/90 text-white font-bold text-xs uppercase rounded">
                Before
              </span>
              <div className="h-64 w-full rounded overflow-hidden border border-brand-border/40">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
                  alt="Clearing project before"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase mt-2.5 text-center">Unmanaged Dense Forest Lot</p>
            </div>

            <div className="glass-card border-brand-border/40 p-3 bg-brand-charcoal relative overflow-hidden group">
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-600/90 text-white font-bold text-xs uppercase rounded">
                After
              </span>
              <div className="h-64 w-full rounded overflow-hidden border border-brand-border/40">
                <img
                  src="/equipment-hero.png"
                  alt="Clearing project after"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase mt-2.5 text-center">Fully Cleared & Graded Site</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form & Contact Details Section */}
      <section ref={quoteFormRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-brand-yellow font-black text-sm uppercase tracking-widest block mb-2">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wide">
                Start Your Site Build Today
              </h2>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Have questions about your residential lot, driveway layout, or demolition project? Send Matt Weldon a message directly or call for an instant phone consultation.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <a
                href="tel:+12562237541"
                className="glass-card flex items-center gap-4 hover:border-brand-yellow/30 transition duration-300 p-4"
              >
                <div className="p-3 bg-brand-yellow/10 rounded-full border border-brand-yellow/20 text-brand-yellow">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Call the Owner</span>
                  <span className="block text-lg font-black text-white hover:text-brand-yellow transition duration-300">(256) 223-7541</span>
                </div>
              </a>

              <a
                href="mailto:weldonmatt@yahoo.com"
                className="glass-card flex items-center gap-4 hover:border-brand-yellow/30 transition duration-300 p-4"
              >
                <div className="p-3 bg-brand-yellow/10 rounded-full border border-brand-yellow/20 text-brand-yellow">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Send An Email</span>
                  <span className="block text-lg font-black text-white hover:text-brand-yellow transition duration-300">weldonmatt@yahoo.com</span>
                </div>
              </a>
            </div>

            <div className="glass-card border-brand-border/40 p-4 mt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Business Location</h4>
              <p className="text-sm text-gray-400 mb-1">📍 1485 Stockdale Rd, Munford, AL 36268</p>
              <p className="text-sm text-gray-500">Serving Munford, Anniston, Oxford, Talladega, and surrounding areas.</p>
            </div>
          </div>

          {/* Contact Lead Form */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
