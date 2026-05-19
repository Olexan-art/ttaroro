import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tarotDeck, type TarotCard } from '../data/tarot-data';
import { TarotCardView } from '../components/TarotCardView';
import { X } from 'lucide-react';

export const Glossary: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  return (
    <div className="py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-mystic-accent mb-4">Глосарій Таро</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Вивчіть значення та символіку Старших Арканів.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tarotDeck.map((card) => (
          <TarotCardView
            key={card.id}
            card={card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mystic-950/80 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-6 md:p-8 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/3 flex-shrink-0">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full rounded-xl shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(selectedCard.name)}`;
                  }}
                />
              </div>

              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-mystic-accent mb-2">
                  {selectedCard.value}. {selectedCard.name}
                </h2>
                <div className="inline-block bg-mystic-800/50 text-mystic-300 px-3 py-1 rounded-full text-sm font-medium mb-6 self-start">
                  Старші Аркани
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 border-b border-mystic-700 pb-2">Пряме положення</h3>
                    <p>{selectedCard.meaning_up}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 border-b border-mystic-700 pb-2">Перевернуте положення</h3>
                    <p>{selectedCard.meaning_rev}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 border-b border-mystic-700 pb-2">Опис</h3>
                    <p className="leading-relaxed">{selectedCard.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
