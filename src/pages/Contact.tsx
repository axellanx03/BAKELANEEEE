import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-6xl font-black tracking-tighter text-center">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          {[
            { icon: Mail, label: 'Email', val: 'hello@bakelane.com' },
            { icon: Phone, label: 'Phone', val: '+63 919 191 9191' },
            { icon: MapPin, label: 'Visit Us', val: '123 Baker St, Coffee City' }
          ].map((item, i) => (
            <div key={i} className="nm-flat p-8 rounded-[2.5rem] flex items-center gap-6">
              <div className="p-4 nm-inset rounded-2xl text-accent">
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-accent/40">{item.label}</p>
                <p className="font-bold">{item.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-8">
          <div className="nm-flat p-12 rounded-[3rem]">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex p-6 nm-inset rounded-full text-green-600"><Send size={48} /></div>
                <h2 className="text-3xl font-black tracking-tight">Message Sent!</h2>
                <p className="text-accent-muted">We'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="nm-button">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Name</label>
                  <input type="text" required className="nm-input w-full" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Email</label>
                  <input type="email" required className="nm-input w-full" placeholder="Your email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Message</label>
                  <textarea required rows={5} className="nm-input w-full resize-none" placeholder="How can we help?"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="nm-button w-full !py-5 text-xl flex items-center justify-center gap-3">
                    Send Message <Send size={20} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
