import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, CircleDot } from 'lucide-react';
import LeadForm from '../components/LeadForm';

interface ServiceContent {
  title: string;
  metaTitle: string;
  metaDesc: string;
  heroImage: string;
  tagline: string;
  details: string;
  bullets: string[];
  process: string[];
  faq: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceContent> = {
  'land-clearing': {
    title: 'Land Clearing & Stump Grinding',
    metaTitle: 'Land Clearing & Stump Grinding Services Munford AL',
    metaDesc: 'Clear dense trees, brush, and stumps with Weldon Excavating. High-efficiency site clearing & stump grinding in Munford, AL. Get your free quote!',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Transforming thick, overgrown brush into premium building-ready lots.',
    details: 'Our forestry clearing and land development services remove all unwanted timber, underbrush, and stubborn roots from your site. We understand local soil conditions and forestry growth in Alabama, allowing us to perform clean, comprehensive clearing that prepares your property for any building foundation, pasture, or yard.',
    bullets: [
      'Dense tree and underbrush clearing',
      'Forestry mulching and root raking',
      'Specialized stump grinding below grade',
      'Grappling and wood debris disposal',
      'Fire breaks and property boundary clearing'
    ],
    process: [
      'Initial Onsite Consultation to map boundary markers and review tree preservation.',
      'Clearing and harvesting timber using heavy machinery.',
      'Forestry mulching and grinding of root networks.',
      'Root raking and soil preparation for sub-grade stability.'
    ],
    faq: [
      {
        q: 'Do you remove the logs or mulch them on site?',
        a: 'We can do both! We offer forestry mulching which leaves a rich layer of organic material to prevent soil erosion. Alternatively, we use our heavy grapple attachments to haul all wood debris off-site.'
      },
      {
        q: 'Is stump grinding included in land clearing?',
        a: 'Yes, we provide stump grinding services. We grind stumps deep below grade level so you can build, landscape, or mow over the area without obstruction.'
      }
    ]
  },
  'grading-prep': {
    title: 'Grading & Site Preparation',
    metaTitle: 'Grading, Site Prep & Driveway Installation Munford AL',
    metaDesc: 'Professional grading, foundation prep, and driveway installation in Munford, AL. Ensure your site is level and strong. Call today!',
    heroImage: '/equipment-hero.png',
    tagline: 'Ensuring your construction is built on a stable, perfectly level foundation.',
    details: 'Proper grading is the absolute foundation of any long-lasting structure. Weldon Excavating LLC shapes, compacts, and levels the terrain. We ensure proper water runoff slopes, preventing pooling and foundation damage. We also specialize in gravel driveway installation, reshaping old driveways, and laying compacted sub-base for concrete.',
    bullets: [
      'Foundation grading and building site preparation',
      'Gravel driveway grading, crowning, and aggregate laying',
      'Compacting dirt and aggregate sub-bases',
      'Erosion control and drainage ditch shaping',
      'Culvert installation and replacement'
    ],
    process: [
      'Site survey to analyze natural drainage patterns and slope levels.',
      'Excavation and sub-grade preparation.',
      'Spreading soil and aggregate base materials.',
      'Final compaction and laser grading validation for drainage.'
    ],
    faq: [
      {
        q: 'Why is grading important for driveways?',
        a: 'Without grading and crowning, gravel driveways quickly develop potholes and washouts due to standing water. Grading directs rainwater away, extending the driveway lifespan.'
      },
      {
        q: 'Do you install driveway culverts?',
        a: 'Yes. We evaluate the water flow along your property and install correctly sized metal or plastic culverts to keep your driveway stable and clear of blockages.'
      }
    ]
  },
  'demolition': {
    title: 'Demolition & Debris Removal',
    metaTitle: 'Demolition Services & Contractors Munford AL',
    metaDesc: 'Safe, professional residential and commercial demolition services in Munford, AL. Debris removal included. Call 256-223-7541 for a quote!',
    heroImage: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Safe, efficient structure teardowns with total debris grapple cleanup.',
    details: 'Tearing down old structures requires heavy equipment and safety protocols. Weldon Excavating handles residential and light commercial demolition projects. We demolish unsafe barns, dilapidated houses, outbuildings, concrete slabs, and mobile homes, followed by full hauling and site restoration.',
    bullets: [
      'dilapidated house and barn demolition',
      'Mobile home removal and cleanup',
      'Concrete break-up and removal (patios, slabs)',
      'Grappling and heavy debris loading',
      'Full site cleanup and restoration grading'
    ],
    process: [
      'Obtaining necessary safety permits and verifying utility disconnections.',
      'Structured demolition using excavator/skid steer attachments.',
      'Grappling debris and sorting materials for recycling/disposal.',
      'Backfilling cellar holes or foundation gaps and final grading.'
    ],
    faq: [
      {
        q: 'Do you handle the permit process for demolition?',
        a: 'We guide homeowners through the required notifications and local Munford/Talladega county permit applications to ensure compliance.'
      },
      {
        q: 'What do you do with concrete foundations after demolition?',
        a: 'We break up the concrete using heavy breakers, load it with our grapple buckets, haul it away, and then grade the site flat with fresh clean fill dirt.'
      }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = serviceId ? servicesData[serviceId] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.metaTitle} | Weldon Excavating LLC`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', service.metaDesc);
      }
    }
  }, [service]);

  if (!service) {
    return (
      <div className="py-32 px-4 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-4">Service Not Found</h2>
        <p className="text-gray-400 mb-8">The service page you are looking for does not exist or has been relocated.</p>
        <Link to="/services" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center bg-black overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="object-cover w-full h-full opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-brand-yellow font-bold text-xs uppercase tracking-wider mb-4 hover:translate-x-[-2px] transition duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-3">
            {service.title}
          </h1>
          <p className="text-gray-300 max-w-2xl font-semibold text-sm sm:text-base leading-relaxed">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Details & Bullet Points */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Columns - Content */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-brand-border/40 pb-2">
              Overview
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {service.details}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-brand-border/40 pb-2">
              Capabilities Included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300 font-semibold">
              {service.bullets.map(b => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Timeline */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-brand-border/40 pb-2">
              Our Process
            </h2>
            <div className="flex flex-col gap-6 pl-4 border-l-2 border-brand-border relative">
              {service.process.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[25px] top-0.5 p-1 bg-brand-black border-2 border-brand-yellow rounded-full text-brand-yellow">
                    <CircleDot className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 uppercase tracking-wide">
                    Step {idx + 1}: {step.split(' ')[0]} {step.split(' ')[1] || ''}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          {service.faq && service.faq.length > 0 && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-brand-border/40 pb-2">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                {service.faq.map((item, idx) => (
                  <div key={idx} className="p-5 bg-brand-charcoal/50 border border-brand-border rounded-lg">
                    <h3 className="font-bold text-white mb-2 text-base flex items-start gap-2">
                      <span className="text-brand-yellow font-black">Q:</span>
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Columns - Form Capture */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-24">
          <LeadForm initialService={service.title} />

          {/* Direct call card */}
          <div className="glass-card border-brand-yellow/30 bg-brand-black/60 p-6 text-center">
            <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-1">Immediate Help</span>
            <h3 className="text-lg font-bold text-white mb-3">Speak With Matt Directly</h3>
            <a
              href="tel:+12562237541"
              className="btn-secondary py-3 w-full justify-center text-sm font-extrabold"
            >
              <Phone className="w-4 h-4" /> (256) 223-7541
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
