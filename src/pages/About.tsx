import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HardHat, Construction, Phone, ArrowRight } from 'lucide-react';

export default function About() {
  // Set SEO page titles & metadata dynamically
  useEffect(() => {
    document.title = "About Weldon Excavating LLC | Excavation Contractor Munford AL";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Weldon Excavating LLC, a family-owned excavation contractor in Munford, AL. Offering professional land clearing, grading, site prep, and demolition.');
    }
  }, []);

  const values = [
    {
      title: 'Reliable Expertise',
      description: 'We pride ourselves on turning up on time and doing what we promised. Reliability is the cornerstone of how Matt Weldon runs the business.',
      icon: <HardHat className="w-8 h-8 text-brand-yellow" />
    },
    {
      title: 'Top-Tier Equipment',
      description: 'We operate professional-grade skid steers, compact track loaders, and root rakes to ensure the job is done quickly and correctly.',
      icon: <Construction className="w-8 h-8 text-brand-yellow" />
    },
    {
      title: 'Licensed & Fully Insured',
      description: 'Your property is safe with us. We carry full general liability insurance to ensure complete peace of mind on every residential and commercial lot.',
      icon: <ShieldCheck className="w-8 h-8 text-brand-yellow" />
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-brand-charcoal py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wide mb-4">
            About Weldon Excavating LLC
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A dedicated, family-owned excavation and land clearing contractor serving Munford, AL, and the surrounding areas.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* About Graphic */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-brand-yellow rounded-lg filter blur-lg opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <div className="glass-card border-brand-border p-3 bg-brand-charcoal relative z-10">
            <div className="rounded overflow-hidden border border-brand-border/60">
              <img
                src="/equipment-hero.png"
                alt="Weldon Excavating Machinery"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500 font-bold uppercase">Operated by Owner Matt Weldon</span>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            Your Site. Our Strength.
          </h2>
          
          <p className="text-gray-400 leading-relaxed">
            Weldon Excavating LLC was established to fill a critical local need: reliable, high-quality, and transparent excavating and site preparation work in Talladega County and the wider Alabama region. Led by Matt Weldon, we specialize in transforming raw land into usable, build-ready properties.
          </p>

          <p className="text-gray-400 leading-relaxed">
            We focus on a comprehensive suite of site solutions. Whether you are a homeowner needing a gravel driveway installed and stumps ground, a builder prepping a foundation grade, or a commercial developer clearing acres of dense underbrush, we bring the right machines and the precise execution required to get the job done right the first time.
          </p>

          <div className="border-t border-brand-border/40 pt-6">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Capabilities Matrix:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-brand-charcoal/50 rounded border border-brand-border/40">
                <span className="block font-bold text-brand-yellow mb-1">Residential</span>
                <p className="text-xs text-gray-500">Driveways, landscaping grading, house site prep, stump grinding.</p>
              </div>
              <div className="p-3 bg-brand-charcoal/50 rounded border border-brand-border/40">
                <span className="block font-bold text-brand-yellow mb-1">Commercial</span>
                <p className="text-xs text-gray-500">Foundation grading, parking lot prep, commercial demolition.</p>
              </div>
              <div className="p-3 bg-brand-charcoal/50 rounded border border-brand-border/40">
                <span className="block font-bold text-brand-yellow mb-1">Industrial</span>
                <p className="text-xs text-gray-500">Debris grapple removal, heavy clearing, structural teardowns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-charcoal/30 border-y border-brand-border py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
              Our Values
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-wide">
              How We Do Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.title} className="glass-card border-brand-border/60 hover:border-brand-yellow/20 flex flex-col items-center text-center p-8 group transition duration-300">
                <div className="p-4 bg-brand-black/60 rounded-full border border-brand-border/60 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-yellow transition duration-300">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-6">
          Ready to Work With a <span className="yellow-gradient-text">Reliable</span> Contractor?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Contact Matt Weldon today to discuss your excavating, clearing, or grading project. We offer onsite consultations and detailed, free estimates.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact" className="btn-primary py-3.5 px-8">
            Get a Free Estimate <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+12562237541" className="btn-secondary py-3.5 px-8">
            <Phone className="w-4 h-4" /> Call: (256) 223-7541
          </a>
        </div>
      </section>
    </div>
  );
}
