import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Create from './pages/Create';
import Perks from './pages/Perks';
import SignIn from './pages/SignIn';
import Join from './pages/Join';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import EditDetails from './pages/EditDetails';
import AdminSignIn from './pages/AdminSignIn';
import Admin from './pages/Admin';
import AdminInventory from './pages/AdminInventory';
import AdminOrders from './pages/AdminOrders';
import AdminSales from './pages/AdminSales';
import AdminCustomers from './pages/AdminCustomers';
import AdminSettings from './pages/AdminSettings';
import AdminReports from './pages/AdminReports';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/menu" element={<Layout><Menu /></Layout>} />
        <Route path="/create" element={<Layout><Create /></Layout>} />
        <Route path="/perks" element={<Layout><Perks /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        <Route path="/join" element={<Layout><Join /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/edit-details" element={<Layout><EditDetails /></Layout>} />
        <Route path="/admin-sign-in" element={<Layout><AdminSignIn /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </Router>
  );
}
