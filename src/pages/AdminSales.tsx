import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowLeft } from 'lucide-react';

const dataSeries = {
  daily: [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 1450 },
    { label: 'Wed', value: 1850 },
    { label: 'Thu', value: 1350 },
    { label: 'Fri', value: 1950 },
    { label: 'Sat', value: 2300 },
    { label: 'Sun', value: 2100 },
  ],
  weekly: [
    { label: 'W1', value: 9400 },
    { label: 'W2', value: 11200 },
    { label: 'W3', value: 12650 },
    { label: 'W4', value: 13800 },
  ],
  monthly: [
    { label: 'Jan', value: 41200 },
    { label: 'Feb', value: 35600 },
    { label: 'Mar', value: 50200 },
    { label: 'Apr', value: 47200 },
    { label: 'May', value: 53000 },
    { label: 'Jun', value: 48500 },
  ],
};

export default function AdminSales() {
  const [range, setRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const series = dataSeries[range];
  const totalSales = useMemo(() => series.reduce((sum, point) => sum + point.value, 0), [series]);

  const stats = [
    { title: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, change: '+12%', icon: DollarSign },
    { title: 'Orders Today', value: '47', change: '+8%', icon: ShoppingCart },
    { title: 'Active Customers', value: '1,234', change: '+15%', icon: Users },
    { title: 'Avg Order Value', value: '$28.50', change: '+5%', icon: TrendingUp },
  ];

  const recentSales = [
    { id: 1, product: 'Chocolate Chip Cookies', amount: '$15.99', time: '2 hours ago' },
    { id: 2, product: 'Vanilla Cupcakes (6-pack)', amount: '$24.99', time: '4 hours ago' },
    { id: 3, product: 'Blueberry Muffins', amount: '$8.99', time: '6 hours ago' },
    { id: 4, product: 'Red Velvet Cake', amount: '$45.99', time: '1 day ago' },
  ];

  const maxValue = Math.max(...series.map((item) => item.value));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-black tracking-tighter">Sales Analytics</h1>
        <p className="text-accent-muted font-medium mt-2">Track sales performance and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="nm-flat p-6 rounded-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <stat.icon size={24} className="text-accent" />
              <span className="text-green-600 font-bold text-sm">{stat.change}</span>
            </div>
            <div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-accent-muted text-sm">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Total Sales</h2>
            <p className="text-accent-muted text-sm">For selected timeline</p>
          </div>
          <div className="flex items-center gap-2">
            {(['daily', 'weekly', 'monthly'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  range === item ? 'nm-flat text-accent' : 'nm-inset text-accent-muted hover:nm-flat'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-4 nm-inset p-6 rounded-2xl">
            <p className="text-sm text-accent-muted">Selected Period Total</p>
            <h3 className="text-3xl font-black text-accent">${totalSales.toLocaleString()}</h3>
          </div>
        </div>

        <div className="nm-flat p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-xl">{range.charAt(0).toUpperCase() + range.slice(1)} Sales Trend</h3>
            <span className="text-sm text-accent-muted">{series.length} points</span>
          </div>

          <div className="flex items-end gap-3 h-48">
            {series.map((point, index) => {
              const height = (point.value / maxValue) * 100;
              return (
                <div key={index} className="flex-1 h-full flex flex-col justify-end">
                  <div
                    className="rounded-xl bg-accent/80 hover:bg-accent transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[11px] text-center mt-2 text-accent-muted">{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <h2 className="text-2xl font-black">Recent Sales</h2>
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="nm-inset p-4 rounded-xl flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold">{sale.product}</h3>
                <p className="text-accent-muted text-sm">{sale.time}</p>
              </div>
              <p className="text-xl font-black">{sale.amount}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}