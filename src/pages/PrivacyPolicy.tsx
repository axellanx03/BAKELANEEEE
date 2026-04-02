import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 nm-inset rounded-full text-accent mb-4">
          <Shield size={32} />
        </div>
        <h1 className="text-6xl font-black tracking-tighter">Privacy Policy</h1>
        <p className="text-accent-muted font-bold uppercase tracking-widest">Effective Date: November 2024</p>
      </div>

      <div className="nm-flat p-12 rounded-[3rem] space-y-12">
        <section className="space-y-6">
          <p className="text-lg leading-relaxed">
            At BakeLane, your privacy matters to us! We’re dedicated to protecting your personal information and being transparent about how we collect, use, and safeguard it.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: FileText, title: 'What We Collect', text: 'Name, email, phone, and address for delivery and communication.' },
            { icon: Lock, title: 'Payment Safety', text: 'We use secure third-party processors. We don’t store your card info directly.' },
            { icon: Eye, title: 'How We Use It', text: 'To fulfill orders, improve our services, and send you tasty updates.' },
            { icon: Shield, title: 'Your Rights', text: 'You can access, update, or delete your information at any time.' }
          ].map((item, i) => (
            <div key={i} className="nm-inset p-8 rounded-[2rem] space-y-4">
              <div className="p-3 nm-flat rounded-xl inline-block text-accent">
                <item.icon size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
              <p className="text-sm text-accent-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <section className="space-y-6 nm-inset p-8 rounded-[2rem]">
          <h2 className="text-2xl font-black tracking-tight">Contact Us Anytime</h2>
          <p className="text-sm text-accent-muted leading-relaxed">
            If you have any questions, concerns, or just want to chat about your data, you can reach us at:<br />
            <strong>Email:</strong> bakemate@google.com<br />
            <strong>Phone:</strong> 09191919191
          </p>
        </section>
      </div>
    </div>
  );
}
