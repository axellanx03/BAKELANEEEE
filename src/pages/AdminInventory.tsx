import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

export default function AdminInventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Flour', quantity: 50, unit: 'kg', status: 'In Stock' },
    { id: 2, name: 'Sugar', quantity: 25, unit: 'kg', status: 'Low Stock' },
    { id: 3, name: 'Butter', quantity: 10, unit: 'kg', status: 'In Stock' },
    { id: 4, name: 'Eggs', quantity: 200, unit: 'pieces', status: 'In Stock' },
    { id: 5, name: 'Chocolate Chips', quantity: 5, unit: 'kg', status: 'Low Stock' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', quantity: '', unit: '', status: 'In Stock' });

  const totalItems = useMemo(() => inventory.length, [inventory]);

  const resetForm = () => {
    setFormData({ name: '', quantity: '', unit: '', status: 'In Stock' });
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <Link to="/admin" className="inline-flex items-center gap-2 nm-button !px-4 !py-2 text-sm mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Inventory Management</h1>
          <p className="text-accent-muted font-medium mt-2">Manage your stock levels and supplies</p>
          <p className="text-accent-muted text-sm">Total items: {totalItems}</p>
        </div>
        <button onClick={() => { resetForm(); setIsAdding(true); }} className="nm-button !px-6 !py-3 flex items-center gap-2">
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {(isAdding || editingId !== null) && (
        <div className="nm-flat p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">{editingId !== null ? 'Edit Item' : 'Add New Item'}</h2>
            <button onClick={() => { resetForm(); setIsAdding(false); }} className="nm-button !px-3 !py-1">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="nm-input"
              placeholder="Item name"
              autoFocus
            />
            <input
              value={formData.quantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
              className="nm-input"
              placeholder="Quantity"
              type="number"
              min={0}
            />
            <input
              value={formData.unit}
              onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
              className="nm-input"
              placeholder="Unit (e.g. kg, pieces)"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="nm-input"
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <button
            onClick={() => {
              const quantity = Number(formData.quantity);
              if (!formData.name.trim() || !formData.unit.trim() || Number.isNaN(quantity) || quantity < 0) {
                alert('Please provide valid item details.');
                return;
              }

              if (editingId !== null) {
                setInventory((prev) => prev.map((item) => (item.id === editingId ? { ...item, name: formData.name, quantity, unit: formData.unit, status: formData.status } : item)));
              } else {
                const nextId = inventory.length ? Math.max(...inventory.map((item) => item.id)) + 1 : 1;
                setInventory((prev) => [...prev, { id: nextId, name: formData.name.trim(), quantity, unit: formData.unit.trim(), status: formData.status }]);
              }

              resetForm();
              setIsAdding(false);
            }}
            className="nm-button !px-6 !py-3 flex items-center gap-2"
          >
            <Save size={18} />
            Save Item
          </button>
        </div>
      )}

      <div className="nm-flat p-8 rounded-[2rem] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="nm-inset p-6 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black">{item.name}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-accent-muted">Quantity: {item.quantity} {item.unit}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setFormData({ name: item.name, quantity: String(item.quantity), unit: item.unit, status: item.status });
                    setIsAdding(true);
                  }}
                  className="nm-button !px-4 !py-2 text-sm flex items-center gap-1"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${item.name}?`)) {
                      setInventory((prev) => prev.filter((inventoryItem) => inventoryItem.id !== item.id));
                    }
                  }}
                  className="nm-button !px-4 !py-2 !bg-red-500 text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}