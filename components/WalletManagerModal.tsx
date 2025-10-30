import React from 'react';
import Modal from './Modal';
import { PlusCircle, Download } from 'lucide-react';

interface WalletManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const WalletManagerModal: React.FC<WalletManagerModalProps> = ({ isOpen, onClose, walletAddress }) => {

  const handleCreate = () => {
    alert("Funzionalità 'Crea Nuovo Wallet' non ancora implementata.");
  };

  const handleImport = () => {
    alert("Funzionalità 'Importa Wallet' non ancora implementata.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gestisci Wallet">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-purple-200 mb-2">Wallet Attuale</h4>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white font-semibold">Wallet Principale</p>
            <p className="text-gray-400 text-sm font-mono truncate">{walletAddress}</p>
          </div>
        </div>
        
        <div className="space-y-3">
           <button 
              onClick={handleCreate}
              className="w-full bg-white/10 hover:bg-white/20 border border-purple-500/30 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Crea Nuovo Wallet
            </button>
             <button 
              onClick={handleImport}
              className="w-full bg-white/10 hover:bg-white/20 border border-purple-500/30 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Importa Wallet
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletManagerModal;