import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function AdminOrders() {
  // Mock orders data
  const orders = [
    { id: '#001', customer: 'John Doe', items: 3, total: '$45.99', status: 'Pending', date: '2024-04-03' },
    { id: '#002', customer: 'Jane Smith', items: 2, total: '$32.50', status: 'Processing', date: '2024-04-02' },
    { id: '#003', customer: 'Bob Johnson', items: 5, total: '$78.25', status: 'Completed', date: '2024-04-01' },
    { id: '#004', customer: 'Alice Brown', items: 1, total: '$15.99', status: 'Cancelled', date: '2024-03-31' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="text-yellow-500" size={18} />;
      case 'Processing': return <Clock className="text-blue-500" size={18} />;
      case 'Completed': return <CheckCircle className="text-green-500" size={18} />;
      case 'Cancelled': return <XCircle className="text-red-500" size={18} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-black tracking-tighter">Order Management</h1>
        <p className="text-accent-muted font-medium mt-2">View and process customer orders</p>
      </div>

      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="nm-inset p-6 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="text-lg font-black">{order.id}</h3>
                  <p className="text-accent-muted">{order.customer} • {order.items} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black">{order.total}</p>
                <p className="text-accent-muted text-sm">{order.date}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}