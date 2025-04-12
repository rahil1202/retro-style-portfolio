import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import PixelCard from "../components/PixelCard";
import PixelProgress from "../components/PixelProgress";
import { ArrowLeftIcon, ArrowRightIcon, Zap, Trophy, Star, Gamepad2 } from "lucide-react";
import bgimage from "../assets/images/background.jpg";

interface SkillsScreenProps {
  onNext: () => void;
}

const skills = [
  {
    category: "PROGRAMMING LANGUAGES",
    icon: <Zap className="text-yellow-400" size={24} />,
    // description: "Primary weapons in my coding arsenal",
    items: [
      { name: "JavaScript", level: 95, icon: "🌐" },
      { name: "TypeScript", level: 95, icon: "📘" },
      { name: "C", level: 85, icon: "💾" },
      { name: "C++", level: 85, icon: "⚙️" },
    ],
  },
  {
    category: "FRAMEWORKS",
    icon: <Trophy className="text-green-400" size={24} />,
    // description: "Special abilities unlocked through experience",
    items: [
      { name: "React", level: 85, icon: "⚛️" },
      { name: "Next", level: 80, icon: "▲" },
      { name: "Node", level: 85, icon: "🟢" },
      { name: "Express", level: 85, icon: "🚀" },
      { name: "Tailwind CSS", level: 80, icon: "🎨" },
    ],
  },
  {
    category: "DATABASE MANAGEMENT",
    icon: <Star className="text-blue-400" size={24} />,
    // description: "Data vaults where secrets are stored",
    items: [
      { name: "SQL", level: 80, icon: "🗄️" },
      { name: "PostgreSQL", level: 75, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "Prisma", level: 70, icon: "🔺" },
    ],
  },
  {
    category: "TOOLS",
    icon: <Gamepad2 className="text-purple-400" size={24} />,
    // description: "Equipment for conquering code dungeons",
    items: [
      { name: "VS Code", level: 90, icon: "💻" },
      { name: "Git/GitHub", level: 85, icon: "📊" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Linux", level: 80, icon: "🐧" },
    ],
  },
];

const SkillsScreen = ({ onNext }: SkillsScreenProps) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchType, setGlitchType] = useState(0);

  useEffect(() => {
    // Enhanced random glitch effect
    const glitchInterval = setInterval(() => {
      // Pick a random glitch type (0-3)
      setGlitchType(Math.floor(Math.random() * 4));
      setShowGlitch(true);
      
      // Random glitch duration between 100-300ms
      const duration = Math.random() * 200 + 100;
      setTimeout(() => setShowGlitch(false), duration);
      
      // Sometimes trigger a second quick glitch
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setGlitchType(Math.floor(Math.random() * 4));
          setShowGlitch(true);
          setTimeout(() => setShowGlitch(false), duration / 2);
        }, duration + 50);
      }
    }, 7000); // Less frequent but more impactful

    return () => clearInterval(glitchInterval);
  }, []);

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % skills.length);
  };

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + skills.length) % skills.length);
  };

  // Get glitch class based on type
  const getGlitchClass = () => {
    switch(glitchType) {
      case 0: return "bg-cyan-500/30";
      case 1: return "bg-pink-500/30";
      case 2: return "bg-yellow-500/30";
      case 3: return "bg-green-500/30";
      default: return "bg-cyan-500/30";
    }
  };

  return (
    <div
      className="max-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay with scanlines */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 z-0" />
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 50%, transparent 100%)",
          backgroundSize: "100% 4px"
        }}
      />

      <motion.div
        className="text-center z-10 translate-x-1/2 translate-y-1/2"
        style={{ position: "absolute", top: "15px", left: "82%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
      >
        <PixelButton
          onClick={onNext}
          className="px-6 py-2 text-base md:text-sm hover:bg-retro-purple-dark/90 transition-colors bg-retro-purple-light text-white shadow-glow border-2 border-white/20"
        >
          <span className="mr-2 font-pixel tracking-wide">NEXT LEVEL</span>
          <span className="inline-block animate-bounce-right">→</span>
        </PixelButton>
      </motion.div>

      {/* Enhanced glitch effect overlay */}
      {showGlitch && (
        <>
          <div className={`absolute inset-0 ${getGlitchClass()} z-20 glitch-overlay`} 
               style={{ clipPath: `polygon(${Math.random() * 100}% 0, 100% ${Math.random() * 100}%, ${100 - Math.random() * 100}% 100%, 0 ${100 - Math.random() * 100}%)` }} />
          
          {/* Text displacement effect during glitch */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute left-0 top-0 w-full h-full" 
                 style={{ 
                   transform: `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`,
                   opacity: 0.7
                 }}>
            </div>
          </div>
        </>
      )}

      {/* Pixel corners decoration */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-retro-purple-light opacity-70" />

      {/* Header */}
      <motion.div
        className="absolute top-0 left-0 right-0 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-retro-purple-light drop-shadow-glow inline-block px-4 py-10 border-b-4 border-retro-purple-light/50">
          SKILL VAULT
        </h2>
      </motion.div>

      {/* Main content - more spacious layout */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-6 mt-16 z-10">
        {/* Category navigation - enhanced with category counter */}
        <div className="w-full flex items-center justify-between px-4 mb-4">
          <motion.button
            onClick={prevCategory}
            whileHover={{ x: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-retro-purple-light p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
          >
            <ArrowLeftIcon size={20} />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {skills[currentCategory].icon}
              <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-glow">
                {skills[currentCategory].category}
              </h3>
              {/* Small counter indicator replacing dots */}
              <span className="text-xs bg-white/20 px-2 py-1 rounded-md text-white/80 font-mono">
                {currentCategory + 1}/{skills.length}
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={nextCategory}
            whileHover={{ x: 4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-retro-purple-light p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
          >
            <ArrowRightIcon size={20} />
          </motion.button>
        </div>

        {/* Skills card - maintained but with better spacing */}
        <motion.div 
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <PixelCard className="w-full bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={skills[currentCategory].category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Skills with progress bars */}
                  <div className="flex-1">
                    {skills[currentCategory].items.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="mb-5 last:mb-0"
                      >
                        <div className="flex items-center mb-1">
                          <div className="flex justify-center items-center w-8 h-8 mr-3 bg-retro-purple-light/20 rounded-md border border-retro-purple-light/50">
                            <span className="text-xl">{skill.icon}</span>
                          </div>
                          <span className="text-sm md:text-base text-retro-purple-dark font-bold">
                            {skill.name}
                          </span>
                          <span className="ml-auto text-xs font-mono text-retro-purple-light">
                            {skill.level}/100
                          </span>
                        </div>
                        <PixelProgress 
                          value={skill.level} 
                          label="" 
                          className="text-retro-purple-dark h-4"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats panel */}
                  <div className="flex-1 relative">
                    <motion.div 
                      className="p-4 md:p-5 border-2 border-retro-purple-light rounded-md bg-gray-900/10 h-full flex flex-col"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-center mb-4 pb-2 border-b-2 border-retro-purple-light/50">
                        <h4 className="font-pixel text-retro-purple-dark text-lg md:text-xl">PLAYER STATS</h4>
                      </div>
                      
                      <div className="space-y-3 flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm md:text-base text-retro-purple-dark font-pixel">BUGS SQUASHED:</p>
                          <p className="text-sm md:text-base text-retro-purple-light font-mono">9,999+</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm md:text-base text-retro-purple-dark font-pixel">COFFEE CONSUMED:</p>
                          <p className="text-sm md:text-base text-retro-purple-light font-mono">∞</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm md:text-base text-retro-purple-dark font-pixel">DEADLINES BEATEN:</p>
                          <p className="text-sm md:text-base text-retro-purple-light font-mono">ALL</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm md:text-base text-retro-purple-dark font-pixel">MERGE CONFLICTS:</p>
                          <p className="text-sm md:text-base text-retro-purple-light font-mono">RESOLVED</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t-2 border-retro-purple-light/50">
                        <p className="text-sm md:text-base text-retro-purple-dark font-pixel">DEV MANTRA:</p>
                        <p className="text-sm md:text-base italic text-retro-purple-light/80">
                          "CODE BY DAY, DEBUG BY NIGHT"
                        </p>
                      </div>
                      
                      {/* Decorative circuit patterns */}
                      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-retro-purple-light/40"></div>
                      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-retro-purple-light/40"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </PixelCard>
        </motion.div>
      </div>

         
      {/* Floating pixels decoration */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-16 right-16 w-6 h-6 bg-retro-purple-light/40 hidden md:block"
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
          delay: 1
        }}
        className="absolute top-32 left-16 w-4 h-4 bg-cyan-400/30 hidden md:block"
      />
    </div>
  );
};

export default SkillsScreen;