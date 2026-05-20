import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tarotDeck, type TarotCard } from '../data/tarot-data';
import { UserInfoForm } from '../components/UserInfoForm';
import { fetchNewsForDate } from '../services/news';
import { generateCardOfTheDayReading } from '../services/claude';
import type { UserInfo } from '../services/claude';

type Timeframe = 'today' | 'yesterday' | 'lastWeek';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

export const CardOfTheDay: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>('today');
  const [card, setCard] = useState<DrawnCard | null>(null);
  const [readingText, setReadingText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newsCache, setNewsCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedInfo = localStorage.getItem('tarot_user_info');
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    }
  }, []);

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem('tarot_user_info', JSON.stringify(info));
  };

  const getTargetDate = (tf: Timeframe): Date => {
    const d = new Date();
    if (tf === 'yesterday') d.setDate(d.getDate() - 1);
    if (tf === 'lastWeek') d.setDate(d.getDate() - 7);
    return d;
  };

  const getTimeframeLabel = (tf: Timeframe): string => {
    if (tf === 'today') return 'Сьогодні';
    if (tf === 'yesterday') return 'Вчора';
    return 'Минулий тиждень';
  };

  const drawCard = async () => {
    if (!userInfo) return;

    setIsLoading(true);
    setCard(null);
    setReadingText(null);

    // Random card
    const randomIdx = Math.floor(Math.random() * tarotDeck.length);
    const baseCard = tarotDeck[randomIdx];
    const isReversed = Math.random() > 0.5;

    const drawn: DrawnCard = { ...baseCard, isReversed };
    setCard(drawn);

    const targetDate = getTargetDate(timeframe);
    const dateKey = targetDate.toISOString().split('T')[0];

    try {
      let newsContext = newsCache[dateKey];
      if (!newsContext) {
        newsContext = await fetchNewsForDate(targetDate);
        setNewsCache(prev => ({ ...prev, [dateKey]: newsContext }));
      }

      const reading = await generateCardOfTheDayReading(
        {
          name: drawn.name,
          position: 'Карта Дня',
          isReversed: drawn.isReversed,
          meaning: drawn.isReversed ? drawn.meaning_rev : drawn.meaning_up,
          desc: drawn.desc
        },
        userInfo,
        newsContext,
        getTimeframeLabel(timeframe)
      );

      setReadingText(reading.text);
    } catch (error) {
      console.error(error);
      setReadingText('Не вдалося згенерувати трактування. Спробуйте пізніше.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <UserInfoForm onSubmit={handleUserInfoSubmit} />;
  }

  return (
    <div className="py-12 px-4 flex flex-col items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-mystic-accent mb-4">Карта Дня</h1>
        <p className="text-slate-300 font-sans text-lg mb-8">Отримайте настанову від Всесвіту з огляду на світові події.</p>

        <div className="flex gap-4 justify-center mb-8">
          {(['today', 'yesterday', 'lastWeek'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => { setTimeframe(tf); setCard(null); setReadingText(null); }}
              className={`px-6 py-2 rounded-full border transition-all font-medium ${
                timeframe === tf
                  ? 'bg-mystic-accent text-mystic-900 border-mystic-accent'
                  : 'border-mystic-accent/30 text-slate-300 hover:border-mystic-accent'
              }`}
            >
              {getTimeframeLabel(tf)}
            </button>
          ))}
        </div>

        <motion.button
          onClick={drawCard}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-10 py-4 rounded-full text-xl font-bold font-serif text-mystic-accent hover:bg-mystic-800/80 transition-all disabled:opacity-50 uppercase tracking-wider border border-mystic-accent/30"
        >
          {isLoading ? 'Генерація...' : 'Отримати Карту'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {card && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-12 max-w-5xl items-center md:items-start"
          >
            <div className="w-64 flex-shrink-0">
              <div className="glass p-4 rounded-2xl w-full flex flex-col items-center relative">
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
                  <motion.img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${card.isReversed ? 'rotate-180' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(card.name)}`;
                    }}
                  />
                </div>
                <h4 className="text-xl font-serif font-bold text-mystic-accent text-center">{card.name}</h4>
                {card.isReversed && (
                  <span className="text-xs text-fuchsia-400 font-medium tracking-wide uppercase mt-1">Перевернута</span>
                )}
              </div>
            </div>

            <div className="flex-1">
              {isLoading ? (
                 <div className="glass p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center min-h-[300px]">
                   <div className="text-4xl mb-4 animate-pulse">✧</div>
                   <p className="text-mystic-accent text-lg font-semibold animate-pulse font-serif">
                     Зчитуємо світові новини та енергію аркану...
                   </p>
                 </div>
              ) : readingText ? (
                <div className="glass p-8 rounded-2xl border border-mystic-accent/20">
                  <h3 className="text-2xl font-serif text-mystic-accent mb-6 border-b border-white/10 pb-4">
                    Трактування на {getTimeframeLabel(timeframe).toLowerCase()}
                  </h3>
                  <div className="text-slate-200 leading-relaxed font-sans space-y-4">
                    {readingText.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
