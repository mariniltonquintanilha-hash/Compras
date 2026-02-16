
import React from 'react';
import { ShoppingItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ShoppingTableProps {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ShoppingTable: React.FC<ShoppingTableProps> = ({ 
  items, 
  onToggle, 
  onRemove, 
  selectedId, 
  onSelect 
}) => {
  // Sort by status (pending first, or bought last)
  const sortedItems = [...items].sort((a, b) => {
    if (a.bought === b.bought) return b.createdAt - a.createdAt;
    return a.bought ? 1 : -1;
  });

  return (
    <div className="flex-grow overflow-auto border border-gray-300 rounded-md bg-white shadow-inner">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead className="sticky top-0 bg-gray-200 z-10">
          <tr className="border-b border-gray-400">
            <th className="px-4 py-2 w-12 text-center">✓</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2 w-20 text-center">Qtd</th>
            <th className="px-4 py-2 w-32">Preço Unit</th>
            <th className="px-4 py-2 w-32">Subtotal</th>
            <th className="px-4 py-2 w-24 text-center">Status</th>
            <th className="px-4 py-2 w-16 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {sortedItems.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-gray-500 italic">
                Sua lista está vazia. Adicione itens abaixo!
              </td>
            </tr>
          ) : (
            sortedItems.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`cursor-pointer transition-colors duration-200 ${
                  item.id === selectedId ? 'outline outline-2 outline-blue-400 z-10 relative' : ''
                } ${item.bought ? 'bg-[#90EE90]/40' : 'bg-[#FFB6C1]/40'}`}
              >
                <td className="px-4 py-2 text-center" onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}>
                  <input 
                    type="checkbox" 
                    checked={item.bought} 
                    onChange={() => {}} 
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className={`px-4 py-2 font-medium ${item.bought ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.name}
                </td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
                <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                <td className="px-4 py-2 font-bold">{formatCurrency(item.price * item.quantity)}</td>
                <td className="px-4 py-2 text-center text-xl">
                  {item.bought ? '✅' : '❌'}
                </td>
                <td className="px-4 py-2 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                    title="Remover Item"
                    className="text-red-600 hover:text-red-800 font-bold p-1 rounded-full hover:bg-red-100 transition-colors"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingTable;
