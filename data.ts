import { ExperienceItem, ProjectItem, SkillCategory, SocialLink } from './types';

export const RESUME_SUMMARY = `
Heet Shah is a Computer Science student at Georgia Institute of Technology, expected to graduate in May 2026. 
He is concentrating in Cybersecurity & Privacy and Intelligence.
He has experience as a Software Engineering Intern at UPS (Incoming/Summer 2025) and iVue (Dec 2023 - Jun 2024).
His projects include MedX (Healthcare app with Gemini AI), Trace AI (Dance choreography analysis), and CommuRide (Carpooling platform).
He is skilled in Java, Python, JavaScript, C, C#, .NET, React, and Machine Learning tools like TensorFlow.
`;

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "United Parcel Service (UPS)",
    role: "Software Engineering Intern",
    location: "Atlanta, Georgia",
    period: "Jun 2025 – Aug 2025",
    description: [
      "Improved operational visibility and failure detection across global package scanning systems using .NET Core, GCP (BigQuery, Cloud Storage), and SQL.",
      "Enhanced proactive system monitoring with automated email/SMS alerts and Looker Studio visualizations.",
      "Increased developer efficiency by optimizing query execution times and engineering secure data pipelines."
    ]
  },
  {
    company: "iVue",
    role: "Software Engineering Intern",
    location: "Atlanta, Georgia",
    period: "Dec 2023 – Jun 2024",
    description: [
      "Advanced drone technology to monitor content and control devices worldwide, improving global operational efficiency.",
      "Designed a central drone control website, Worlds iVue, using Vue.js, streamlining remote monitoring and operations."
    ]
  },
  {
    company: "Solutionz Security, Inc.",
    role: "Cybersecurity Intern",
    location: "Remote",
    period: "Jan 2023 – May 2023",
    description: []
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "EcoShip",
    role: "Hackathon Team Lead",
    period: "Jul 2025",
    techStack: ["React Native", "FastAPI", "Gemini API"],
    description: [
      "Pioneered React Native application integrating Gemini API for intelligent logistics support, implementing a proprietary eco-efficiency scoring algorithm that dynamically weighs cost-effectiveness (70%) against environmental impact (30%) to drive sustainable business choices for UPS."
    ],
    image: "/ups.png",
    link: "https://github.com/hxxtsxxh/EcoShip"
  },
  {
    title: "MedX",
    role: "Hackathon Team Lead",
    period: "Feb 2025",
    techStack: ["React Native", "Gemini API", "OpenFDA API", "GCP"],
    description: [
      "Developed a cross-platform mobile health app integrating Gemini for AI-powered medical guidance.",
      "Engineered medication management with barcode scanning and drug interaction checking."
    ],
    image: "/medx.jpg",
    link: "https://devpost.com/software/medx-d7tle6"
  },
  {
    title: "Trace AI",
    role: "Hackathon Team Member",
    period: "Sep 2024",
    techStack: ["React", "Firebase", "MongoDB", "Panda 3D", "TensorFlow"],
    description: [
      "Built a full-stack solution to credit dancers on social media using pose estimation for choreographic comparison.",
      "Addressed 3D animation mapping challenges using Intersection Observer API and joint transformation analysis."
    ],
    image: "/traceai.png",
    link: "https://devpost.com/software/trace-ai"
  },
  {
    title: "CommuRide",
    role: "Hackathon Team Lead",
    period: "Feb 2024",
    techStack: ["React Native", "Firebase", "Google Maps API"],
    description: [
      "Created a community carpooling platform streamlining rider-driver connections.",
      "Implemented personalized experience with Firebase Authentication and formulated a ride-matching algorithm with 95% accuracy."
    ],
    image: "/commuride.png",
    link: "https://devpost.com/software/commuride"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C", "C#", "SQL", "HTML/CSS", "Bash"]
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React.js", "React Native", "Node.js", "Vue.js", ".NET", "TensorFlow", "Keras", "OpenCV"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Google Cloud", "Azure DevOps", "Docker", "Git", "Linux", "Wireshark", "Burpsuite", "Apache"]
  }
];

export const CONTACT_INFO = {
  email: "hshah339@gatech.edu",
  phone: "(470)-304-5824",
  location: "Atlanta, Georgia"
};

export const SOCIALS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/heettshahh",
    icon: "Linkedin"
  },
  {
    platform: "GitHub",
    url: "https://github.com/hxxtsxxh",
    icon: "Github"
  }
];
