import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomCards, type TarotCard } from '../data/tarot-data';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

type SpreadType = 'single' | 'three' | 'cross';

interface ReadingResult {
  id: string;
  date: string;
  type: SpreadType;
  cards: DrawnCard[];
  conclusion: string;
}

export const Readings: React.FC = () => {
  const [spreadType, setSpreadType] = useState<SpreadType>('three');
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [conclusion, setConclusion] = useState<string>('');

  const generateConclusion = (drawnCards: DrawnCard[], type: SpreadType) => {
    let text = "";
    const reversedCount = drawnCards.filter(c => c.isReversed).length;
    const majorCount = drawnCards.filter(c => c.type === 'major').length;

    if (type === 'single') {
        const card = drawnCards[0];
        text = `Сьогоднішня енергія зосереджена навколо аркану "${card.name}". `;
        text += card.isReversed
            ? "Ця карта в перевернутому положенні радить звернути увагу на внутрішні блоки та приховані перешкоди."
            : "В прямому положенні вона несе прямий і ясний посил до дії та розвитку.";
    } else {
        if (majorCount >= drawnCards.length / 2) {
            text += "Цей розклад несе доленосний характер. Важливі життєві сили втручаються у вашу ситуацію. ";
        } else {
            text += "Ситуація здебільшого стосується повсякденних справ та поточних емоцій. ";
        }

        if (reversedCount > drawnCards.length / 2) {
            text += "Переважання перевернутих карт вказує на внутрішній опір, затримки або необхідність переосмислення шляху. Можливо, варто зачекати з активними діями.";
        } else if (reversedCount === 0) {
            text += "Всі карти в прямому положенні — це чудовий знак того, що енергія тече вільно, і ви на правильному шляху.";
        } else {
            text += "Присутній баланс між прямими та перевернутими енергіями, що вимагає уважності як до зовнішніх подій, так і до внутрішнього стану.";
        }
    }

    return text;
  };

  const drawCards = () => {
    setIsDrawing(true);
    setCards([]);
    setConclusion('');

    let numCards = 3;
    if (spreadType === 'single') numCards = 1;
    if (spreadType === 'cross') numCards = 5;

    setTimeout(() => {
      const drawn = getRandomCards(numCards).map(card => ({
        ...card,
        isReversed: Math.random() > 0.5
      }));
      setCards(drawn);
      const generatedConclusion = generateConclusion(drawn, spreadType);
      setConclusion(generatedConclusion);
      setIsDrawing(false);

      // Save to localStorage
      const newReading: ReadingResult = {
          id: Date.now().toString(),
          date: new Date().toLocaleString('uk-UA'),
          type: spreadType,
          cards: drawn,
          conclusion: generatedConclusion
      };
      const savedReadings = JSON.parse(localStorage.getItem('tarot_history') || '[]');
      localStorage.setItem('tarot_history', JSON.stringify([newReading, ...savedReadings]));

    }, 1500);
  };

  const getPositions = () => {
      if (spreadType === 'single') return ["Карта Дня"];
      if (spreadType === 'three') return ["Минуле", "Сьогодення", "Майбутнє"];
      return ["Теперішнє (Ви)", "Виклик (Перешкода)", "Свідоме (Мета)", "Підсвідоме (Основа)", "Результат"];
  };

  const positions = getPositions();

  return (
    <div className="py-8 min-h-[80vh] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-mystic-accent mb-4">Ворожіння</h1>

        <div className="flex gap-4 justify-center mb-8">
            <button
                onClick={() => setSpreadType('single')}
                className={`px-4 py-2 rounded-full border transition-all ${spreadType === 'single' ? 'bg-mystic-accent text-mystic-900 border-mystic-accent' : 'border-mystic-accent/30 text-slate-300 hover:border-mystic-accent'}`}
            >
                Карта Дня
            </button>
            <button
                onClick={() => setSpreadType('three')}
                className={`px-4 py-2 rounded-full border transition-all ${spreadType === 'three' ? 'bg-mystic-accent text-mystic-900 border-mystic-accent' : 'border-mystic-accent/30 text-slate-300 hover:border-mystic-accent'}`}
            >
                Три Карти
            </button>
            <button
                onClick={() => setSpreadType('cross')}
                className={`px-4 py-2 rounded-full border transition-all ${spreadType === 'cross' ? 'bg-mystic-accent text-mystic-900 border-mystic-accent' : 'border-mystic-accent/30 text-slate-300 hover:border-mystic-accent'}`}
            >
                Простий Хрест
            </button>
        </div>

        <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-sans text-lg">
          Зосередьтеся на своєму питанні. Коли будете готові, натисніть кнопку, щоб витягнути карти.
        </p>

        <button
          onClick={drawCards}
          disabled={isDrawing}
          className="glass px-10 py-4 rounded-full text-xl font-bold font-serif text-mystic-accent hover:bg-mystic-800/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          {isDrawing ? "Духи промовляють..." : "Розпочати розклад"}
        </button>
      </motion.div>

      <div className={`grid gap-8 w-full max-w-6xl mt-8 ${spreadType === 'single' ? 'grid-cols-1 max-w-md' : spreadType === 'three' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'}`}>
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              initial={{ opacity: 0, y: 100, rotateY: 90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.4, duration: 0.8, type: "spring" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-lg font-serif font-bold text-white mb-4 bg-mystic-900/80 px-4 py-2 rounded-full border border-mystic-800 shadow-lg text-center min-h-[3rem] flex items-center">
                {positions[index]}
              </h3>

              <div className="glass p-4 rounded-2xl w-full max-w-sm flex flex-col items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-mystic-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-6 shadow-[0_0_20px_rgba(197,160,89,0.15)] border border-white/5 group-hover:border-mystic-accent/30 transition-colors">
                  <motion.img
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${card.isReversed ? 'rotate-180' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(card.name)}`;
                    }}
                  />
                </div>

                <h4 className="text-xl font-serif font-bold text-mystic-accent text-center mb-2">
                  {card.name} {card.isReversed ? "(Перевернута)" : ""}
                </h4>

                <p className="text-slate-300 text-center text-sm leading-relaxed font-sans mt-2">
                  {card.isReversed ? card.meaning_rev : card.meaning_up}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {conclusion && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: cards.length * 0.4 + 0.5, duration: 1 }}
            className="mt-16 max-w-3xl glass p-8 rounded-2xl text-center border-mystic-accent/20"
        >
            <h3 className="text-2xl font-serif font-bold text-mystic-accent mb-4">🔮 Синтез Розкладу</h3>
            <p className="text-lg font-sans text-slate-200 leading-relaxed italic">
                {conclusion}
            </p>
        </motion.div>
      )}
    </div>
  );
};
