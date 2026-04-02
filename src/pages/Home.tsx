import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Coffee, Cookie, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-accent">
            BakeLane
          </h1>
          <p className="text-lg md:text-2xl font-bold tracking-widest text-accent-muted uppercase">
            Simply Delicious.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group nm-flat p-4 rounded-[3rem] overflow-hidden aspect-[21/9] flex items-center justify-center"
        >
          <img 
            src="/img/your-gif-url.gif" 
            alt="BakeLane Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-accent/10 backdrop-blur-[2px]" />
          <Link 
            to="/menu" 
            className="relative nm-button !px-12 !py-6 text-xl group-hover:scale-110 transition-transform"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Promotional Sections */}
      <div className="grid grid-cols-1 gap-24">
        {/* Promo 1 */}
        <motion.section 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-1/2 nm-flat p-4 rounded-[3rem] aspect-square md:aspect-video overflow-hidden">
            <img 
              src="/img/your-image-url.jpg" 
              alt="Cookies" 
              className="w-full h-full object-cover rounded-[2.5rem]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8 nm-flat p-12 rounded-[3rem] text-center md:text-left">
            <div className="inline-flex p-4 nm-inset rounded-2xl text-accent">
              <Cookie size={32} />
            </div>
            <h2 className="text-4xl font-black leading-tight">
              Sweeten your day with a bite of indulgence!
            </h2>
            <p className="text-lg text-accent-muted leading-relaxed">
              Treat yourself to our irresistible Red Velvet and Chocolate Chip cookies and make every moment a little sweeter.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-3 nm-button">
              Explore menu <ArrowRight size={18} />
            </Link>
          </div>
        </motion.section>

        {/* Promo 2 */}
        <motion.section 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse items-center gap-12"
        >
          <div className="w-full md:w-1/2 nm-flat p-4 rounded-[3rem] aspect-square md:aspect-video overflow-hidden">
            <img 
              src="/img/BROWNIES_Fr.png" 
              alt="Brownies" 
              className="w-full h-full object-cover rounded-[2.5rem]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8 nm-flat p-12 rounded-[3rem] text-center md:text-left">
            <div className="inline-flex p-4 nm-inset rounded-2xl text-accent">
              <Star size={32} />
            </div>
            <h2 className="text-4xl font-black leading-tight">
              Indulge in bite-sized perfection!
            </h2>
            <p className="text-lg text-accent-muted leading-relaxed">
              Savor the intense richness of premium cocoa and a fudgy, melt-in-your-mouth center in our irresistible Brownie Bites.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-3 nm-button">
              Order now <ArrowRight size={18} />
            </Link>
          </div>
        </motion.section>

        {/* Promo 3 */}
        <motion.section 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-1/2 nm-flat p-4 rounded-[3rem] aspect-square md:aspect-video overflow-hidden">
            <img 
              src="/img/SMORES_Fr.png" 
              alt="Coffee" 
              className="w-full h-full object-cover rounded-[2.5rem]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8 nm-flat p-12 rounded-[3rem] text-center md:text-left">
            <div className="inline-flex p-4 nm-inset rounded-2xl text-accent">
              <Coffee size={32} />
            </div>
            <h2 className="text-4xl font-black leading-tight">
              Experience a campfire classic!
            </h2>
            <p className="text-lg text-accent-muted leading-relaxed">
              Savor the gooey delight of toasted marshmallows and rich chocolate in our decadent S'mores Cookie.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-3 nm-button">
              Order Now <ArrowRight size={18} />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
