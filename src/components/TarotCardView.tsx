import React from 'react';
import { motion } from 'framer-motion';
import type { TarotCard } from '../data/tarot-data';

interface Props {
  card: TarotCard;
  onClick?: () => void;
  className?: string;
}

export const TarotCardView: React.FC<Props> = ({ card, onClick, className = '' }) => {
  return (
    <motion.div
      className={`glass rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-mystic-accent/20 transition-shadow ${className}`}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="aspect-[2/3] w-full bg-mystic-900/50 p-2 relative">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e1e2f/9b8bf4?text=${encodeURIComponent(card.name)}`;
          }}
        />
        <div className="absolute top-2 left-2 right-2 flex justify-between px-2 text-xs font-bold text-white drop-shadow-md">
          <span>{card.value}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-mystic-100">{card.name}</h3>
        <p className="text-xs text-mystic-300 mt-1 capitalize">{card.type} Arcana</p>
      </div>
    </motion.div>
  );
};
