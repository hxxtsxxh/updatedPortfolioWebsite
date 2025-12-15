import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE } from '../data';
import { Section } from '../types';

const Experience: React.FC = () => {
  return (
    <section id={Section.EXPERIENCE} className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Experience</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>

          {EXPERIENCE.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 md:w-1/2"></div>
              
              {/* Dot on line */}
              <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-dark z-10 mt-6"></div>

              <div className="flex-1 md:w-1/2 pl-8 md:pl-0">
                <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                     <span className="flex items-center gap-1 text-primary">
                        <Briefcase size={14} />
                        {exp.company}
                     </span>
                     <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                     </span>
                     <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                     </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-300">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;