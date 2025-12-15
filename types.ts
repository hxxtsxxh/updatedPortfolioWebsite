export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  role: string;
  period: string;
  techStack: string[];
  description: string[];
  image: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact'
}
