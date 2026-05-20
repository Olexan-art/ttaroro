import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TarotCard } from '../data/tarot-data';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

interface ReadingResult {
  id: string;
  date: string;
  type: string;
  cards: DrawnCard[];
  conclusion: string;
}

export const Profile: React.FC = () => {
  const [history, setHistory] = useState<ReadingResult[]>(() => {
    const saved = localStorage.getItem('tarot_history');
    return saved ? JSON.parse(saved) : [];
  });

  const clearHistory = () => {
    if (window.confirm('Ви впевнені, що хочете очистити історію ворожінь?')) {
      localStorage.removeItem('tarot_history');
      setHistory([]);
    }
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-mystic-accent mb-2">Особистий Кабінет</h1>
                <p className="text-slate-300 font-sans text-lg">Ваша історія запитів до Всесвіту</p>
            </div>
            {history.length > 0 && (
                <button
                    onClick={clearHistory}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-4 py-2 rounded-full"
                >
                    Очистити історію
                </button>
            )}
        </div>

        {history.length === 0 ? (
            <div className="text-center glass p-12 rounded-3xl mt-8">
                <div className="text-6xl mb-4 opacity-50">🌙</div>
                <h3 className="text-2xl font-serif text-mystic-accent mb-2">Історія порожня</h3>
                <p className="text-slate-400 font-sans">Ви ще не робили розкладів. Зробіть своє перше ворожіння!</p>
            </div>
        ) : (
            <div className="space-y-8 mt-8">
                <AnimatePresence>
                    {history.map((reading, idx) => (
                        <motion.div
                            key={reading.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 rounded-2xl border-l-4 border-l-mystic-accent"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-400 text-sm font-sans">{reading.date}</span>
                                <span className="bg-mystic-800/80 px-3 py-1 rounded-full text-xs font-serif text-mystic-accent uppercase tracking-wider">
                                    {reading.type === 'single' ? 'Карта Дня' : reading.type === 'three' ? 'Три Карти' : 'Хрест'}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-4">
                                {reading.cards.map((card: DrawnCard, cIdx: number) => (
                                    <div key={cIdx} className="flex items-center gap-2 bg-mystic-900/50 px-3 py-2 rounded-lg border border-white/5">
                                        <div className="w-8 h-12 overflow-hidden rounded">
                                            <img src={card.image} alt={card.name} className={`w-full h-full object-cover ${card.isReversed ? 'rotate-180' : ''}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200">{card.name}</p>
                                            <p className="text-xs text-slate-400">{card.isReversed ? 'Перевернута' : 'Пряма'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {reading.conclusion && (
                                <div className="mt-4 p-4 bg-mystic-900/30 rounded-xl border border-white/5">
                                    <h4 className="text-sm font-serif text-mystic-accent mb-2">Висновки:</h4>
                                    <p className="text-slate-300 text-sm font-sans italic">{reading.conclusion}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}

      </motion.div>
    </div>
  );
};
