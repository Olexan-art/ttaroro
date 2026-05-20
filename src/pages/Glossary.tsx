import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tarotDeck, type TarotCard } from '../data/tarot-data';

export const Glossary: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TarotCard>(tarotDeck[0]);

  // Extract other cards to use as "related" links (excluding the currently selected one)
  const relatedCards = tarotDeck.filter(c => c.id !== selectedCard.id).slice(0, 5);

  return (
    <div className="py-8 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-[calc(100vh-140px)]">
      {/* Sidebar - Wiki Navigation */}
      <div className="w-full lg:w-1/4 flex-shrink-0 glass rounded-2xl overflow-hidden flex flex-col h-full border border-mystic-accent/20">
        <div className="p-4 bg-mystic-900/80 border-b border-mystic-accent/20">
          <h2 className="text-xl font-serif font-bold text-mystic-accent">Аркани</h2>
        </div>
        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
          {tarotDeck.map(card => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors mb-1 ${
                selectedCard.id === card.id
                  ? 'bg-mystic-accent/20 text-mystic-accent font-medium border border-mystic-accent/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {card.value}. {card.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Wiki Article */}
      <div className="flex-1 glass rounded-2xl p-6 lg:p-10 overflow-y-auto custom-scrollbar border border-mystic-accent/20">
        <motion.div
          key={selectedCard.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-8 mb-10 pb-10 border-b border-mystic-accent/10">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.15)] border border-mystic-accent/30 group">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(selectedCard.name)}`;
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-mystic-accent mb-4">
                {selectedCard.name}
              </h1>

              <div className="flex gap-3 mb-6">
                <span className="bg-mystic-800/80 px-4 py-1.5 rounded-full text-sm font-serif text-mystic-300 border border-white/5">
                  Старші Аркани
                </span>
                <span className="bg-mystic-800/80 px-4 py-1.5 rounded-full text-sm font-serif text-mystic-300 border border-white/5">
                  Номер: {selectedCard.value}
                </span>
              </div>

              <div className="glass p-6 rounded-xl bg-mystic-900/50 mb-8 border border-white/5">
                <h3 className="text-lg font-serif font-bold text-white mb-3">Короткий огляд</h3>
                <p className="text-slate-300 italic">"{selectedCard.meaning_up}"</p>
              </div>

              {/* Wiki-style Table of Contents could go here */}
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-serif font-bold text-mystic-accent mb-4 flex items-center gap-2">
                <span className="text-mystic-700">✦</span> Детальний опис
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {selectedCard.desc}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="glass p-6 rounded-xl border border-mystic-accent/10">
                <h2 className="text-xl font-serif font-bold text-mystic-accent mb-4 border-b border-mystic-accent/20 pb-2">
                  Пряме положення
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  У прямому положенні карта "{selectedCard.name}" традиційно означає: <strong>{selectedCard.meaning_up}</strong>.
                  Це вказує на гармонійний розвиток подій, сильні сторони архетипу та позитивний вплив енергії карти на ваш запит.
                </p>
              </section>

              <section className="glass p-6 rounded-xl border border-fuchsia-500/10">
                <h2 className="text-xl font-serif font-bold text-fuchsia-400 mb-4 border-b border-fuchsia-500/20 pb-2">
                  Перевернуте положення
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  У перевернутому положенні значення змінюється на: <strong>{selectedCard.meaning_rev}</strong>.
                  Це може вказувати на заблоковану енергію, внутрішні конфлікти, або необхідність звернути увагу на тіньову сторону архетипу.
                </p>
              </section>
            </div>

            <section className="pt-8 border-t border-mystic-accent/10">
              <h2 className="text-xl font-serif font-bold text-mystic-accent mb-4">Пов'язані Аркани</h2>
              <div className="flex flex-wrap gap-3">
                {relatedCards.map(rc => (
                  <button
                    key={rc.id}
                    onClick={() => setSelectedCard(rc)}
                    className="glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-mystic-accent hover:border-mystic-accent/50 transition-colors"
                  >
                    {rc.name}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
