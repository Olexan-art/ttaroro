import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Glossary } from './pages/Glossary';
import { Readings } from './pages/Readings';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-mystic-accent to-purple-400"
    >
      Містичне Таро
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl"
    >
      Відкрийте таємниці всесвіту через стародавнє мистецтво карт Таро.
    </motion.p>
    <div className="flex gap-4">
      <Link to="/readings" className="glass px-8 py-3 rounded-full hover:bg-mystic-800/80 transition-all font-semibold text-mystic-accent border-mystic-accent/30">
        Почати сеанс
      </Link>
      <Link to="/glossary" className="glass px-8 py-3 rounded-full hover:bg-white/10 transition-all">
        Глосарій
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative z-10">
        <nav className="glass sticky top-0 z-50 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold tracking-widest text-mystic-accent flex items-center gap-2">
              ✧ MYSTIC TAROT ✧
            </Link>
            <div className="flex gap-6">
              <Link to="/glossary" className="hover:text-mystic-accent transition-colors">Глосарій</Link>
              <Link to="/readings" className="hover:text-mystic-accent transition-colors">Ворожіння</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow max-w-6xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/readings" element={<Readings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
