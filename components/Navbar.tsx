import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import GooeyNav from './GooeyNav';
import { PageView } from '../App';

interface NavbarProps {
  currentView: PageView;
  onViewChange: (view: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
  ];

  const currentIndex = navItems.findIndex(item => item.href === currentView);

  return (
    <div className="fixed w-full top-4 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4">
            <GooeyNav
                items={navItems}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={currentIndex >= 0 ? currentIndex : 0}
                animationTime={400}
                timeVariance={200}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onItemClick={(href) => onViewChange(href as PageView)}
                theme={theme}
            />
            
            <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform shadow-md"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
    </div>
  );
};

export default Navbar;
