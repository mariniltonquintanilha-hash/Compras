
import React, { useState } from 'react';

interface AddItemFormProps {
  onAdd: (name: string, price: number, quantity: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(priceStr.replace(',', '.'));
    
    if (!name.trim()) {
      alert('O nome do item não pode estar vazio!');
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      alert('Por favor, insira um preço válido maior que zero!');
      return;
    }

    onAdd(name.trim(), price, quantity);
    
    // Reset form
    setName('');
    setPriceStr('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-wrap gap-4 items-end">
      <div className="flex flex-col flex-grow min-w-[200px]">
        <label className="text-sm font-bold text-gray-700 mb-1">Nome do Item</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Arroz 5kg"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col w-32">
        <label className="text-sm font-bold text-gray-700 mb-1">Preço (R$)</label>
        <input 
          type="text" 
          value={priceStr}
          onChange={(e) => setPriceStr(e.target.value.replace(/[^0-9,.]/g, ''))}
          placeholder="0,00"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col w-24">
        <label className="text-sm font-bold text-gray-700 mb-1">Qtd</label>
        <input 
          type="number" 
          min="1" 
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button 
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors shadow-sm flex items-center gap-2"
      >
        <span>ADICIONAR</span>
        <span>✓</span>
      </button>
    </form>
  );
};

export default AddItemForm;
