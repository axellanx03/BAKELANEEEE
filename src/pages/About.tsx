import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Coffee, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const developers = [
  { name: 'Vivian Torlao', role: 'Founder', description: 'Vivian is known for her innovative approach and leadership.'},
  { name: 'Carol Anne Torlao', role: 'Creative Director', description: 'Carol is a creative force behind our unique branding and design.'},
  { name: 'Ian Torlao', role: 'Marketing and Trends', description: 'Ian leads trend analysis and marketing strategy to keep BakeLane ahead in the market.'},
  { name: 'Laurie Lane Torlao', role: 'Marketing', description: 'Laurie builds campaigns and brand partnerships to expand our community resonance.'},
  { name: 'Elijah Joseph Consing', role: 'Quality Assurance', description: 'Elijah oversees product quality and service consistency across all BakeLane offerings.'},
  { name: 'Lance Axel R. Miñoza', role: 'Full-Stack Developer', description: 'Lance develops and maintains the BakeLane platform, ensuring a fast and reliable user experience.'}
];

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current.firstElementChild as HTMLElement | null;
    if (!container) return;

    // Each card has min-w-[320px] plus gap-12; scroll by one card width.
    const card = container.firstElementChild as HTMLElement | null;
    const gap = 48; // gap-12 in Tailwind is 3rem = 48px
    const cardWidth = card ? card.offsetWidth : 320;
    const offset = cardWidth + gap;

    scrollRef.current.scrollBy({ left: dir === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      <section className="text-center space-y-8 nm-flat p-16 rounded-[4rem]">
        <div className="inline-flex p-4 nm-inset rounded-full text-accent">
          <Heart size={32} />
        </div>
        <h1 className="text-6xl font-black tracking-tighter">Our Story</h1>
        <p className="max-w-3xl mx-auto text-xl text-accent-muted leading-relaxed">
          BakeLane started with a simple idea: that every cup of coffee and every bite of pastry should be an experience. We combine modern techniques with traditional heart to bring you the best of both worlds.
        </p>
      </section>

      <section className="space-y-12 text-center">
        <h2 className="text-4xl font-black tracking-tighter">Meet the Team</h2>
        <div className="relative">
          <style>{`.meet-team-scroll::-webkit-scrollbar { display: none; } .meet-team-scroll { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

          <button
            onClick={() => scrollBy('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 nm-button !p-2 rounded-full"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 nm-button !p-2 rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef} className="meet-team-scroll overflow-x-auto outline-none focus:outline-none" tabIndex={0}>
            <div className="inline-flex gap-12 py-4 px-2 min-w-full">
              {developers.map((dev, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="nm-flat p-8 rounded-[3rem] space-y-6 group min-w-[320px]"
                >
              <div className="aspect-square nm-inset p-2 rounded-[2.5rem] overflow-hidden flex items-center justify-center bg-accent/5 text-accent">
                <Users size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{dev.name}</h3>
                <p className="text-sm font-bold text-accent/40 uppercase tracking-widest">{dev.role}</p>
                <p className="text-sm text-accent-muted leading-relaxed">{dev.description}</p>
              </div>
            </motion.div>
          ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="nm-flat p-12 rounded-[3rem] space-y-6">
          <div className="inline-flex p-3 nm-inset rounded-xl text-accent"><Coffee size={24} /></div>
          <h3 className="text-3xl font-black tracking-tight">Our Mission</h3>
          <p className="text-accent-muted leading-relaxed">
            To provide a sanctuary for coffee lovers and pastry enthusiasts alike, where quality meets comfort in every interaction.
          </p>
        </div>
        <div className="nm-flat p-12 rounded-[3rem] space-y-6">
          <div className="inline-flex p-3 nm-inset rounded-xl text-accent"><Star size={24} /></div>
          <h3 className="text-3xl font-black tracking-tight">Our Vision</h3>
          <p className="text-accent-muted leading-relaxed">
            To become the neighborhood's favorite spot for moments of indulgence, creativity, and community.
          </p>
        </div>
      </section>
    </div>
  );
}
