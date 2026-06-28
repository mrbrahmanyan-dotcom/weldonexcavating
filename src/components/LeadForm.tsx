import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Send, CheckCircle, ShieldAlert } from 'lucide-react';

interface LeadFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

export default function LeadForm({ initialService = '', onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: initialService,
    message: ''
  });

  const servicesList = [
    'Excavation',
    'Land Clearing',
    'Grading & Site Prep',
    'Stump Grinding',
    'Demolition',
    'Grappling & Debris Removal',
    'Driveway & Gravel Installation',
    'Landscaping & Grading',
    'Other Service'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.phone || !formData.address || !formData.service) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      // 1. Submit lead details to Supabase (or localStorage in mock mode)
      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          service: formData.service,
          message: formData.message
        });

      if (error) throw error;

      // 2. Simulate Real-time SMS/Email notification trigger (or client console simulation)
      console.log('Real-Time Admin Alert Sent to weldonmatt@yahoo.com and 256-223-7541:', {
        subject: `New Lead - ${formData.service} from ${formData.name}`,
        body: `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nService: ${formData.service}\nMessage: ${formData.message}`
      });

      toast.success('Quote request submitted successfully!');
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error submitting quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card text-center py-12 px-6 flex flex-col items-center justify-center border-brand-yellow/30 bg-brand-charcoal/90">
        <CheckCircle className="w-16 h-16 text-brand-yellow mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-white mb-2">Quote Request Received!</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Thank you, <span className="text-white font-bold">{formData.name}</span>. Matt Weldon will review your details and contact you at <span className="text-brand-yellow font-bold">{formData.phone}</span> shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              address: '',
              service: initialService,
              message: ''
            });
          }}
          className="btn-secondary py-2.5 px-6 text-sm"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card border-brand-border/80 bg-brand-charcoal/90 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-yellow"></div>
      
      <h3 className="text-2xl font-black text-white mb-2 tracking-wide uppercase">
        Get A Free Estimate
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Fill out the form below. We will review your site plan and get back to you with a free quote within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Full Name <span className="text-brand-yellow">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="glass-input"
          />
        </div>

        {/* Contact Info Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Phone Number <span className="text-brand-yellow">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(256) 223-7541"
              className="glass-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="glass-input"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Property Address / City <span className="text-brand-yellow">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Munford, AL"
            className="glass-input"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Service Needed <span className="text-brand-yellow">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="glass-input cursor-pointer"
          >
            <option value="" disabled>-- Select a Service --</option>
            {servicesList.map(service => (
              <option key={service} value={service} className="bg-brand-charcoal text-white">
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Describe Your Project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail dimensions, trees/brush thickness, driveway lengths, or details of structural demolition..."
            className="glass-input resize-none"
          ></textarea>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-2 text-xs text-gray-500 py-1">
          <ShieldAlert className="w-4 h-4 text-brand-yellow shrink-0" />
          <span>We respect your privacy. Form data is secured and routed directly to the owner.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 mt-2 justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-brand-black" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing Quote Request...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Request
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
