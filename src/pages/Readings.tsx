import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomCards, type TarotCard } from '../data/tarot-data';
import { UserInfoForm } from '../components/UserInfoForm';
import { generatePersonalizedReading, type UserInfo, type TarotReading } from '../services/claude';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

const positions = ['Минуле', 'Сьогодення', 'Майбутнє'];

const CARD_COLORS = [
  'from-violet-900/40 to-purple-900/20',
  'from-indigo-900/40 to-blue-900/20',
  'from-fuchsia-900/40 to-pink-900/20',
];

export const Readings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [isLoadingReading, setIsLoadingReading] = useState(false);
  const [readingError, setReadingError] = useState<string | null>(null);

  const drawCards = async () => {
    if (!userInfo) return;
    setIsDrawing(true);
    setCards([]);
    setReading(null);
    setReadingError(null);

    await new Promise((r) => setTimeout(r, 900));

    const drawn = getRandomCards(3).map((card) => ({
      ...card,
      isReversed: Math.random() > 0.5,
    }));
    setCards(drawn);
    setIsDrawing(false);

    setIsLoadingReading(true);
    try {
      const result = await generatePersonalizedReading(
        drawn.map((c, i) => ({
          name: c.name,
          position: positions[i],
          isReversed: c.isReversed,
          meaning: c.isReversed ? c.meaning_rev : c.meaning_up,
          desc: c.desc,
        })),
        userInfo
      );
      setReading(result);
    } catch (err) {
      setReadingError(err instanceof Error ? err.message : 'Невідома помилка');
    } finally {
      setIsLoadingReading(false);
    }
  };

  const resetAll = () => {
    setCards([]);
    setReading(null);
    setReadingError(null);
    setUserInfo(null);
  };

  if (!userInfo) {
    return (
      <div className="py-10 flex flex-col items-center">
        <UserInfoForm onSubmit={setUserInfo} />
      </div>
    );
  }

  return (
    <div className="py-8 min-h-[80vh] flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 w-full max-w-5xl"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="glass px-5 py-2 rounded-full text-sm text-slate-300">
            ✧ <span className="text-mystic-accent font-semibold">{userInfo.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-mystic-accent">
            Ворожіння: Три Карти
          </h1>
          <button
            onClick={resetAll}
            className="glass px-4 py-2 rounded-full text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Змінити дані
          </button>
        </div>

        <p className="text-slate-400 max-w-2xl mx-auto text-sm mb-2 italic">
          «{userInfo.question}»
        </p>

        <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm">
          Зосередьтеся на своєму питанні та натисніть кнопку.
        </p>

        <motion.button
          onClick={drawCards}
          disabled={isDrawing || isLoadingReading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass px-10 py-4 rounded-full text-xl font-semibold text-mystic-accent hover:bg-mystic-800/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-mystic-accent/30"
        >
          {isDrawing ? '✦ Тасування колоди...' : cards.length ? '↺ Нове ворожіння' : '✦ Витягнути карти'}
        </motion.button>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              initial={{ opacity: 0, y: 100, rotateY: 90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.4, duration: 0.8, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <h3 className="text-lg font-bold text-white mb-4 bg-mystic-900/80 px-6 py-2 rounded-full border border-mystic-700">
                {positions[index]}
              </h3>

              <div className={`glass p-4 rounded-2xl w-full max-w-sm flex flex-col items-center bg-gradient-to-b ${CARD_COLORS[index]}`}>
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-5 shadow-2xl">
                  <motion.img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${card.isReversed ? 'rotate-180' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(card.name)}`;
                    }}
                  />
                </div>

                <h4 className="text-xl font-bold text-mystic-accent text-center mb-1">
                  {card.name}
                </h4>
                {card.isReversed && (
                  <span className="text-xs text-fuchsia-400 font-medium mb-2 tracking-wide uppercase">
                    Перевернута
                  </span>
                )}
                <p className="text-slate-300 text-center text-sm leading-relaxed">
                  {card.isReversed ? card.meaning_rev : card.meaning_up}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading reading */}
      <AnimatePresence>
        {isLoadingReading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-14 text-center"
          >
            <div className="text-4xl mb-4 animate-pulse">✧</div>
            <p className="text-mystic-accent text-lg font-semibold animate-pulse">
              Карти розмовляють з зірками...
            </p>
            <p className="text-slate-400 text-sm mt-2">Генерую персональне трактування</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {readingError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 glass p-6 rounded-2xl max-w-lg w-full border border-red-500/30 text-center"
          >
            <p className="text-red-400 font-semibold mb-1">Помилка генерації трактування</p>
            <p className="text-slate-400 text-sm">{readingError}</p>
            {readingError.includes('API ключ') && (
              <p className="text-slate-500 text-xs mt-3">
                Додайте <code className="text-mystic-accent">VITE_ANTHROPIC_API_KEY</code> до файлу{' '}
                <code className="text-mystic-accent">.env</code> у корені проекту.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalized reading */}
      <AnimatePresence>
        {reading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-14 w-full max-w-5xl"
          >
            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-mystic-700/50" />
              <span className="text-mystic-accent text-lg font-bold tracking-widest">✦ ТРАКТУВАННЯ ✦</span>
              <div className="flex-1 h-px bg-mystic-700/50" />
            </div>

            {/* Overall theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-6 rounded-2xl mb-8 text-center border border-mystic-accent/20"
            >
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Загальна тема</p>
              <p className="text-white text-lg font-semibold leading-relaxed">
                {reading.overallTheme}
              </p>
            </motion.div>

            {/* Card interpretations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {reading.cardInterpretations.map((ci, i) => (
                <motion.div
                  key={ci.position}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className={`glass p-6 rounded-2xl bg-gradient-to-b ${CARD_COLORS[i]}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">{ci.position}</span>
                    <div className="flex-1 h-px bg-mystic-700/40" />
                  </div>
                  <h5 className="text-mystic-accent font-bold text-base mb-3">{ci.cardName}</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">{ci.interpretation}</p>
                </motion.div>
              ))}
            </div>

            {/* Synthesis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass p-6 rounded-2xl mb-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-purple-400 text-xl">◈</span>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Зв'язок між картами</p>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{reading.synthesis}</p>
            </motion.div>

            {/* Advice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="glass p-6 rounded-2xl border border-mystic-accent/30 bg-gradient-to-r from-mystic-900/60 to-purple-900/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-mystic-accent text-xl">✦</span>
                <p className="text-mystic-accent text-xs uppercase tracking-widest font-semibold">
                  Порада для {userInfo.name}
                </p>
              </div>
              <p className="text-white text-sm leading-relaxed font-medium">{reading.advice}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
