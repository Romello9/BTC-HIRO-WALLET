import React, { useState } from 'react';
import Modal from './Modal';
import { Save } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [currency, setCurrency] = useState('USD');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSave = () => {
    // In a real app, this would save settings to a persistent state (e.g., localStorage)
    console.log({ currency, isDarkMode });
    alert('Impostazioni salvate!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Impostazioni">
      <div className="space-y-6">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-purple-200 mb-2">Valuta di Visualizzazione</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-white/10 border border-purple-500/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="USD" className="bg-slate-800">USD - Dollaro Americano</option>
            <option value="EUR" className="bg-slate-800">EUR - Euro</option>
            <option value="GBP" className="bg-slate-800">GBP - Sterlina Britannica</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Tema</label>
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <span className="text-white">Modalità Scura</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                isDarkMode ? 'bg-purple-600' : 'bg-gray-400'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <button 
          onClick={handleSave} 
          className="w-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-4"
        >
          <Save className="w-5 h-5" />
          Salva Impostazioni
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;