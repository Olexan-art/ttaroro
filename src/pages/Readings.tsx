import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomCards, type TarotCard } from '../data/tarot-data';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

export const Readings: React.FC = () => {
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCards = () => {
    setIsDrawing(true);
    setCards([]);

    setTimeout(() => {
      const drawn = getRandomCards(3).map(card => ({
        ...card,
        isReversed: Math.random() > 0.5
      }));
      setCards(drawn);
      setIsDrawing(false);
    }, 1000);
  };

  const positions = ["Минуле", "Сьогодення", "Майбутнє"];

  return (
    <div className="py-8 min-h-[80vh] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-mystic-accent mb-4">Ворожіння: Три Карти</h1>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
          Зосередьтеся на своєму питанні. Коли будете готові, натисніть кнопку, щоб витягнути три карти, які розкриють ваше минуле, сьогодення та майбутнє.
        </p>

        <button
          onClick={drawCards}
          disabled={isDrawing}
          className="glass px-8 py-4 rounded-full text-xl font-semibold text-mystic-accent hover:bg-mystic-800/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDrawing ? "Тасування колоди..." : "Витягнути карти"}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-8">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              initial={{ opacity: 0, y: 100, rotateY: 90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.4, duration: 0.8, type: "spring" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-white mb-4 bg-mystic-900/80 px-6 py-2 rounded-full border border-mystic-700">
                {positions[index]}
              </h3>

              <div className="glass p-4 rounded-2xl w-full max-w-sm flex flex-col items-center">
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-6 shadow-2xl">
                  <motion.img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${card.isReversed ? 'rotate-180' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(card.name)}`;
                    }}
                  />
                </div>

                <h4 className="text-2xl font-bold text-mystic-accent text-center mb-2">
                  {card.name} {card.isReversed ? "(Перевернута)" : ""}
                </h4>

                <p className="text-slate-300 text-center text-sm leading-relaxed">
                  {card.isReversed ? card.meaning_rev : card.meaning_up}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
