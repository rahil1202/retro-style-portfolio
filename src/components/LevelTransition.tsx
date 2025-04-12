import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LevelTransitionProps {
  level: number;
  levelName: string;
  onTransitionComplete: () => void;
}

// Star component for creating individual stars
const Star = ({ top, left, size, delay }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
    }}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 1, 0.5, 1],
      scale: [1, 1.2, 1]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

const LevelTransition = ({ level, levelName, onTransitionComplete }: LevelTransitionProps) => {
  const [stars, setStars] = useState([]);
  
  // Generate stars on component mount
  useEffect(() => {
    const starCount = 50; // Number of stars
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1, // Random size between 1-4px
        delay: Math.random() * 2, // Random delay for twinkling effect
      });
    }
    
    setStars(newStars);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onTransitionComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onTransitionComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stars */}
      {stars.map(star => (
        <Star 
          key={star.id}
          top={star.top}
          left={star.left}
          size={star.size}
          delay={star.delay}
        />
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center z-10"
      >
        <div className="text-lg md:text-xl text-retro-purple-light mb-4">LEVEL {level}:</div>
        <h1 className="text-2xl md:text-3xl text-white ">{levelName}</h1>
        <div className="mt-4 font-mono text-white animate-pulse">_</div>
      </motion.div>
    </motion.div>
  );
};

export default LevelTransition;