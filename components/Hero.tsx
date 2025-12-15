import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIALS } from '../data';
import LiquidEther from './LiquidEther';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* LiquidEther Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto"
        >
          <span className="text-white dark:text-white font-semibold tracking-wider uppercase text-sm drop-shadow-md">Hello, I'm</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white tracking-tight drop-shadow-lg">
            Heet Shah
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl text-slate-700 dark:text-white font-medium drop-shadow-md">
            Software Engineer & <span className="text-purple-600 dark:text-purple-200">CS Student @ GT</span>
          </h2>

          <div className="mt-10 flex justify-center space-x-6">
            {SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 dark:text-white hover:text-slate-900 dark:hover:text-white/80 transition-transform hover:scale-110 drop-shadow-md"
              >
                {social.icon === 'Github' ? <Github size={28} /> : <Linkedin size={28} />}
              </a>
            ))}
            <a
              href="mailto:hshah339@gatech.edu"
              className="text-slate-700 dark:text-white hover:text-slate-900 dark:hover:text-white/80 transition-transform hover:scale-110 drop-shadow-md"
            >
              <Mail size={28} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
