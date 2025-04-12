import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import PixelCard from "../components/PixelCard";
import { Trophy } from "lucide-react";
import bgimage from "../assets/images/background.jpg";

interface CompletionScreenProps {
  onRestart: () => void;
}

const CompletionScreen = ({ onRestart }: CompletionScreenProps) => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchType, setGlitchType] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchType(Math.floor(Math.random() * 4));
      setShowGlitch(true);
      const duration = Math.random() * 200 + 100;
      setTimeout(() => setShowGlitch(false), duration);
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setGlitchType(Math.floor(Math.random() * 4));
          setShowGlitch(true);
          setTimeout(() => setShowGlitch(false), duration / 2);
        }, duration + 50);
      }
    }, 7000);

    // Hide confetti after 3 seconds
    const confettiTimeout = setTimeout(() => setShowConfetti(false), 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(confettiTimeout);
    };
  }, []);

  const getGlitchClass = () => {
    switch (glitchType) {
      case 0:
        return "bg-cyan-500/30";
      case 1:
        return "bg-pink-500/30";
      case 2:
        return "bg-yellow-500/30";
      case 3:
        return "bg-green-500/30";
      default:
        return "bg-cyan-500/30";
    }
  };

  // Confetti particles (retro-styled pixels)
  const confettiParticles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: Math.random() * 4 + 4,
    color: ["#A78BFA", "#FBBF24", "#4ADE80", "#F472B6"][Math.floor(Math.random() * 4)],
    delay: Math.random() * 2,
  }));

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 z-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 z-0" />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 50%, transparent 100%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Glitch Effect */}
      {showGlitch && (
        <>
          <div
            className={`absolute inset-0 ${getGlitchClass()} z-20 glitch-overlay`}
            style={{
              clipPath: `polygon(${Math.random() * 100}% 0, 100% ${
                Math.random() * 100
              }%, ${100 - Math.random() * 100}% 100%, 0 ${
                100 - Math.random() * 100
              }%)`,
            }}
          />
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div
              className="absolute left-0 top-0 w-full h-full"
              style={{
                transform: `translate(${(Math.random() - 0.5) * 10}px, ${
                  (Math.random() - 0.5) * 10
                }px)`,
                opacity: 0.7,
              }}
            />
          </div>
        </>
      )}

      {/* Pixel Corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-retro-purple-light opacity-70" />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {confettiParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
                initial={{ y: particle.y, opacity: 1 }}
                animate={{ y: "100vh", opacity: 0 }}
                transition={{
                  duration: 3,
                  delay: particle.delay,
                  ease: "easeIn",
                }}
                exit={{ opacity: 0 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-6xl z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <PixelCard className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
          <div className="text-center">
            {/* Header */}
            <motion.div
              className="mb-4 text-3xl md:text-4xl font-bold text-retro-purple-light font-pixel"
              style={{
                textShadow:
                  "0 0 8px rgba(167, 139, 250, 0.8), 0 0 12px rgba(167, 139, 250, 0.6)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
               LEVEL CLEARED 
            </motion.div>
            <h1 className="text-xl md:text-2xl text-black font-pixel mb-2">
              CONGRATULATIONS, EXPLORER!
            </h1>
            <p className="text-base md:text-lg text-black font-pixel mb-6">
              You have completed the portfolio!
            </p>

            {/* Trophy Icon */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
              transition={{
                delay: 0.4,
                duration: 0.7,
                type: "spring",
                stiffness: 100,
                rotate: { duration: 1, repeat: 1 },
              }}
            >
              <Trophy
                className="text-yellow-400 w-16 h-16 border-2 border-retro-purple-light rounded-full p-2 shadow-glow"
                style={{ filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))" }}
              />
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <PixelButton
                onClick={onRestart}
                className="px-6 py-3 text-base md:text-lg bg-retro-purple-light text-white shadow-glow border-2 border-white/20 hover:bg-retro-purple-dark/90 transition-all"
              >
                <span className="mr-2 font-pixel tracking-wide">PLAY AGAIN</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>
              <PixelButton
                onClick={() => window.open("https://github.com/rahil1202/retro-style-portfolio", "_blank")}
                className="px-6 py-3 text-base md:text-lg bg-gray-700/80 text-gray-200 shadow-glow border-2 border-white/20 hover:bg-gray-600/90 transition-all"               
              >
                <span className="mr-2 font-pixel tracking-wide">VIEW SOURCE</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>
              <PixelButton
                onClick={() => window.open("https://drive.google.com/file/d/1BmSKe0MUmLMzCcX6l9-5CbHUwoYEP2OK/view?usp=drive_link", "_blank")}
                className="px-6 py-3 text-base md:text-lg bg-gray-700/80 text-gray-200 shadow-glow border-2 border-white/20 hover:bg-gray-600/90 transition-all"               
              >
                <span className="mr-2 font-pixel tracking-wide">VIEW RESUME</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-sm z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-gray-300 font-pixel mb-1">THANKS FOR PLAYING!</p>
        <motion.a
          href="mailto:rahilisvahora@gmail.com"
          className="text-retro-purple-light font-mono hover:text-retro-purple-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          rahilisvahora@gmail.com
        </motion.a>
      </motion.div>

      {/* Floating Pixels */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-16 right-16 w-6 h-6 bg-retro-purple-light/40 hidden md:block z-20"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute top-32 left-16 w-4 h-4 bg-cyan-400/30 hidden md:block z-20"
      />
    </div>
  );
};

export default CompletionScreen;