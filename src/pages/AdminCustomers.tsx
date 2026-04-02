import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export default function AdminCustomers() {
  // Mock customers data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', location: 'New York', orders: 12, totalSpent: '$345.67' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', location: 'California', orders: 8, totalSpent: '$234.56' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 8902', location: 'Texas', orders: 15, totalSpent: '$456.78' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234 567 8903', location: 'Florida', orders: 6, totalSpent: '$123.45' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-black tracking-tighter">Customer Management</h1>
        <p className="text-accent-muted font-medium mt-2">Manage customer accounts and data</p>
      </div>

      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {customers.map((customer) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="nm-inset p-6 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-black">{customer.name}</h3>
                  <p className="text-accent-muted">{customer.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-accent-muted" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-accent-muted" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-accent-muted" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-accent/10">
                <div>
                  <p className="text-sm text-accent-muted">Orders</p>
                  <p className="font-black">{customer.orders}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-accent-muted">Total Spent</p>
                  <p className="font-black">{customer.totalSpent}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}