import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-mystic-accent mb-6">Про Портал</h1>
        <div className="w-24 h-1 bg-mystic-accent/30 mx-auto rounded-full mb-8"></div>

        <div className="glass p-8 md:p-12 rounded-3xl text-left space-y-6">
          <p className="text-lg text-slate-200 font-sans leading-relaxed">
            Вітаємо вас у <strong>Містичному Таро</strong> — вашому провіднику у світ підсвідомого та незвіданого. Цей портал створений для тих, хто шукає відповіді, прагне самопізнання або просто хоче доторкнутися до стародавньої мудрості карт.
          </p>

          <h2 className="text-2xl font-serif text-mystic-accent pt-4">Що таке Таро?</h2>
          <p className="text-lg text-slate-300 font-sans leading-relaxed">
            Карти Таро — це не просто інструмент для передбачення майбутнього. Це дзеркало вашої душі, система символів та архетипів, яка допомагає краще зрозуміти поточну ситуацію, приховані мотиви та можливі шляхи розвитку подій. Класична колода, якою ми користуємося, заснована на традиції Райдера-Вейта-Сміт, створеній на початку 20 століття.
          </p>

          <h2 className="text-2xl font-serif text-mystic-accent pt-4">Як це працює?</h2>
          <ul className="list-disc list-inside text-lg text-slate-300 font-sans space-y-3 ml-4">
            <li><strong>Синхронічність:</strong> Витягнута карта ніколи не буває випадковою. Вона відображає енергію вашого запиту в даний момент часу.</li>
            <li><strong>Медитація:</strong> Перед тим як робити розклад, очистіть розум, глибоко вдихніть і сфокусуйтесь на своєму питанні.</li>
            <li><strong>Тлумачення:</strong> Звертайте увагу не тільки на текст, але й на те, які емоції викликає у вас зображення на карті.</li>
          </ul>

          <div className="mt-8 p-6 bg-mystic-900/50 rounded-xl border border-mystic-accent/10">
            <p className="text-center italic text-mystic-accent font-serif">
              "Таро — це хороша служниця, але поганий господар. Використовуйте карти для роздумів, але пам'ятайте, що творите свою долю ви самі."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
