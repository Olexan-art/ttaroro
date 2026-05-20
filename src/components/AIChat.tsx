import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Sparkles } from 'lucide-react';
import { chatAboutReading } from '../services/claude';
import type { UserInfo, TarotReading } from '../services/claude';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  cards: any[];
  userInfo: UserInfo;
  reading: TarotReading;
}

export const AIChat: React.FC<AIChatProps> = ({ cards, userInfo, reading }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Вітаю, ${userInfo.name}! Я готовий відповісти на будь-які уточнюючі питання щодо вашого розкладу. Що саме вас цікавить?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await chatAboutReading(cards, userInfo, reading, newMessages.map(m => ({ role: m.role, content: m.content })));
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (error: any) {
      setMessages([...newMessages, { role: 'assistant', content: `Вибачте, виникла помилка: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 glass rounded-2xl border border-mystic-accent/30 overflow-hidden flex flex-col h-[500px]"
    >
      <div className="bg-mystic-900/80 p-4 border-b border-mystic-accent/20 flex items-center gap-2">
        <Sparkles className="text-mystic-accent" size={20} />
        <h3 className="font-serif font-bold text-mystic-accent text-lg">Обговорення розкладу</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-mystic-800 text-slate-300' : 'bg-mystic-accent/20 text-mystic-accent'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-mystic-800 text-white rounded-tr-none' : 'bg-mystic-900/50 text-slate-300 border border-white/5 rounded-tl-none'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-mystic-accent/20 text-mystic-accent flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-mystic-900/50 text-slate-300 border border-white/5 rounded-tl-none flex items-center gap-1">
                <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-mystic-900/50 border-t border-mystic-accent/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Запитайте про значення конкретної карти..."
            className="flex-1 bg-mystic-800/50 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-mystic-accent/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-mystic-accent flex items-center justify-center text-mystic-900 hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
