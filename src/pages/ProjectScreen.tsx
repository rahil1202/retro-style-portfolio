import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import PixelCard from "../components/PixelCard";
import { ArrowLeftIcon, ArrowRightIcon, Zap } from "lucide-react";
import bgimage from "../assets/images/background.jpg";

interface ProjectSectionProps {
  onNext: () => void;
}

const projects = [
  {
    name: "Gen-AI-Slides",
    techStack: "Next.js, Tailwind CSS, TypeScript, Prisma, PostgreSQL, Express.js, Clerk, LemonSqueezy",
    icon: <Zap className="text-yellow-400" size={24} />,
    details: [
      "Developed an AI-powered platform that generates slide decks from user prompts in under 20 seconds",
      "Implemented a theme preview system allowing users to select from over 5 professional slide templates",
      "Built a two-sided marketplace enabling users to sell and purchase slide decks seamlessly",
      "Integrated a commission model where the platform automatically deducts a 10% admin fee on each sale",
      "Secured user authentication and access control using Clerk with custom roles for buyers and sellers",
      "Designed a scalable backend using Express.js, Prisma ORM, and PostgreSQL for efficient data handling",
    ],
  },
  {
    name: "Foodie-Website",
    techStack: "HTML5, Tailwind CSS, React.js, Redux, Swiggy API, Geolocation API",
    icon: <Zap className="text-yellow-400" size={24} />,
    details: [
      "Created an easy-to-use platform where users can discover restaurants with pictures, names, and cuisine types",
      "Expanded restaurant listings with Swiggy’s API, enabling precise, location-based recommendations via Geolocation API",
    ],
  },
];

const ProjectSection = ({ onNext }: ProjectSectionProps) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchType, setGlitchType] = useState(0);

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

    return () => clearInterval(glitchInterval);
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

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

      {/* Header */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-retro-purple-light drop-shadow-glow inline-block px-4 py-1 border-b-4 border-retro-purple-light/50 font-pixel">
          PROJECT ARCHIVE
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-6 mt-16 z-10">
        <div className="w-full flex-1">
          <div className="flex items-center justify-between px-4 mb-4">
            <motion.button
              onClick={prevProject}
              whileHover={{ x: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-purple-light p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
            >
              <ArrowLeftIcon size={20} />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {projects[currentProject].icon}
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-glow">
                  {projects[currentProject].name}
                </h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-md text-white/80 font-mono">
                  {currentProject + 1}/{projects.length}
                </span>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={nextProject}
              whileHover={{ x: 4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-purple-light p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
            >
              <ArrowRightIcon size={20} />
            </motion.button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <PixelCard className="w-full bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
              <div
                className="max-h-[60vh] overflow-y-auto pr-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#A78BFA #EDE9FE",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projects[currentProject].name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-lg md:text-xl text-retro-purple-dark font-bold font-pixel mb-2">
                          {projects[currentProject].name}
                        </h4>
                        <p className="text-sm md:text-base text-retro-purple-light font-mono mb-2">
                          {projects[currentProject].techStack}
                        </p>
                      </div>
                      <ul className="list-disc pl-5 space-y-2">
                        {projects[currentProject].details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="text-sm md:text-base text-gray-800"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-3 border-2 border-retro-purple-light text-xs text-center bg-gray-900/10 rounded-md">
                        <p className="text-retro-purple-dark font-pixel">
                          TIP: EVERY PROJECT IS A NEW LEVEL UNLOCKED
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </PixelCard>
          </motion.div>
        </div>
      </div>

   
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
          delay: 1,
        }}
        className="absolute top-32 left-16 w-4 h-4 bg-cyan-400/30 hidden md:block"
      />
    </div>
  );
};

export default ProjectSection;