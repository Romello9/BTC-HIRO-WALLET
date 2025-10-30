import React, { useState } from 'react';
import Modal from './Modal';
import { RefreshCw } from 'lucide-react';

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradingModal: React.FC<TradingModalProps> = ({ isOpen, onClose }) => {
  const [fromAmount, setFromAmount] = useState('1');
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('STX');
  
  // Dummy exchange rate
  const exchangeRate = 35000; // 1 BTC = 35000 STX

  const toAmount = (parseFloat(fromAmount) * exchangeRate).toFixed(2);

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Swap ${fromAmount} ${fromAsset} for ${toAmount} ${toAsset}`);
    alert('Funzionalità di trading non ancora implementata.');
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trading / Swap">
      <form onSubmit={handleSwap} className="space-y-4">
        <div className="bg-white/10 border border-purple-500/30 rounded-lg p-4">
          <label htmlFor="fromAmount" className="block text-sm font-medium text-purple-200 mb-1">Paghi</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="fromAmount"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none"
            />
            <select
              value={fromAsset}
              onChange={(e) => setFromAsset(e.target.value)}
              className="bg-purple-600 text-white rounded-md p-2 font-semibold focus:outline-none"
            >
              <option value="BTC">BTC</option>
              <option value="STX">STX</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center my-2">
            <button type="button" className="p-2 bg-slate-700 rounded-full text-purple-300 hover:rotate-180 transition-transform">
                <RefreshCw className="w-5 h-5" />
            </button>
        </div>

        <div className="bg-white/10 border border-purple-500/30 rounded-lg p-4">
          <label htmlFor="toAmount" className="block text-sm font-medium text-purple-200 mb-1">Ricevi</label>
          <div className="flex items-center gap-2">
             <input
              type="text"
              id="toAmount"
              value={isNaN(parseFloat(toAmount)) ? '0.00' : toAmount}
              readOnly
              className="w-full bg-transparent text-2xl font-bold text-gray-300 focus:outline-none"
            />
            <select
              value={toAsset}
              onChange={(e) => setToAsset(e.target.value)}
              className="bg-purple-600 text-white rounded-md p-2 font-semibold focus:outline-none"
            >
              <option value="STX">STX</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </div>
        
        <div className="text-center text-sm text-purple-200 pt-2">
            <p>1 {fromAsset} ≈ {exchangeRate} {toAsset}</p>
        </div>

        <button type="submit" className="w-full bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-4">
          Esegui Swap
        </button>
      </form>
    </Modal>
  );
};

export default TradingModal;
