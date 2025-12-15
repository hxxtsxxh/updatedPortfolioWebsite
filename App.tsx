import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LiquidEther from './components/LiquidEther';
import { AnimatePresence, motion } from 'framer-motion';

export type PageView = 'home' | 'about' | 'projects';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark transition-colors duration-300 relative overflow-x-hidden font-sans">
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="w-full">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
              </motion.div>
            )}

            {currentView === 'about' && (
              <motion.div 
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen relative"
              >
                {/* Fixed Background for Scrollable Page */}
                <div className="fixed inset-0 z-0">
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={15}
                        cursorSize={80}
                        viscous={20}
                        autoSpeed={0.3} // Slower for background reading
                        autoIntensity={1.5}
                    />
                    {/* Glass Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/70 backdrop-blur-sm transition-colors duration-500" />
                </div>

                {/* Scrollable Content */}
                <div className="relative z-10 pt-28 pb-10">
                    <About />
                </div>
              </motion.div>
            )}

            {currentView === 'projects' && (
              <motion.div 
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-screen w-full"
              >
                <Projects />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {/* Footer only shows on About because it's the only scrollable page with an end */}
        {currentView === 'about' && (
          <footer className="relative z-10 py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} Heet Shah. All rights reserved.</p>
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
