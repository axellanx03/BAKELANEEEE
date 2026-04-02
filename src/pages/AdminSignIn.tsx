import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export default function AdminSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('adminIsLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        name: 'BakeLane Admin',
        email: 'admin@bakelane.com',
        username: 'admin',
        role: 'admin'
      }));
      navigate('/');
      window.location.reload();
    } else {
      alert('Invalid admin credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 nm-inset rounded-full text-accent mb-4">
          <Shield size={32} />
        </div>
        <h1 className="text-5xl font-black tracking-tighter">Admin sign in</h1>
        <p className="text-accent-muted font-medium">Secure access for BakeLane staff and administrators.</p>
      </div>

      <div className="nm-flat p-10 rounded-[3rem] space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Admin username</label>
            <input 
              type="text" 
              required
              className="nm-input w-full"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Password</label>
            <input 
              type="password" 
              required
              className="nm-input w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="nm-button w-full !py-4 text-lg flex items-center justify-center gap-3">
            Sign in as admin <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
