import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Glossary } from './pages/Glossary';
import { Readings } from './pages/Readings';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { CardOfTheDay } from './pages/CardOfTheDay';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-12">
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
    >
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-mystic-accent to-mystic-900 flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.3)] mb-6 border-2 border-mystic-accent/50">
            <span className="text-6xl">🌙</span>
        </div>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-mystic-accent to-yellow-200"
    >
      Містичне Таро
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-sans leading-relaxed"
    >
      Відкрийте таємниці всесвіту через стародавнє мистецтво карт. Знайдіть відповіді, які шукає ваша душа.
    </motion.p>

    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-6 justify-center"
    >
      <Link to="/readings" className="glass px-10 py-4 rounded-full hover:bg-mystic-800/80 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all font-serif font-bold text-mystic-accent border-mystic-accent/30 text-lg uppercase tracking-wider">
        Почати сеанс
      </Link>
      <Link to="/card-of-the-day" className="glass px-10 py-4 rounded-full hover:bg-mystic-800/80 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all font-serif font-bold text-mystic-accent border-mystic-accent/30 text-lg uppercase tracking-wider">
        Карта Дня
      </Link>
      <Link to="/about" className="glass px-10 py-4 rounded-full hover:bg-white/10 transition-all font-serif text-lg text-slate-200">
        Про портал
      </Link>
    </motion.div>

    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
    >
        <div className="glass p-8 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-serif text-mystic-accent mb-4">🔮 3 Види Розкладів</h3>
            <p className="text-slate-300 font-sans">Від швидкої Карти Дня до глибокого аналізу через Простий Хрест. Обирайте те, що резонує з вашим запитом сьогодні.</p>
        </div>
        <div className="glass p-8 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-serif text-mystic-accent mb-4">📖 Глосарій Арканів</h3>
            <p className="text-slate-300 font-sans">Вивчайте значення кожної карти в прямому та перевернутому положенні. Класична система Райдера-Вейта.</p>
        </div>
        <div className="glass p-8 rounded-3xl text-left hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-serif text-mystic-accent mb-4">✨ Історія Сеансів</h3>
            <p className="text-slate-300 font-sans">Ваші розклади автоматично зберігаються в Особистому Кабінеті для подальшого аналізу та рефлексії.</p>
        </div>
    </motion.div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative z-10">
        <nav className="glass sticky top-0 z-50 p-4 border-b border-white/5 bg-mystic-900/80">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-mystic-accent flex items-center gap-2 hover:scale-105 transition-transform">
              <span className="text-3xl">✧</span> MYSTIC TAROT <span className="text-3xl">✧</span>
            </Link>
            <div className="flex gap-6 font-serif text-lg">
              <Link to="/about" className="hover:text-mystic-accent transition-colors text-slate-300">Про нас</Link>
              <Link to="/readings" className="hover:text-mystic-accent transition-colors text-slate-300">Ворожіння</Link>
              <Link to="/card-of-the-day" className="hover:text-mystic-accent transition-colors text-slate-300">Карта Дня</Link>
              <Link to="/glossary" className="hover:text-mystic-accent transition-colors text-slate-300">Глосарій</Link>
              <Link to="/profile" className="hover:text-mystic-accent transition-colors text-mystic-accent/80 border border-mystic-accent/30 px-4 rounded-full hover:bg-mystic-accent/10">Кабінет</Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-6xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/readings" element={<Readings />} />
            <Route path="/card-of-the-day" element={<CardOfTheDay />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <footer className="glass mt-12 py-8 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-slate-500 font-sans">
                    © {new Date().getFullYear()} Mystic Tarot. Всі права захищено. Для розважальних цілей.
                </p>
                <div className="mt-4 flex justify-center gap-4 text-2xl opacity-50">
                    <span>✨</span><span>🔮</span><span>🌙</span>
                </div>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
