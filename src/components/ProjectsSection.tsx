import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Folder, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Legal Shathi',
    description: 'AI-powered legal platform for Bangladesh that combines law search, document generation, and legal assistance in one system.',
    tech: ['React', 'OpenAI', 'NodeJS', 'BarikoiAPI'],
    github: 'https://github.com/Bedouin121/Legal-Shathi,
    featured: true,
    image: 'ecommerce',
  },
  {
    title: 'SwiftShip',
    description: 'A Centralized Logistics Platform for streamlined shipping and delivery management.',
    tech: ['Flutter', 'Firebase', 'REST API', 'Google Maps'],
    github: 'https://github.com/Bedouin121/Swiftship',
    featured: true,
    image: '/legalshathi.jpg,
  },
  {
    title: 'Breast Cancer Diagnosis using Neural Networks',
    description: 'Identification and Diagnosis of tumor lesions from Ultrasonography scans utilizing a U-Net style CNN.',
    tech: ['Python', 'TensorFlow', 'U-Net', 'Computer Vision'],
    github: 'https://github.com/Bedouin121/Breast-Cancer-Diagnosis-using-Neural-Network',
    featured: true,
    image: '/BC.jpg',
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with animations and 7-day forecasts.',
    tech: ['Flutter', 'REST API', 'Lottie'],
    github: 'https://github.com',
    featured: false,
  },
  {
    title: 'Task Manager',
    description: 'Productivity app with drag-drop lists and calendar sync.',
    tech: ['Flutter', 'Riverpod', 'Hive'],
    github: 'https://github.com',
    featured: false,
  },
  {
    title: 'Crypto Portfolio',
    description: 'Real-time cryptocurrency tracker with price alerts.',
    tech: ['Flutter', 'WebSocket', 'Charts'],
    github: 'https://github.com',
    featured: false,
  },
];

const FeaturedProject = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className={`relative grid md:grid-cols-12 items-center gap-4 ${isEven ? '' : 'md:text-right'}`}
    >
      {/* Project image/preview */}
      <div className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative aspect-video rounded-xl overflow-hidden glass-card group cursor-pointer"
          >
            {project.image.startsWith('/') ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Folder className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                    <p className="font-mono text-muted-foreground text-sm">{project.image}</p>
                  </div>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </a>
      </div>

      {/* Project info */}
      <div className={`md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className={`relative z-10 ${isEven ? '' : 'md:text-right'}`}>
          <p className="font-mono text-primary text-sm mb-2">Featured Project</p>
          <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          </h3>
          <div className={`glass-card p-6 mb-4 ${isEven ? 'md:-ml-8' : 'md:-mr-8'}`}>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div className={`flex flex-wrap gap-2 ${isEven ? '' : 'md:justify-end'}`}>
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-sm text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card-hover p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <Folder className={`w-10 h-10 ${hovered ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
        <div className="flex gap-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">{project.title}</h3>
      <p className="text-muted-foreground text-sm flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-xs text-primary/70">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">04.</span>
            <h2 className="section-heading">Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Featured projects */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.title} project={project} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Other projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-2">Other Noteworthy Projects</h3>
            <p className="text-muted-foreground">View the archive</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
