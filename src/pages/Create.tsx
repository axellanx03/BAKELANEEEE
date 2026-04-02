import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Droplets, Sparkles, Thermometer, Maximize, Plus, Check } from 'lucide-react';

const options = {
  coffeeType: [
    { id: 'espresso', label: 'Espresso', price: 120, icon: 'ES', note: 'Bold and creamy' },
    { id: 'coldbrew', label: 'Cold Brew', price: 135, icon: 'CB', note: 'Smooth and chilled' },
    { id: 'drip', label: 'Drip', price: 95, icon: 'DR', note: 'Clean and balanced' },
    { id: 'americano', label: 'Americano', price: 110, icon: 'AM', note: 'Deep and smooth' },
    { id: 'cappuccino', label: 'Cappuccino', price: 128, icon: 'CP', note: 'Foamy and rich' },
    { id: 'latte', label: 'Latte', price: 126, icon: 'LT', note: 'Creamy and mellow' },
    { id: 'flatwhite', label: 'Flat White', price: 132, icon: 'FW', note: 'Velvety and bold' },
  ],
  milkType: [
    { id: 'none', label: 'None', price: 0, icon: 'NO', note: 'No milk added' },
    { id: 'whole', label: 'Whole Milk', price: 18, icon: 'WM', note: 'Rich and silky' },
    { id: 'oat', label: 'Oat Milk', price: 24, icon: 'OM', note: 'Soft and mellow' },
    { id: 'soy', label: 'Soy Milk', price: 20, icon: 'SM', note: 'Light and nutty' },
    { id: 'skim', label: 'Skim Milk', price: 14, icon: 'SK', note: 'Lean and smooth' },
    { id: 'almond', label: 'Almond Milk', price: 22, icon: 'AL', note: 'Nutty and light' },
    { id: 'coconut', label: 'Coconut Milk', price: 24, icon: 'CK', note: 'Tropical and silky' },
  ],
  flavor: [
    { id: 'none', label: 'None', price: 0, icon: 'NO', note: 'No syrup added' },
    { id: 'vanilla', label: 'Vanilla', price: 20, icon: 'VN', note: 'Classic and sweet' },
    { id: 'caramel', label: 'Caramel', price: 24, icon: 'CR', note: 'Buttery sweetness' },
    { id: 'hazelnut', label: 'Hazelnut', price: 26, icon: 'HZ', note: 'Toasty and nutty' },
    { id: 'mocha', label: 'Mocha', price: 28, icon: 'MC', note: 'Chocolate depth' },
    { id: 'brownsugar', label: 'Brown Sugar', price: 24, icon: 'BS', note: 'Warm caramelized' },
  ],
  temperature: [
    { id: 'hot', label: 'Hot', price: 0, icon: 'HT', note: 'Warm and cozy' },
    { id: 'iced', label: 'Iced', price: 10, icon: 'IC', note: 'Crisp and cool' },
  ],
  size: [
    { id: 'small', label: 'Small', price: 0, icon: 'S', note: 'Quick sip' },
    { id: 'medium', label: 'Medium', price: 22, icon: 'M', note: 'Everyday cup' },
    { id: 'large', label: 'Large', price: 38, icon: 'L', note: 'Longer pour' },
  ]
};

const previewImages: Record<string, Record<string, string>> = {
  espresso: { hot: '/img/hot_espresso.png', iced: '/img/cold_espresso.png' },
  coldbrew: { iced: '/img/cold_brew.png' },
  drip: { hot: '/img/hot_drip.png', iced: '/img/cold_drip.png' },
  americano: { hot: '/img/hot_americano.png', iced: '/img/cold_americano.png' },
  cappuccino: { hot: '/img/hot_cappuccino.png', iced: '/img/cold_cappuccino.png' },
  latte: { hot: '/img/hot_latte.png', iced: '/img/cold_latte.png' },
  flatwhite: { hot: '/img/hot_flat.png', iced: '/img/cold_flat.png' },
};

export default function Create() {
  const [selections, setSelections] = useState({
    coffeeType: 'espresso',
    milkType: 'none',
    flavor: 'none',
    temperature: 'iced',
    size: 'small'
  });

  const [isAdded, setIsAdded] = useState(false);

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selections).forEach(([group, id]) => {
      const option = (options as any)[group].find((o: any) => o.id === id);
      if (option) total += option.price;
    });
    return total;
  };

  const getPreviewImage = () => {
    const coffee = selections.coffeeType;
    const temp = selections.temperature;
    if (coffee === 'coldbrew') {
      return previewImages.coldbrew.iced;
    }
    return previewImages[coffee]?.[temp] || '/img/your-image-url.jpg';
  };

  const handleOptionSelect = (group: string, id: string) => {
    if (group === 'temperature' && selections.coffeeType === 'coldbrew' && id === 'hot') {
      return;
    }

    setSelections(prev => ({
      ...prev,
      [group]: id,
      ...(group === 'coffeeType' && id === 'coldbrew' ? { temperature: 'iced' } : {})
    }));
  };

  const getDrinkName = () => {
    const coffee = options.coffeeType.find(o => o.id === selections.coffeeType)?.label;
    const milk = selections.milkType !== 'none' ? options.milkType.find(o => o.id === selections.milkType)?.label : '';
    const flavor = selections.flavor !== 'none' ? options.flavor.find(o => o.id === selections.flavor)?.label : '';
    const temp = options.temperature.find(o => o.id === selections.temperature)?.label;
    const size = options.size.find(o => o.id === selections.size)?.label;

    return `${flavor} ${milk} ${coffee} (${temp}/${size})`.trim().replace(/\s+/g, ' ');
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const name = getDrinkName();
    const price = calculateTotal();
    
    const existing = cart.find((item: any) => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name,
        price,
        image: getPreviewImage(),
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-6 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Live Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
          <div className="nm-flat p-8 lg:p-12 rounded-[3rem] text-center space-y-8">
            <p className="text-xs font-black tracking-[0.2em] text-accent/40 uppercase">Your Creation</p>
            <h2 className="text-4xl font-black tracking-tighter leading-tight">{getDrinkName()}</h2>
            
            <div className="relative aspect-square max-w-[260px] sm:max-w-[280px] mx-auto nm-inset p-4 rounded-[2.5rem]">
              <motion.img 
                key={selections.coffeeType + selections.temperature}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                src={getPreviewImage()}
                alt="Coffee Preview"
                className="w-full h-full object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-accent-muted uppercase tracking-widest">Total Price</p>
              <p className="text-5xl font-black">₱{calculateTotal()}</p>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`nm-button w-full !py-5 text-xl flex items-center justify-center gap-3 ${isAdded ? 'nm-inset text-green-600' : ''}`}
            >
              {isAdded ? (
                <><Check size={24} /> Added to Cart</>
              ) : (
                <><Plus size={24} /> Add to Cart</>
              )}
            </button>
          </div>

          <div className="nm-inset p-8 rounded-[2rem] space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-accent/60">Flavor Profile</h4>
            <p className="text-sm leading-relaxed font-medium">
              {options.coffeeType.find(o => o.id === selections.coffeeType)?.note}, 
              {' '}{options.milkType.find(o => o.id === selections.milkType)?.note},
              {' '}{options.flavor.find(o => o.id === selections.flavor)?.note},
              {' '}{options.temperature.find(o => o.id === selections.temperature)?.note}.
            </p>
          </div>
        </div>

        {/* Builder */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Build Your Drink</h1>
            <p className="text-base sm:text-xl text-accent-muted font-medium">Customize every layer of your perfect cup.</p>
          </div>

          {/* Option Groups */}
          <div className="space-y-12">
            {Object.entries(options).map(([group, items]) => (
              <section key={group} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 nm-inset rounded-lg text-accent">
                    {group === 'coffeeType' && <Coffee size={20} />}
                    {group === 'milkType' && <Droplets size={20} />}
                    {group === 'flavor' && <Sparkles size={20} />}
                    {group === 'temperature' && <Thermometer size={20} />}
                    {group === 'size' && <Maximize size={20} />}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight capitalize">
                    {group.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((item: any) => {
                    const disabled = group === 'temperature' && selections.coffeeType === 'coldbrew' && item.id === 'hot';
                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleOptionSelect(group, item.id)}
                        className={`flex items-center gap-4 p-4 nm-flat rounded-2xl text-left transition-all ${
                          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:nm-hover'
                        } ${
                          (selections as any)[group] === item.id ? 'nm-inset !shadow-nm-pressed' : ''
                        }`}
                      >
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-sm nm-inset ${
                          (selections as any)[group] === item.id ? 'bg-accent text-bg' : 'text-accent/40'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold">{item.label}</p>
                          <p className="text-xs text-accent-muted">{item.note}</p>
                        </div>
                        <div className="text-sm font-black">
                          {item.price > 0 ? `+₱${item.price}` : 'Free'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
