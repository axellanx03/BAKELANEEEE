import React from 'react';
import { motion } from 'motion/react';
import { Gift, Zap, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const perks = [
  {
    tag: 'Menu Pick',
    title: 'Red Velvet Cookie',
    description: 'Soft and chewy red velvet cookie with a hint of cocoa, one of our top pastry favorites.',
    image: '/img/redvel.png',
    link: '/menu'
  },
  {
    tag: 'Cafe Classic',
    title: 'Latte',
    description: 'Smooth espresso with steamed milk for a creamy latte, perfect for every coffee lover.',
    image: '/img/latte.png',
    link: '/menu'
  },
  {
    tag: 'Sweet Choice',
    title: "S'mores Cookie",
    description: 'Gooey graham, chocolate, and marshmallow cookie inspired by the classic campfire treat.',
    image: '/img/smores.png',
    link: '/menu'
  },
  {
    tag: 'Refreshing Sip',
    title: 'Matcha Latte',
    description: 'Creamy matcha latte with a smooth, lightly sweet finish for a bright, uplifting drink.',
    image: '/img/matchlatte.png',
    link: '/menu'
  }
];

export default function Perks() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="h-full space-y-8 nm-flat p-12 rounded-[3rem]">
          <div className="inline-flex items-center gap-2 px-4 py-2 nm-inset rounded-full text-accent text-xs font-black tracking-widest uppercase">
            <Gift size={14} /> BakeLane Perks
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-tight">
            More reasons to stay for one more cup.
          </h1>
          <p className="text-xl text-accent-muted leading-relaxed">
            The perks page is where we feature the extra things we offer, from seasonal drinks and sweet pairings to loyalty moments and limited-time specials.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu" className="nm-button">Explore Menu</Link>
            <Link to="/create" className="nm-button nm-inset !shadow-nm-pressed">Create Your Drink</Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { val: '4', label: 'Featured' },
              { val: 'Fresh', label: 'Picks' },
              { val: 'Daily', label: 'Rewards' }
            ].map((stat, i) => (
              <div key={i} className="nm-inset p-4 rounded-2xl text-center">
                <p className="text-2xl font-black">{stat.val}</p>
                <p className="text-[10px] font-bold text-accent/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full nm-flat p-4 rounded-[3rem] overflow-hidden flex flex-col">
          <div className="aspect-square overflow-hidden rounded-[2.5rem]">
            <img 
              src="/img/loyal.png" 
              alt="Loyalty Card" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 p-6 nm-inset rounded-[2rem] bg-bg">
            <p className="text-xs font-black tracking-widest text-accent/40 uppercase mb-2">Now Highlighting</p>
            <h3 className="text-2xl font-black tracking-tight">BakeLane Loyalty Card</h3>
            <p className="text-sm text-accent-muted leading-relaxed mt-3">
              Earn points on every order, enjoy member-only drink perks, and redeem free favorites faster.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black tracking-tighter">Current Highlights</h2>
          <p className="text-accent-muted font-medium">What’s available right now at BakeLane.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {perks.map((perk, i) => (
            <motion.article 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-8 nm-flat p-8 rounded-[3rem] hover:nm-hover transition-all group"
            >
              <div className="w-full sm:w-48 h-48 nm-inset p-2 rounded-[2rem] overflow-hidden shrink-0">
                <img 
                  src={perk.image} 
                  alt={perk.title} 
                  className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 py-2 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 nm-inset rounded-full text-[10px] font-black tracking-widest text-accent/60 uppercase">
                    {perk.tag}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight">{perk.title}</h3>
                  <p className="text-sm text-accent-muted leading-relaxed">
                    {perk.description}
                  </p>
                </div>
                <Link to={perk.link} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-muted">
                  View on Menu <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="nm-flat p-16 rounded-[4rem] text-center space-y-8">
        <div className="inline-flex p-4 nm-inset rounded-full text-accent">
          <Sparkles size={32} />
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-black tracking-tighter">Ready to Order?</h2>
          <p className="text-lg text-accent-muted leading-relaxed">
            Pick a favorite or build something that feels like your own. Use the menu for quick ordering or jump into the create page.
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <Link to="/create" className="nm-button !px-12 !py-4 text-lg flex items-center gap-3">
            Start Creating <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
