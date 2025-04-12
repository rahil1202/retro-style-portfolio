
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import LevelTransition from '../components/LevelTransition';
import WelcomeScreen from './WelcomeScreen';
import AboutScreen from './AboutScreen';
import SkillsScreen from './SkillsScreen';
import ExperienceScreen from './ExperienceScreen';
import ProjectScreen from './ProjectScreen';
import CompletionScreen from './CompletionScreen';

type GameState =
  | 'loading'
  | 'welcome'
  | 'level1-transition'
  | 'about'
  | 'level2-transition'
  | 'skills'
  | 'level3-transition'
  | 'experience'
  | 'level4-transition'
  | 'projects'
  | 'completion';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('loading');
  
  const handleLoadingComplete = () => {
    setGameState('welcome');
  };
  
  const handleStartGame = () => {
    setGameState('level1-transition');
  };
  
  const handleLevel1TransitionComplete = () => {
    setGameState('about');
  };
  
  const handleAboutComplete = () => {
    setGameState('level2-transition');
  };
  
  const handleLevel2TransitionComplete = () => {
    setGameState('skills');
  };
  
  const handleSkillsComplete = () => {
    setGameState('level3-transition');
  };
  
  const handleLevel3TransitionComplete = () => {
    setGameState('experience');
  };

  const handleExperienceComplete = () => {
    setGameState('level4-transition');
  };

  const handleLevel4TransitionComplete = () => {
    setGameState('projects');
  };
    
  const handleProjectsComplete = () => {
    setGameState('completion');
  };
                                                                  
  const handleRestart = () => {
    setGameState('welcome');
  };
  
  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'loading' && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <WelcomeScreen onStart={handleStartGame} />
        )}
        
        {gameState === 'level1-transition' && (
          <LevelTransition 
            level={1} 
            levelName="ABOUT ME" 
            onTransitionComplete={handleLevel1TransitionComplete} 
          />
        )}
        
        {gameState === 'about' && (
          <AboutScreen onNext={handleAboutComplete} />
        )}
        
        {gameState === 'level2-transition' && (
          <LevelTransition 
            level={2} 
            levelName="EXPLORE MY SKILLS" 
            onTransitionComplete={handleLevel2TransitionComplete} 
          />
        )}
        
        {gameState === 'skills' && (
          <SkillsScreen onNext={handleSkillsComplete} />
        )}
        
        {gameState === 'level3-transition' && (
          <LevelTransition 
            level={3} 
            levelName="EXPERIENCE LOGS" 
            onTransitionComplete={handleLevel3TransitionComplete} 
          />
        )}
        
        {gameState === 'experience' && (
          <ExperienceScreen onNext={handleExperienceComplete} />
        )}

        {gameState === 'level4-transition' && (
          <LevelTransition 
            level={4}
            levelName="PROJECTS"
            onTransitionComplete={handleLevel4TransitionComplete}
          />

        )}

        {gameState === 'projects' && (
          <ProjectScreen onNext={handleProjectsComplete} />
        )}
        
        {gameState === 'completion' && (
          <CompletionScreen onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
