import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Facebook } from 'lucide-react';
import LeadForm from '../components/LeadForm';

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Weldon Excavating LLC | Get a Free Site Estimate";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Weldon Excavating LLC in Munford, AL. Call 256-223-7541, email weldonmatt@yahoo.com, or fill out our quick lead form for a free quote!');
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-charcoal py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
            Get Onsite Estimate
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wide mb-4">
            Contact Us Today
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Ready to schedule a clearing, grading, or demolition consultation? Reach out via phone, email, or our quote form.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info & Map */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-brand-border/40 pb-2">
              Business Contacts
            </h2>
            <ul className="flex flex-col gap-6 text-sm text-gray-400">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-charcoal border border-brand-border rounded-lg text-brand-yellow shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white uppercase tracking-wide text-xs">Office Address</span>
                  <p className="mt-1">1485 Stockdale Rd, Munford, AL 36268</p>
                  <p className="text-gray-500 text-xs mt-0.5">Serving Munford, Anniston, Oxford, Talladega & surrounding areas.</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-charcoal border border-brand-border rounded-lg text-brand-yellow shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white uppercase tracking-wide text-xs">Phone (Call/Text)</span>
                  <a href="tel:+12562237541" className="block text-white hover:text-brand-yellow font-black text-base mt-1 transition duration-300">
                    +1 (256) 223-7541
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-charcoal border border-brand-border rounded-lg text-brand-yellow shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white uppercase tracking-wide text-xs">Email Address</span>
                  <a href="mailto:weldonmatt@yahoo.com" className="block text-white hover:text-brand-yellow text-base font-semibold mt-1 transition duration-300">
                    weldonmatt@yahoo.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-charcoal border border-brand-border rounded-lg text-brand-yellow shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white uppercase tracking-wide text-xs">Service Hours</span>
                  <p className="mt-1 font-semibold text-gray-300">Monday - Saturday: 7:00 AM - 6:00 PM</p>
                  <p className="text-gray-500 text-xs mt-0.5">Emergency storm clearance support available on request.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Embedded Google Map */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-brand-border/40 pb-2">
              Our Service Area
            </h2>
            <div className="w-full h-80 rounded-lg overflow-hidden border border-brand-border/60 shadow-xl bg-brand-charcoal">
              <iframe
                title="Weldon Excavating Munford Service Area Map"
                src="https://maps.google.com/maps?q=1485%20Stockdale%20Rd,%20Munford,%20AL,%2036268&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
              <span>Full residential and commercial site services in Talladega County, AL.</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
