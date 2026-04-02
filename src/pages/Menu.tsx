import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface SizeOption {
  id: string;
  label: string;
  modifier: number;
}

const drinkSizes: SizeOption[] = [
  { id: 'small', label: 'Small', modifier: 0 },
  { id: 'medium', label: 'Medium', modifier: 20 },
  { id: 'large', label: 'Large', modifier: 40 },
];

const cookieSizes: SizeOption[] = [
  { id: 'regular', label: 'Regular', modifier: 0 },
  { id: 'large', label: 'Large', modifier: 40 },
];

const isCookieItem = (name: string) => /cookie/i.test(name);

const getSizeOptions = (product: Product) => {
  if (product.category === 'coffee' || product.category === 'non-coffee') {
    return drinkSizes;
  }

  if (product.category === 'pastries' && isCookieItem(product.name)) {
    return cookieSizes;
  }

  return [];
};

const getDefaultSize = (product: Product) => {
  const options = getSizeOptions(product);
  return options.length ? options[0].id : '';
};

const getPriceForSelection = (product: Product, selection: string) => {
  const options = getSizeOptions(product);
  const option = options.find(o => o.id === selection);
  return product.price + (option?.modifier || 0);
};

const products: Product[] = [
  // Pastries
  { id: 'p1', name: 'Red Velvet Cookie', price: 60, category: 'pastries', description: 'Soft and chewy red velvet cookie with a hint of cocoa.', image: '/img/redvel.png' },
  { id: 'p2', name: 'Chocolate Chip Cookie', price: 60, category: 'pastries', description: 'Classic chocolate chip cookie loaded with chocolate chunks.', image: '/img/chochip.png' },
  { id: 'p3', name: 'Matcha Cookie', price: 60, category: 'pastries', description: 'Earthy matcha cookie with a soft, buttery center.', image: '/img/match.png' },
  { id: 'p4', name: "S'mores Cookie", price: 80, category: 'pastries', description: "Gooey graham, chocolate, and marshmallow cookie inspired by s'mores.", image: '/img/smores.png' },
  { id: 'p5', name: 'Oatmeal Walnut Cookie', price: 80, category: 'pastries', description: 'Hearty oatmeal cookie with crunchy walnut pieces.', image: '/img/oatwa.png' },
  { id: 'p6', name: 'Biscoff Cookie', price: 80, category: 'pastries', description: 'Caramelized Biscoff cookie with a warm, spiced sweetness.', image: '/img/bisc.png' },
  { id: 'p7', name: 'Brownies', price: 110, category: 'pastries', description: 'Rich, fudgy brownie with a crisp top and soft center.', image: '/img/brown.png' },
  { id: 'p8', name: 'Crinkles', price: 150, category: 'pastries', description: 'Soft, chocolatey crinkles dusted with powdered sugar.', image: '/img/crink.png' },
  { id: 'p9', name: 'Mixed Pastries Box', price: 150, category: 'pastries', description: 'Assorted selection of our best-selling pastries in one box.', image: '/img/mix.png' },
  // Coffee
  { id: 'c1', name: 'Latte', price: 100, category: 'coffee', description: 'Smooth espresso with steamed milk for a creamy latte.', image: '/img/latte.png' },
  { id: 'c2', name: 'Americano', price: 95, category: 'coffee', description: 'Bold and straightforward brewed espresso with hot water.', image: '/img/americano.png' },
  { id: 'c3', name: 'Espresso', price: 100, category: 'coffee', description: 'Intense single shot of espresso for a strong coffee kick.', image: '/img/espresso.png' },
  { id: 'c4', name: 'Cappuccino', price: 110, category: 'coffee', description: 'Espresso with equal parts steamed milk and foam for a balanced cup.', image: '/img/cappuccino.png' },
  { id: 'c5', name: 'Brown Sugar Latte', price: 120, category: 'coffee', description: 'Creamy latte sweetened with rich brown sugar syrup.', image: '/img/brownsugarL.png' },
  // Non-Coffee
  { id: 'n1', name: 'Milosaurus', price: 120, category: 'non-coffee', description: 'Thick, chocolatey Milo drink topped with extra Milo powder.', image: '/img/milo.png' },
  { id: 'n2', name: 'Matcha Latte', price: 120, category: 'non-coffee', description: 'Creamy matcha latte with a smooth, lightly sweet finish.', image: '/img/matchlatte.png' },
  { id: 'n3', name: 'Chocolate Milk', price: 120, category: 'non-coffee', description: 'Cold, creamy chocolate milk perfect for non-coffee lovers.', image: '/img/chocmilk.png' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateSelection = (productId: string, sizeId: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: sizeId }));
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const sizeSelection = selectedSizes[product.id] || getDefaultSize(product);
    const price = getPriceForSelection(product, sizeSelection);
    const sizeLabel = getSizeOptions(product).find(option => option.id === sizeSelection)?.label;
    const displayName = sizeLabel ? `${product.name} (${sizeLabel})` : product.name;

    const newCart = [...cart];
    const existing = newCart.find(item => item.name === displayName);
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({
        name: displayName,
        price,
        image: product.image,
        quantity: 1
      });
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage')); // Trigger update in layout
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <h1 className="text-6xl font-black tracking-tighter">Menu</h1>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="nm-input w-full pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4">
        {['all', 'pastries', 'coffee', 'non-coffee'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`nm-button !px-8 !py-3 text-sm capitalize ${
              activeCategory === cat ? 'nm-inset text-accent' : 'text-accent-muted'
            }`}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const sizeOptions = getSizeOptions(product);
            const selectedSize = selectedSizes[product.id] || getDefaultSize(product);
            const displayPrice = getPriceForSelection(product, selectedSize);

            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group nm-flat p-4 rounded-[2.5rem] flex flex-col h-full hover:nm-hover transition-all"
              >
                <div className="relative aspect-square rounded-[2rem] overflow-hidden nm-inset p-1 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-[1.8rem] group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                    <p className="text-bg text-sm font-bold leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex-grow space-y-4 px-2">
                  <div>
                    <h3 className="text-xl font-black tracking-tight">{product.name}</h3>
                    <p className="text-2xl font-bold text-accent-muted">₱{displayPrice}</p>
                  </div>

                  {sizeOptions.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-accent-muted">Choose size</p>
                      <div className="flex flex-wrap gap-2">
                        {sizeOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateSelection(product.id, option.id)}
                            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
                              selectedSize === option.id
                                ? 'nm-inset bg-accent text-bg border-accent'
                                : 'border-accent/20 text-accent-muted hover:border-accent hover:text-accent'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => addToCart(product)}
                  className="mt-4 nm-button w-full flex items-center justify-center gap-2 group/btn"
                >
                  <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
                  Add to Cart
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 nm-inset rounded-[3rem]">
          <p className="text-xl font-bold text-accent-muted">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
