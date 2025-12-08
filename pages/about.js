import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import ProfilePicture from '@assets/images/Photo.jpg';
import { SEO } from '@components/index';

// Animations
import { gsap } from 'gsap';

// Icons
import { FaBriefcase, FaCode, FaServer, FaTools, FaMobile, FaDatabase } from 'react-icons/fa';

// API
import { getSkills } from '@pages/api/skills/index';

// Skill categories mapping
const skillCategories = {
  frontend: {
    label: 'Frontend',
    icon: FaCode,
    skills: [
      'React_tec',
      'react',
      'nextjs',
      'Next.js',
      'vue',
      'Vue.js',
      'angular',
      'Angular',
      'html',
      'HTML',
      'css',
      'CSS',
      'javascript',
      'JavaScript',
      'typescript',
      'TypeScript',
      'tailwind',
      'Tailwind',
      'sass',
      'SASS',
      'bootstrap',
      'Bootstrap',
    ],
  },
  backend: {
    label: 'Backend',
    icon: FaServer,
    skills: [
      'nodejs',
      'Node.js',
      'express',
      'Express',
      'python',
      'Python',
      'django',
      'Django',
      'flask',
      'Flask',
      'java',
      'Java',
      'spring',
      'Spring',
      'php',
      'PHP',
      'laravel',
      'Laravel',
      'ruby',
      'Ruby',
      'rails',
      'Rails',
      'go',
      'Go',
      'rust',
      'Rust',
    ],
  },
  mobile: {
    label: 'Mobile',
    icon: FaMobile,
    skills: ['react native', 'React Native', 'flutter', 'Flutter', 'swift', 'Swift', 'kotlin', 'Kotlin', 'ionic', 'Ionic', 'android', 'Android', 'ios', 'iOS'],
  },
  database: {
    label: 'Database',
    icon: FaDatabase,
    skills: ['mongodb', 'MongoDB', 'postgresql', 'PostgreSQL', 'mysql', 'MySQL', 'firebase', 'Firebase', 'redis', 'Redis', 'graphql', 'GraphQL', 'sql', 'SQL', 'dynamodb', 'DynamoDB'],
  },
  tools: {
    label: 'Tools & Others',
    icon: FaTools,
    skills: [
      'git',
      'Git',
      'docker',
      'Docker',
      'aws',
      'AWS',
      'azure',
      'Azure',
      'gcp',
      'GCP',
      'linux',
      'Linux',
      'figma',
      'Figma',
      'jira',
      'Jira',
      'vscode',
      'VSCode',
      'postman',
      'Postman',
      'webpack',
      'Webpack',
      'vite',
      'Vite',
      'jest',
      'Jest',
      'cypress',
      'Cypress',
    ],
  },
};

// Work experience data
const workExperience = [
  {
    id: 1,
    role: 'Web Developer',
    company: 'Team International',
    period: 'Jul 2024 - Dec 2025',
    description:
      'Delivered and maintained 250+ client websites using HTML, CSS, React, and PHP. Implemented QA checklists and automated scripts to minimize post-launch defects. Built reusable components and premium templates following design system principles.',
    technologies: ['React', 'HTML', 'CSS', 'PHP', 'Agile/Scrum'],
  },
  {
    id: 2,
    role: 'Software Development Intern',
    company: 'Endava',
    period: 'Jan 2024 - Jul 2024',
    description:
      'Developed the frontend of an internal e-commerce platform using TypeScript, React, and Vite. Contributed to an internal CV management system across frontend and backend. Implemented unit tests with Jest and React Testing Library.',
    technologies: ['TypeScript', 'React', 'Vite', 'Node.js', 'Express', 'Azure CosmosDB', 'Jest'],
  },
  {
    id: 3,
    role: 'Software Developer',
    company: 'Kalila Pet',
    period: 'Jan 2023 - Dec 2023',
    description:
      'Built the mobile booking application using React Native, enabling cross-platform access for clients. Contributed to the administrative dashboard and backend logic using Next.js and Node.js.',
    technologies: ['React Native', 'Next.js', 'Node.js'],
  },
  {
    id: 4,
    role: 'Web Developer',
    company: "Karen's Pizza",
    period: 'Jan 2021 - Nov 2021',
    description:
      "Developed the frontend of the company's official website using React, JavaScript, and Tailwind CSS. Collaborated on the implementation of an ordering system using Node.js, Express, and Firebase.",
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express', 'Firebase'],
  },
];

// Function to categorize skills
const categorizeSkills = (skills) => {
  const categorized = {};
  const uncategorized = [];

  // Initialize categories
  Object.keys(skillCategories).forEach((category) => {
    categorized[category] = [];
  });

  skills.forEach((skill) => {
    let found = false;
    for (const [category, config] of Object.entries(skillCategories)) {
      if (config.skills.some((s) => skill.name.toLowerCase().includes(s.toLowerCase()) || skill.id.toLowerCase().includes(s.toLowerCase()))) {
        categorized[category].push(skill);
        found = true;
        break;
      }
    }
    if (!found) {
      uncategorized.push(skill);
    }
  });

  // Add uncategorized to tools
  if (uncategorized.length > 0) {
    categorized.tools = [...categorized.tools, ...uncategorized];
  }

  return categorized;
};

const About = ({ skills }) => {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);

  const categorizedSkills = categorizeSkills(skills);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate profile card
    tl.fromTo(profileRef.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 });

    // Animate bio section
    tl.fromTo(bioRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

    // Animate skills section
    tl.fromTo(skillsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    // Animate skill categories with stagger
    tl.fromTo('.skill-category', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 }, '-=0.3');

    // Animate timeline section
    tl.fromTo(timelineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');

    // Animate timeline items with stagger
    tl.fromTo('.timeline-item', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15 }, '-=0.3');
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Metadata */}
      <SEO
        title="About Jose Gabriel Jiménez"
        description="Learn about Jose Gabriel Jiménez, a passionate Full-Stack Developer with 3+ years of experience in web and mobile app development. Specializing in React, Next.js, Node.js, and React Native, with expertise in building scalable applications across frontend and backend technologies."
        keywords="Jose Gabriel Jimenez, About Jose Gabriel, Full-Stack Developer Bio, React Expert, Next.js Developer, Node.js Developer, Web Developer Portfolio, Mobile Developer, Frontend Expert, Backend Developer, josegabjimenez bio, josegab.dev about"
        url="https://josegab.dev/about"
        type="profile"
      />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section - Profile + Bio */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Profile Card */}
          <div ref={profileRef} className="lg:w-1/3">
            <div className="glass-card p-6 text-center about-card">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg shadow-primary/10">
                <Image src={ProfilePicture} fill alt="Jose Gabriel Jiménez's Picture" className="object-cover" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Jose Gabriel Jiménez</h1>
              {/* <p className="text-white/60 mb-4">Full Stack Developer</p> */}
              <div className="flex justify-center gap-3">
                <span className="glass-button px-3 py-1 rounded-full text-sm">💻 Full-Stack Developer</span>
                {/* <span className="glass-button px-3 py-1 rounded-full text-sm">☕ Coffee Lover</span> */}
              </div>
            </div>
          </div>

          {/* Bio Card */}
          <div ref={bioRef} className="lg:w-2/3">
            <div className="glass-card p-8 h-full about-card">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                I&apos;m a tech and software enthusiast deeply passionate about coding 💻, with expertise in web and mobile app development 📱. I love turning complex problems into simple, beautiful
                solutions.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Alongside my love for technology, I prioritize a healthy lifestyle 💪🏽 and regularly engage in exercise and outdoor activities. As I fuel my creativity and zest for life with a cup of
                coffee ☕, I&apos;m committed to continuous growth and innovation in the ever-evolving tech world.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="stats-pill px-4 py-2 rounded-xl">
                  <span className="stats-pill-label text-sm">Experience</span>
                  <p className="stats-pill-value">3+ Years</p>
                </div>
                <div className="stats-pill px-4 py-2 rounded-xl">
                  <span className="stats-pill-label text-sm">Projects</span>
                  <p className="stats-pill-value">20+</p>
                </div>
                {/* <div className="stats-pill px-4 py-2 rounded-xl">
                  <span className="stats-pill-label text-sm">Clients</span>
                  <p className="stats-pill-value">10+</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            My <span className="text-gradient">Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categorizedSkills).map(([category, categorySkills]) => {
              if (categorySkills.length === 0) return null;
              const CategoryIcon = skillCategories[category].icon;

              return (
                <div key={category} className="skill-category glass-card p-6 about-card hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <CategoryIcon className="text-primary text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold">{skillCategories[category].label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="skill-item group relative">
                        <div
                          style={{ backgroundColor: skill.bg_color }}
                          className="relative rounded-lg w-11 h-11 flex justify-center items-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        >
                          <Image src={skill.image} fill alt={`${skill.name} technology`} className="p-1.5 object-contain" />
                        </div>
                        <span className="skill-tooltip">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div ref={timelineRef}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Work <span className="text-gradient">Experience</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent timeline-line" />

            {workExperience.map((job, index) => (
              <div key={job.id} className={`timeline-item relative flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary shadow-lg shadow-primary/50 timeline-dot z-10" />

                {/* Content card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-6 md:pl-0`}>
                  <div className="glass-card p-4 sm:p-6 about-card hover:border-primary/30 transition-all duration-300 group">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="order-2 sm:order-1">
                        <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">{job.role}</h3>
                        <p className="text-white/60 flex items-center gap-2 text-sm sm:text-base">
                          <FaBriefcase className="text-primary/60 flex-shrink-0" />
                          {job.company}
                        </p>
                      </div>
                      <span className="timeline-period-badge px-3 py-1 rounded-full text-xs sm:text-sm order-1 sm:order-2 self-start whitespace-nowrap">{job.period}</span>
                    </div>
                    <p className="text-white/70 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {job.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag px-2 sm:px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Page props
export const getStaticProps = async () => {
  const skills = await getSkills();
  return {
    props: {
      skills,
    },
  };
};

export default About;
