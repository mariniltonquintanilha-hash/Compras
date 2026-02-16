
import React from 'react';
import { ShoppingTotals } from '../types';
import { formatCurrency } from '../utils/formatters';

interface SummaryProps {
  totals: ShoppingTotals;
}

const Summary: React.FC<SummaryProps> = ({ totals }) => {
  return (
    <div className="bg-white border-y-2 border-gray-400 p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
      <div className="flex gap-6 text-sm md:text-base font-semibold">
        <div className="text-green-700">
          TOTAL COMPRADO: <span className="bg-green-100 px-2 py-1 rounded">{formatCurrency(totals.bought)}</span>
        </div>
        <div className="text-red-700">
          TOTAL PENDENTE: <span className="bg-red-100 px-2 py-1 rounded">{formatCurrency(totals.pending)}</span>
        </div>
      </div>
      <div className="text-lg md:text-2xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">
        TOTAL GERAL: {formatCurrency(totals.total)}
      </div>
    </div>
  );
};

export default Summary;
