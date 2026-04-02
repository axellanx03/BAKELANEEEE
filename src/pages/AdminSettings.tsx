import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Settings, Save, Bell, Shield, Palette, ArrowLeft } from 'lucide-react';

export default function AdminSettings() {
  const [notifications, setNotifications] = useState(true);
  const [security, setSecurity] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-black tracking-tighter">System Settings</h1>
        <p className="text-accent-muted font-medium mt-2">Configure system preferences and options</p>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="nm-flat p-8 rounded-[2rem] space-y-6"
        >
          <div className="flex items-center gap-4">
            <Bell size={24} className="text-accent" />
            <h2 className="text-2xl font-black">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between nm-inset p-4 rounded-xl">
              <div>
                <h3 className="font-bold">Email Notifications</h3>
                <p className="text-accent-muted text-sm">Receive email updates for orders and system alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-accent/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="nm-flat p-8 rounded-[2rem] space-y-6"
        >
          <div className="flex items-center gap-4">
            <Shield size={24} className="text-accent" />
            <h2 className="text-2xl font-black">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between nm-inset p-4 rounded-xl">
              <div>
                <h3 className="font-bold">Two-Factor Authentication</h3>
                <p className="text-accent-muted text-sm">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={security}
                  onChange={(e) => setSecurity(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-accent/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="nm-flat p-8 rounded-[2rem] space-y-6"
        >
          <div className="flex items-center gap-4">
            <Palette size={24} className="text-accent" />
            <h2 className="text-2xl font-black">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="nm-inset p-4 rounded-xl space-y-3">
              <h3 className="font-bold">Theme</h3>
              <div className="flex gap-4">
                {['light', 'dark', 'auto'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setTheme(option)}
                    className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${
                      theme === option ? 'nm-flat' : 'nm-inset hover:nm-flat'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <button className="nm-button !px-8 !py-4 flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}