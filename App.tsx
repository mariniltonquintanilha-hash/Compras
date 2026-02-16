
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ShoppingItem, ShoppingTotals } from './types';
import ShoppingTable from './components/ShoppingTable';
import AddItemForm from './components/AddItemForm';
import Summary from './components/Summary';

const STORAGE_KEY = 'shopping_list_v1';

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [changeCount, setChangeCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar do LocalStorage", e);
      }
    }
  }, []);

  // Auto-save logic (every 5 changes)
  useEffect(() => {
    if (changeCount >= 5) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setChangeCount(0);
      console.log("Auto-save realizado!");
    }
  }, [changeCount, items]);

  const incrementChanges = () => setChangeCount(prev => prev + 1);

  const handleAddItem = (name: string, price: number, quantity: number) => {
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name,
      price,
      quantity,
      bought: false,
      createdAt: Date.now()
    };
    setItems(prev => [newItem, ...prev]);
    incrementChanges();
  };

  const handleToggle = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, bought: !item.bought } : item
    ));
    incrementChanges();
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (selectedId === id) setSelectedId(null);
    incrementChanges();
  };

  const handleClear = () => {
    if (items.length === 0) return;
    if (confirm('Tem certeza que deseja limpar TODA a lista?')) {
      setItems([]);
      setSelectedId(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSaveJson = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compras.json';
    link.click();
    URL.revokeObjectURL(url);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    alert('Lista salva com sucesso!');
  };

  const handleLoadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const loadedItems = JSON.parse(result);
        if (Array.isArray(loadedItems)) {
          setItems(loadedItems);
          localStorage.setItem(STORAGE_KEY, result);
          alert('Lista carregada com sucesso!');
        }
      } catch (err) {
        alert('Erro ao carregar arquivo JSON inválido.');
      }
    };
    reader.readAsText(file);
    // Clear input value to allow reloading the same file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totals: ShoppingTotals = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    acc.total += itemTotal;
    if (item.bought) {
      acc.bought += itemTotal;
    } else {
      acc.pending += itemTotal;
    }
    return acc;
  }, { bought: 0, pending: 0, total: 0 });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveJson();
      }
      if (e.key === 'Delete' && selectedId) {
        e.preventDefault();
        handleRemoveItem(selectedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, items]);

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 md:p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4 rounded-t-lg shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>🛒</span> LISTA DE COMPRAS
        </h1>
        <div className="text-xs opacity-80 hidden md:block">
          Ctrl+S: Salvar | Del: Remover Selecionado
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col bg-white shadow-xl overflow-hidden">
        <ShoppingTable 
          items={items} 
          onToggle={handleToggle} 
          onRemove={handleRemoveItem}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        
        <Summary totals={totals} />
      </div>

      {/* Form and Action Buttons */}
      <div className="mt-4 flex flex-col gap-4">
        <AddItemForm onAdd={handleAddItem} />

        <div className="flex flex-wrap gap-2 justify-center md:justify-between p-2 bg-gray-200 rounded-lg border border-gray-300">
          <div className="flex gap-2">
            <button 
              onClick={() => selectedId ? handleRemoveItem(selectedId) : alert('Selecione um item na tabela primeiro!')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold text-sm transition-colors shadow-sm"
              title="Remover item selecionado"
            >
              REMOVER
            </button>
            <button 
              onClick={handleClear}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm transition-colors shadow-sm"
              title="Limpar toda a lista"
            >
              LIMPAR
            </button>
          </div>

          <div className="flex gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".json" 
              onChange={handleLoadJson} 
            />
            <button 
              onClick={handleSaveJson}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-sm transition-colors shadow-sm"
              title="Salvar como compras.json (Ctrl+S)"
            >
              SALVAR
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold text-sm transition-colors shadow-sm"
              title="Carregar de um arquivo JSON"
            >
              CARREGAR
            </button>
            <button 
              onClick={() => confirm('Deseja fechar a aplicação?') && window.close()}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm transition-colors shadow-sm"
            >
              SAIR
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-4 text-center text-gray-500 text-xs italic">
        * A lista é salva automaticamente a cada 5 mudanças.
      </footer>
    </div>
  );
};

export default App;
