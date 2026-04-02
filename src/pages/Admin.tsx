import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, ShoppingBag, TrendingUp, Users, Settings, BarChart3 } from 'lucide-react';

export default function Admin() {
  const adminSections = [
    {
      title: 'Inventory Management',
      description: 'Manage stock levels, ingredients, and supplies',
      icon: Package,
      path: '/admin/inventory'
    },
    {
      title: 'Order Management',
      description: 'View and process customer orders',
      icon: ShoppingBag,
      path: '/admin/orders'
    },
    {
      title: 'Sales Analytics',
      description: 'Track sales performance and revenue',
      icon: TrendingUp,
      path: '/admin/sales'
    },
    {
      title: 'Customer Management',
      description: 'Manage customer accounts and data',
      icon: Users,
      path: '/admin/customers'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences and options',
      icon: Settings,
      path: '/admin/settings'
    },
    {
      title: 'Reports',
      description: 'Generate detailed business reports',
      icon: BarChart3,
      path: '/admin/reports'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Admin Dashboard</h1>
        <p className="text-accent-muted font-medium">Manage your BakeLane operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminSections.map((section, index) => (
          <Link key={section.title} to={section.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="nm-flat p-8 rounded-[2rem] hover:nm-inset transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 nm-inset rounded-2xl group-hover:nm-flat transition-all">
                  <section.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-black tracking-tighter">{section.title}</h3>
              </div>
              <p className="text-accent-muted font-medium">{section.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}