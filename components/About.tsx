import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Download, Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCE, SKILLS } from '../data';

const About: React.FC = () => {
  const cardClass = "p-6 rounded-2xl border border-white/20 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300";
  const iconBoxClass = "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-white/50 to-white/10 dark:from-white/10 dark:to-transparent border border-white/20 shadow-inner";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <h2 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">About Me</h2>
        <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg"></div>
      </motion.div>

      {/* Intro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <motion.div 
          className={cardClass}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={`${iconBoxClass} text-indigo-600 dark:text-indigo-400`}>
            <User size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Background</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
            I am a CS student at Georgia Tech passionate about building secure and scalable projects. I have participated in numerous hackathons and completed various certifications that have helped me hone in my full-stack development skills.
          </p>
        </motion.div>

        <motion.div 
          className={cardClass}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`${iconBoxClass} text-purple-600 dark:text-purple-400`}>
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Education</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
            B.S. in Computer Science (May 2026). <br/>
            Concentrations: Cybersecurity & Privacy and Intelligence.<br/>
          </p>
        </motion.div>

        <motion.div 
          className={cardClass}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`${iconBoxClass} text-pink-600 dark:text-pink-400`}>
            <Target size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Goals</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
            Aiming to leverage advancements in AI and cloud infrastructure to create impactful solutions. I aspire to contribute to innovative projects and continuously shape the technological landscape.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience Section */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary"><Briefcase size={20} /></div>
                Experience
            </h3>
            <div className="space-y-4">
                {EXPERIENCE.map((exp, index) => (
                    <div key={index} className="group relative p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-white/5 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{exp.company}</h4>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                                <Calendar size={12} />
                                <span>{exp.period}</span>
                            </div>
                        </div>
                        <p className="text-primary font-semibold text-sm mb-1">{exp.role}</p>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Resume & Skills Highlights */}
        <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col gap-8"
        >
            <div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-lg text-secondary"><Target size={20} /></div>
                    Top Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {[...SKILLS[0].skills, ...SKILLS[1].skills, ...SKILLS[2].skills].map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/40 dark:bg-slate-800/60 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-sm font-semibold border border-white/20 dark:border-white/5 shadow-sm hover:scale-105 transition-transform cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-auto relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-black border border-slate-700 p-8 text-center text-white shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative blobs inside the resume card */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 rounded-full blur-[60px] -mr-10 -mt-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/30 rounded-full blur-[60px] -ml-10 -mb-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <h3 className="text-2xl font-bold mb-3 relative z-10">Resume</h3>
                <p className="text-slate-300 mb-6 text-sm relative z-10">Detailed overview of my professional journey.</p>
                
                <a 
                    href="/Shah, Heet, Resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-sm hover:scale-105 hover:bg-slate-100 transition-all active:scale-95 relative z-10 shadow-lg"
                >
                    <Download size={18} />
                    View CV
                </a>
            </div>
        </motion.div>
      </div>

    </section>
  );
};

export default About;
