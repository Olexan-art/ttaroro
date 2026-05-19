import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { UserInfo } from '../services/claude';

interface Props {
  onSubmit: (info: UserInfo) => void;
}

export const UserInfoForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<UserInfo>({ name: '', birthDate: '', question: '' });

  const set = (field: keyof UserInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    'w-full bg-mystic-900/60 border border-mystic-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-mystic-accent transition-colors';

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass p-8 rounded-2xl w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">✧</div>
        <h2 className="text-2xl font-bold text-mystic-accent mb-2">Перед ворожінням</h2>
        <p className="text-slate-400 text-sm">
          Поділіться кількома деталями — це допоможе картам говорити саме до вас
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-1.5 block">Ваше ім'я</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            className={inputClass}
            placeholder="Як вас звати?"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-1.5 block">
            Дата народження
          </label>
          <input
            type="date"
            required
            value={form.birthDate}
            onChange={set('birthDate')}
            max={new Date().toISOString().split('T')[0]}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-1.5 block">
            Ваше питання або ситуація
          </label>
          <textarea
            required
            value={form.question}
            onChange={set('question')}
            className={`${inputClass} resize-none h-28`}
            placeholder="Що вас хвилює? Про що хочете дізнатися від карт?"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-7 w-full glass px-8 py-4 rounded-full text-lg font-semibold text-mystic-accent hover:bg-mystic-800/80 transition-all border border-mystic-accent/30"
      >
        Перейти до ворожіння ✦
      </motion.button>
    </motion.form>
  );
};
