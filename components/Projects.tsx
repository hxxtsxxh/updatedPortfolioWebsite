import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import InfiniteMenu from './InfiniteMenu';

const Projects: React.FC = () => {
  // Map projects data to match InfiniteMenu items structure
  const items = PROJECTS.map((project, i) => ({
    image: project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g, '')}/600/600?grayscale`,
    link: project.link || '#',
    title: project.title,
    description: project.description[0], // Use the first point as the description
    techStack: project.techStack // Add tech stack to items
  }));

  return (
    <InfiniteMenu items={items} />
  );
};

export default Projects;
