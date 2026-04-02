import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditDetails() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!savedUser) {
      navigate('/sign-in');
      return;
    }
    setUser(savedUser);
    setFormData({
      name: savedUser.name,
      email: savedUser.email,
      password: ''
    });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-3 nm-button rounded-full !px-3 !py-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-6xl font-black tracking-tighter">Your Information</h1>
      </div>

      <div className="nm-flat p-12 rounded-[3rem] space-y-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 nm-inset p-2 rounded-full overflow-hidden">
            <img src="/img/profile-image-url.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
            <p className="text-accent-muted font-bold uppercase tracking-widest text-xs">@{user.username}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
                <input 
                  type="text" 
                  className="nm-input w-full pl-12"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
                <input 
                  type="email" 
                  className="nm-input w-full pl-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-accent/40 ml-4">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/20" size={18} />
                <input 
                  type="password" 
                  className="nm-input w-full pl-12"
                  placeholder="Leave blank to keep current"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`nm-button w-full !py-5 text-xl flex items-center justify-center gap-3 ${isSaved ? 'nm-inset text-green-600' : ''}`}
          >
            {isSaved ? 'Saved Successfully!' : <><Save size={20} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}
