import React, { useState } from 'react';
import Modal from './Modal';
import { Copy, Check } from 'lucide-react';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const ReceiveModal: React.FC<ReceiveModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(walletAddress)}&bgcolor=1E293B&color=FFFFFF&qzone=1`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ricevi Asset">
        <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-white p-4 rounded-2xl border-4 border-purple-500/50">
                 <img src={qrCodeUrl} alt="Wallet Address QR Code" width="200" height="200" />
            </div>
            
            <div>
                 <p className="text-purple-200 text-sm mb-2">Il tuo Indirizzo Wallet</p>
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
                    <p className="text-white font-mono break-all">{walletAddress}</p>
                    <button 
                        onClick={handleCopy}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Copy wallet address"
                    >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white" />}
                    </button>
                </div>
            </div>

            <p className="text-gray-400 text-xs max-w-xs">
                Condividi questo indirizzo o il codice QR per ricevere Bitcoin (BTC) o Stacks (STX) nel tuo wallet.
            </p>
        </div>
    </Modal>
  );
};

export default ReceiveModal;
