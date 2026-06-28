import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, Award, Construction, ShieldAlert } from 'lucide-react';

export default function Services() {
  useEffect(() => {
    document.title = "Our Excavating Services | Weldon Excavating LLC Munford AL";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive site services in Munford, AL: land clearing, grading, site prep, driveway installation, stump grinding, demolition, and grappling.');
    }
  }, []);

  const coreServices = [
    {
      id: 'land-clearing',
      title: 'Land Clearing & Stump Grinding',
      description: 'Clear trees, brush, and root systems to turn raw land into clean, usable property. Includes heavy brush mowing, stump grinding, and root raking.',
      icon: <Award className="w-8 h-8 text-brand-yellow" />,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      keywords: ['Stump grinding', 'Forestry mulching', 'Brush removal']
    },
    {
      id: 'grading-prep',
      title: 'Grading & Site Preparation',
      description: 'Establish stable, level grades and correct drainage before pouring concrete or laying asphalt. Includes foundation site preparation and driveways.',
      icon: <Construction className="w-8 h-8 text-brand-yellow" />,
      image: '/equipment-hero.png',
      keywords: ['Site leveling', 'Compacted sub-base', 'Drainage slopes']
    },
    {
      id: 'demolition',
      title: 'Demolition & Debris Removal',
      description: 'Demolish old structures, garages, or mobile homes safely. We handle the permit support, complete tear down, and debris haul-off via grapple.',
      icon: <Hammer className="w-8 h-8 text-brand-yellow" />,
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80',
      keywords: ['House demolition', 'Concrete breaking', 'Grapple cleanup']
    }
  ];

  const secondaryServices = [
    { name: 'Stump Grinding', desc: 'Removing stubborn tree stumps below grade to make mowing or building easy.' },
    { name: 'Gravel Driveways', desc: 'Grading new driveways, installing culverts, and laying aggregate/crushed stone.' },
    { name: 'Grappling & Debris', desc: 'Picking up logs, concrete, construction waste, and storm damage debris.' },
    { name: 'Site Clearing', desc: 'Selective tree thinning and clearing of underbrush for fire breaks.' }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-charcoal py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
            Services Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wide mb-4">
            Professional Site Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            We deliver high-efficiency site solutions using rugged machinery and precise grading practices.
          </p>
        </div>
      </section>

      {/* Core Services List */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {coreServices.map((service, idx) => (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Block */}
              <div className="w-full lg:w-1/2 group">
                <div className="glass-card border-brand-border p-3 bg-brand-charcoal relative overflow-hidden">
                  <div className="rounded overflow-hidden border border-brand-border/60 h-80 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="w-full lg:w-1/2 flex flex-col gap-5">
                <div className="p-3 bg-brand-charcoal border border-brand-border rounded-lg text-brand-yellow w-fit">
                  {service.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                  {service.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {service.keywords.map(kw => (
                    <span key={kw} className="px-2.5 py-1 bg-brand-charcoal text-brand-yellow text-xs font-bold border border-brand-border/80 rounded">
                      #{kw}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-brand-border/40 mt-2 flex gap-4">
                  <Link to={`/services/${service.id}`} className="btn-primary py-3 px-6 text-sm">
                    View Service Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialty Services Grid */}
      <section className="bg-brand-charcoal/30 border-y border-brand-border py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
              Additional Services
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-wide">
              Specialty Earthworks & Utility Support
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryServices.map((item) => (
              <div key={item.name} className="glass-card border-brand-border/60 hover:border-brand-yellow/20 p-6 flex flex-col justify-between transition duration-300">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
                <Link to="/contact" className="text-brand-yellow font-bold text-xs uppercase tracking-wider mt-4 block hover:translate-x-0.5 transition duration-300">
                  Request Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Note */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <div className="glass-card border-brand-yellow/30 bg-brand-charcoal flex flex-col items-center gap-4 py-12 px-6">
          <ShieldAlert className="w-12 h-12 text-brand-yellow" />
          <h2 className="text-2xl font-black text-white uppercase">Need Custom Site Work?</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Every piece of land in Munford, Anniston, and Oxford has unique grading challenges. We provide custom quotes tailored to your soil structure, slope requirements, and site plan.
          </p>
          <Link to="/contact" className="btn-primary py-3 px-8 mt-2">
            Get Onsite Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
