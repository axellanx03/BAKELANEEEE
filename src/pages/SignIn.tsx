import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome as Google } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      name: 'BakeLane Member',
      email: email,
      username: email.split('@')[0]
    }));
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Welcome back</h1>
        <p className="text-accent-muted font-medium">Sign in to continue to your orders and profile.</p>
      </div>

      <div className="nm-flat p-10 rounded-[3rem] space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Email or username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
              <input 
                type="text" 
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

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-5 h-5 nm-inset rounded flex items-center justify-center group-hover:nm-flat transition-all">
                <div className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-20" />
              </div>
              <span className="text-sm font-bold text-accent-muted">Keep me signed in</span>
            </label>
            <button type="button" className="text-sm font-bold text-accent hover:underline">Forgot?</button>
          </div>

          <button type="submit" className="nm-button w-full !py-4 text-lg flex items-center justify-center gap-3">
            Sign in <ArrowRight size={20} />
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-accent/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black text-accent/20">
            <span className="bg-bg px-4">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="nm-button !px-0 flex items-center justify-center gap-2 text-sm">
            <Google size={18} /> Google
          </button>
          <button className="nm-button !px-0 flex items-center justify-center gap-2 text-sm">
            <Github size={18} /> GitHub
          </button>
        </div>
      </div>

      <p className="text-center text-sm font-bold text-accent-muted">
        Not a member yet? <Link to="/join" className="text-accent underline">Join BakeLane Now!</Link>
      </p>

      <p className="text-center text-sm font-bold text-accent-muted">
        Admin access? <Link to="/admin-sign-in" className="text-accent underline">Sign in as admin</Link>
      </p>
    </div>
  );
}
