import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BarChart3, Download, Calendar, TrendingUp, ArrowLeft } from 'lucide-react';

export default function AdminReports() {
  // Mock report data
  const reports = [
    { title: 'Monthly Sales Report', period: 'March 2024', downloads: 45, status: 'Ready' },
    { title: 'Inventory Report', period: 'Current', downloads: 23, status: 'Ready' },
    { title: 'Customer Analytics', period: 'Q1 2024', downloads: 67, status: 'Processing' },
    { title: 'Financial Summary', period: 'March 2024', downloads: 12, status: 'Ready' },
  ];

  const metrics = [
    { label: 'Total Reports Generated', value: '147', change: '+23%' },
    { label: 'Average Processing Time', value: '2.3 min', change: '-15%' },
    { label: 'Data Accuracy', value: '99.8%', change: '+0.2%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-black tracking-tighter">Reports</h1>
        <p className="text-accent-muted font-medium mt-2">Generate detailed business reports</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="nm-flat p-6 rounded-2xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-accent-muted text-sm">{metric.label}</p>
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <p className="text-2xl font-black">{metric.value}</p>
            <p className="text-green-600 font-bold text-sm">{metric.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Reports List */}
      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Available Reports</h2>
          <button className="nm-button !px-6 !py-3 flex items-center gap-2">
            <BarChart3 size={18} />
            Generate New Report
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="nm-inset p-6 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <BarChart3 size={24} className="text-accent" />
                <div>
                  <h3 className="text-lg font-black">{report.title}</h3>
                  <p className="text-accent-muted">{report.period} • {report.downloads} downloads</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </div>
                <button className="nm-button !px-4 !py-2 flex items-center gap-2">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <h2 className="text-2xl font-black">Quick Report Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Sales Report', 'Inventory Report', 'Customer Report', 'Financial Report'].map((type) => (
            <button
              key={type}
              className="nm-button !px-4 !py-6 text-center hover:scale-105 transition-transform"
            >
              <Calendar size={20} className="mx-auto mb-2" />
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}