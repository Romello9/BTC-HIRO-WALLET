import React, { useState } from 'react';
import { Wallet, Send, ArrowDownToLine, History, Settings, TrendingUp, Copy, Check } from 'lucide-react';
import SendModal from './SendModal';
import ReceiveModal from './ReceiveModal';
import TradingModal from './TradingModal';
import TransactionDetailModal from './TransactionDetailModal';
import WalletManagerModal from './WalletManagerModal';
import SettingsModal from './SettingsModal';

// Define transaction type for clarity
type Transaction = {
  id: number;
  type: 'receive' | 'send';
  amount: string;
  date: string;
  status: 'completed' | 'pending';
};

export default function WalletInterface() {
  const [balance] = useState({
    btc: '0.00234567',
    stx: '1,234.56',
    usd: '2,847.32'
  });
  const [copied, setCopied] = useState(false);
  const walletAddress = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';

  // State for modals
  const [isSendModalOpen, setSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isTradingModalOpen, setTradingModalOpen] = useState(false);
  const [isWalletManagerModalOpen, setWalletManagerModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const transactions: Transaction[] = [
    { id: 1, type: 'receive', amount: '+0.001 BTC', date: '2025-10-19', status: 'completed' },
    { id: 2, type: 'send', amount: '-0.0005 BTC', date: '2025-10-18', status: 'completed' },
    { id: 3, type: 'receive', amount: '+500 STX', date: '2025-10-17', status: 'completed' },
    { id: 4, type: 'send', amount: '-0.002 BTC', date: '2025-10-16', status: 'pending' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl" role="img" aria-label="Pizza logo">🍕</span>
                <h1 className="text-2xl font-bold text-white">BTC Hiro Wallet</h1>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setWalletManagerModalOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Manage wallets"
                >
                  <Wallet className="w-6 h-6 text-gray-300" />
                </button>
                <button 
                  onClick={() => setSettingsModalOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Open settings"
                >
                  <Settings className="w-6 h-6 text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-purple-600 to-orange-500 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl shadow-purple-900/50">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-purple-100 text-sm mb-1">Saldo Totale</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">${balance.usd}</h2>
              </div>
              <span className="text-5xl" role="img" aria-label="Pizza logo">🍕</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-xs mb-1">Bitcoin</p>
                <p className="text-white text-xl font-semibold">{balance.btc} BTC</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-xs mb-1">Stacks</p>
                <p className="text-white text-xl font-semibold">{balance.stx} STX</p>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-purple-100 text-xs mb-2">Indirizzo Wallet</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-white text-sm font-mono truncate">{walletAddress}</p>
                <button 
                  onClick={handleCopy}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Copy wallet address"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <button 
              onClick={() => setReceiveModalOpen(true)}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-purple-500/30 rounded-2xl p-4 md:p-6 transition-all hover:scale-105 transform"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ArrowDownToLine className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold text-sm md:text-base">Ricevi</p>
            </button>
            
            <button 
              onClick={() => setSendModalOpen(true)}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-purple-500/30 rounded-2xl p-4 md:p-6 transition-all hover:scale-105 transform"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Send className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold text-sm md:text-base">Invia</p>
            </button>
            
            <button 
              onClick={() => setTradingModalOpen(true)}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-purple-500/30 rounded-2xl p-4 md:p-6 transition-all hover:scale-105 transform"
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold text-sm md:text-base">Trading</p>
            </button>
          </div>

          {/* Transactions */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5" />
                Transazioni Recenti
              </h3>
            </div>

            <div className="space-y-3">
              {transactions.map((tx) => (
                <div 
                  key={tx.id}
                  onClick={() => handleTransactionClick(tx)}
                  className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        tx.type === 'receive' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {tx.type === 'receive' ? (
                          <ArrowDownToLine className="w-5 h-5" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {tx.type === 'receive' ? 'Ricevuto' : 'Inviato'}
                        </p>
                        <p className="text-gray-400 text-sm">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        tx.type === 'receive' ? 'text-green-400' : 'text-blue-400'
                      }`}>
                        {tx.amount}
                      </p>
                      <p className={`text-xs capitalize ${
                        tx.status === 'completed' ? 'text-gray-400' : 'text-yellow-400'
                      }`}>
                        {tx.status === 'completed' ? 'Completata' : 'In attesa'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 pb-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              Powered by Stacks & Bitcoin | Hiro Wallet
            </p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <SendModal isOpen={isSendModalOpen} onClose={() => setSendModalOpen(false)} />
      <ReceiveModal isOpen={isReceiveModalOpen} onClose={() => setReceiveModalOpen(false)} walletAddress={walletAddress} />
      <TradingModal isOpen={isTradingModalOpen} onClose={() => setTradingModalOpen(false)} />
      <WalletManagerModal isOpen={isWalletManagerModalOpen} onClose={() => setWalletManagerModalOpen(false)} walletAddress={walletAddress}/>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      <TransactionDetailModal 
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </>
  );
}