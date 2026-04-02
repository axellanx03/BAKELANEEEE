import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, CreditCard, Wallet, Banknote, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex p-8 nm-inset rounded-full text-green-600"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter">Thank you!</h1>
          <p className="text-accent-muted font-medium">Your order is being prepared. Brew with us again soon.</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="nm-button !px-12"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/menu" className="p-3 nm-button rounded-full !px-3 !py-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-6xl font-black tracking-tighter">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Order Summary */}
        <div className="lg:col-span-7 space-y-8">
          <div className="nm-flat p-8 rounded-[3rem] space-y-8">
            <h2 className="text-2xl font-black tracking-tight px-4">Review Order</h2>
            
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 nm-inset rounded-[2rem]">
                  <p className="text-accent-muted font-bold">Your cart is empty.</p>
                  <Link to="/menu" className="text-accent underline mt-2 inline-block">Go to Menu</Link>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 nm-flat rounded-[2rem] hover:nm-hover transition-all">
                    <div className="w-24 h-24 nm-inset p-2 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h3 className="font-black text-lg leading-tight">{item.name}</h3>
                      <p className="text-sm font-bold text-accent-muted">₱{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-3 nm-inset p-2 rounded-xl">
                      <button onClick={() => updateQuantity(i, -1)} className="p-1 hover:text-accent transition-colors"><Minus size={16} /></button>
                      <span className="w-6 text-center font-black text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(i, 1)} className="p-1 hover:text-accent transition-colors"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => removeItem(i)} className="p-3 nm-button !px-3 !py-3 rounded-xl text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="nm-inset p-8 rounded-[2.5rem] flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest text-accent/40">Preparation Time</p>
              <p className="font-bold">Ready in around {cart.length * 4}–{cart.length * 4 + 2} minutes</p>
            </div>
          </div>
        </div>

        {/* Payment & Total */}
        <div className="lg:col-span-5 sticky top-32 space-y-8">
          <div className="nm-flat p-10 rounded-[3rem] space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Payment Method</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                { id: 'paypal', label: 'PayPal', icon: Wallet },
                { id: 'cash', label: 'Cash on Pickup', icon: Banknote }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-4 p-5 nm-flat rounded-2xl text-left hover:nm-hover transition-all ${
                    paymentMethod === method.id ? 'nm-inset !shadow-nm-pressed' : ''
                  }`}
                >
                  <div className={`p-3 nm-inset rounded-xl ${paymentMethod === method.id ? 'bg-accent text-bg' : 'text-accent/40'}`}>
                    <method.icon size={20} />
                  </div>
                  <span className="font-bold">{method.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-accent/5 space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-accent-muted font-bold">Subtotal</span>
                <span className="font-black">₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-accent-muted font-bold">Service Fee</span>
                <span className="font-black">₱0.00</span>
              </div>
              <div className="flex justify-between items-center px-2 pt-4 border-t border-accent/5">
                <span className="text-xl font-black">Total</span>
                <span className="text-3xl font-black">₱{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={cart.length === 0 || isProcessing}
              onClick={handleCheckout}
              className={`nm-button w-full !py-5 text-xl flex items-center justify-center gap-3 ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
