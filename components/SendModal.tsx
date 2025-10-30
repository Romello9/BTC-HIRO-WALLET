import React, { useState } from 'react';
import Modal from './Modal';
import { Send } from 'lucide-react';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose }) => {
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger the transaction sending logic.
    console.log({
      action: 'send',
      asset,
      amount,
      recipient
    });
    alert(`Inviato ${amount} ${asset} a ${recipient}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invia Asset">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-purple-200 mb-2">Indirizzo Destinatario</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-white/10 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="SP2J6Z...KKNRV9EJ7"
            required
          />
        </div>

        <div className="flex gap-4">
            <div className="w-2/3">
                <label htmlFor="amount" className="block text-sm font-medium text-purple-200 mb-2">Importo</label>
                <input
                    type="number"
                    id="amount"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/10 border border-purple-500/30 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="0.00"
                    required
                />
            </div>
            <div className="w-1/3">
                <label htmlFor="asset" className="block text-sm font-medium text-purple-200 mb-2">Asset</label>
                 <select
                    id="asset"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    className="w-full bg-white/10 border border-purple-500/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                    <option value="BTC" className="bg-slate-800">BTC</option>
                    <option value="STX" className="bg-slate-800">STX</option>
                </select>
            </div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
          <Send className="w-5 h-5" />
          Conferma Invio
        </button>
      </form>
    </Modal>
  );
};

export default SendModal;
