import React, { useState } from 'react';
import Modal from './Modal';
import { analyzeTransaction } from '../services/geminiService';
import { ArrowDownToLine, Send, Sparkles, LoaderCircle } from 'lucide-react';

interface Transaction {
    id: number;
    type: 'receive' | 'send';
    amount: string;
    date: string;
    status: 'completed' | 'pending';
}

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ isOpen, onClose, transaction }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!transaction) return;
        setIsLoading(true);
        setAnalysis('');
        const result = await analyzeTransaction(transaction);
        setAnalysis(result);
        setIsLoading(false);
    };

    if (!transaction) return null;

    const isReceive = transaction.type === 'receive';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Dettagli Transazione">
            <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isReceive ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                        {isReceive ? <ArrowDownToLine className="w-6 h-6" /> : <Send className="w-6 h-6" />}
                    </div>
                    <div>
                        <p className={`text-2xl font-bold ${isReceive ? 'text-green-400' : 'text-blue-400'}`}>
                            {transaction.amount}
                        </p>
                        <p className="text-white font-semibold">
                            {isReceive ? 'Ricevuto' : 'Inviato'}
                        </p>
                    </div>
                </div>

                <div className="text-sm space-y-2 text-gray-300">
                    <div className="flex justify-between"><span className="font-semibold text-gray-400">Data:</span> <span>{transaction.date}</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-400">Stato:</span> <span className={`capitalize font-medium ${transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{transaction.status === 'completed' ? 'Completata' : 'In attesa'}</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-400">ID Transazione:</span> <span className="font-mono text-xs">txid_{transaction.id}_placeholder</span></div>
                </div>
                
                <div className="border-t border-purple-500/20 pt-4">
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="w-full bg-hiro-purple hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                    >
                        {isLoading ? (
                            <>
                                <LoaderCircle className="w-5 h-5 animate-spin" />
                                Analisi in corso...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Analizza con Gemini AI
                            </>
                        )}
                    </button>

                    {analysis && (
                        <div className="mt-4 bg-black/30 p-4 rounded-lg text-sm text-purple-100 whitespace-pre-wrap">
                           <h4 className="font-bold mb-2 text-white">Risultato Analisi:</h4>
                           {analysis}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default TransactionDetailModal;
