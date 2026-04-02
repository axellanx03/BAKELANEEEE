import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Join() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      name: name,
      email: email,
      username: email.split('@')[0]
    }));
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Create account</h1>
        <p className="text-accent-muted font-medium">Join BakeLane for exclusive offers and faster checkout.</p>
      </div>

      <div className="nm-flat p-10 rounded-[3rem] space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
              <input 
                type="text" 
                required
                className="nm-input w-full pl-12"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
              <input 
                type="email" 
                required
                className="nm-input w-full pl-12"
                placeholder="hello@bakelane.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
              <input 
                type="password" 
                required
                className="nm-input w-full pl-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="text-[10px] text-accent-muted px-4 leading-relaxed">
            By joining, you agree to our <Link to="/privacy-policy" className="underline">Terms of Service</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
          </p>

          <button type="submit" className="nm-button w-full !py-4 text-lg flex items-center justify-center gap-3">
            Join now <ArrowRight size={20} />
          </button>
        </form>
      </div>

      <p className="text-center text-sm font-bold text-accent-muted">
        Already a member? <Link to="/sign-in" className="text-accent underline">Sign in instead</Link>
      </p>
    </div>
  );
}
