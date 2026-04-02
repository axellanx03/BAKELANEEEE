import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu as MenuIcon, Search, Facebook, Instagram, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminLoggedIn = localStorage.getItem('adminIsLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setIsAdminLoggedIn(adminLoggedIn);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    setCartCount(count);
  }, [location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminIsLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between nm-flat px-8 py-3 rounded-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden nm-flat p-1 group-hover:scale-105 transition-transform">
                <img 
                  src="/img/your-logo-url.png" 
                  alt="BakeLane Logo" 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-accent">BAKELANE</span>
            </Link>

            <nav className="flex flex-wrap items-center gap-4">
              {['MENU', 'CREATE', 'PERKS', ...(isAdminLoggedIn ? ['ADMIN'] : [])].map((item) => (
                <Link 
                  key={item}
                  to={item === 'ADMIN' ? '/admin' : `/${item.toLowerCase()}`}
                  className={`text-sm font-bold tracking-widest hover:text-accent-muted transition-colors ${
                    location.pathname === (item === 'ADMIN' ? '/admin' : `/${item.toLowerCase()}`) ? 'text-accent border-b-2 border-accent' : 'text-accent/60'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/checkout" className="relative p-3 nm-button rounded-full !px-3 !py-3">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-bg text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-bg">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-1 nm-flat rounded-full overflow-hidden w-10 h-10 border-2 border-accent/10"
                >
                  <img 
                    src="/img/profile-image-url.jpg" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-56 nm-flat p-2 rounded-2xl z-50"
                    >
                      <Link 
                        to="/edit-details" 
                        className="flex items-center gap-3 p-3 hover:nm-inset rounded-xl transition-all"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={18} />
                        <span className="text-sm font-bold">Your Information</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 hover:nm-inset rounded-xl transition-all text-red-600"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-bold">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/sign-in" className="text-sm font-bold px-6 py-2 rounded-full hover:nm-inset transition-all">
                  Sign in
                </Link>
                <Link to="/join" className="nm-button !px-6 !py-2 rounded-full text-sm">
                  Join now
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 px-6 pb-12">
        <div className="max-w-7xl mx-auto nm-flat p-12 rounded-[3rem]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tighter">BAKELANE</h3>
              <p className="text-sm text-accent-muted leading-relaxed">
                Modern baking, traditional heart. We craft every bite with passion and premium ingredients.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/bakelaneceb" className="p-3 nm-flat rounded-full hover:nm-inset transition-all" target="_blank" rel="noreferrer">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/bakelaneceb/" className="p-3 nm-flat rounded-full hover:nm-inset transition-all" target="_blank" rel="noreferrer">
                <Instagram size={18} />
              </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">About Us</h4>
              <ul className="space-y-4 text-sm text-accent-muted">
                <li><Link to="/about" className="hover:text-accent">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">In-store Menu</h4>
              <ul className="space-y-4 text-sm text-accent-muted">
                <li><a href="#" className="hover:text-accent">Store Locator</a></li>
                <li><a href="#" className="hover:text-accent">Bulk Orders</a></li>
                <li><a href="#" className="hover:text-accent">Gift Cards</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold">Sign up for updates</h4>
              <p className="text-sm text-accent-muted">Get fresh news and exclusive offers.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="nm-input w-full text-sm"
                />
                <button className="nm-button w-full !px-4 !py-2 text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-accent/5 text-center text-xs text-accent-muted">
            © 2024 BakeLane. All rights reserved. Crafted with love.
          </div>
        </div>
      </footer>
    </div>
  );
}
