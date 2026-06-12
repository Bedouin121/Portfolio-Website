import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Folder, ExternalLink } from 'lucide-react';

/* -----------------------------
Types
------------------------------ */

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  image?: string;
};

/* -----------------------------
Safe Data
------------------------------ */

const projects: Project[] = [
  {
    title: 'Legal Shathi',
    description:
      'AI-powered legal platform for Bangladesh combining law search, document generation, and assistance.',
    tech: ['React', 'OpenAI', 'NodeJS', 'BarikoiAPI'],
    github: 'https://github.com/Bedouin121/Legal-Shathi',
    featured: true,
    image: '/images/legalshathi.jpg',
  },
  {
    title: 'SwiftShip',
    description:
      'Centralized logistics platform for shipping and delivery management.',
    tech: ['Flutter', 'Firebase', 'REST API', 'Google Maps'],
    github: 'https://github.com/Bedouin121/Swiftship',
    featured: true,
    image: '/images/SwiftShip.jpg',
  },
  {
    title: 'Breast Cancer Diagnosis',
    description:
      'U-Net CNN for tumor detection from ultrasonography scans.',
    tech: ['Python', 'TensorFlow', 'U-Net', 'Computer Vision'],
    github:
      'https://github.com/Bedouin121/Breast-Cancer-Diagnosis-using-Neural-Network',
    featured: true,
    image: '/images/BC.jpg',
  },
  {
    title: 'PaperMInd',
    description: 'A minimalist RAG-based AI pipeline designed to ingest complex multi-page documents, extract structured semantic insights, and generate deterministic, sourced answers with zero friction.',
    tech: ['Python', 'TensorFlow', 'Vector Databases', 'LLM Aggregation'],
    github: 'https://github.com/Bedouin121/PaperMind',
    featured: true,
    image: '/images/PM.png',
  },
  {
    title: 'Shop at Turjo',
    description: 'E-commerce platform showcase built with WordPress, Elementor, WooCommerce and WooPayments integration.',
    tech: ['WordPress', 'Elementor', 'WooCommerce', 'WooPayments'],
    live: 'https://shopatturjo.fwh.is/',
    featured: true,
    image: '/images/shop.png',
  },
];

/* -----------------------------
Helpers
------------------------------ */

const isImagePath = (img?: string) =>
  typeof img === 'string' &&
  (img.startsWith('/') || img.startsWith('http'));

const isValidUrl = (url?: string) =>
  typeof url === 'string' && /^https?:\/\//.test(url);

/* -----------------------------
Image Component
------------------------------ */

const ProjectImage = ({
  src,
  title,
}: {
  src?: string;
  title: string;
}) => {
  if (!isImagePath(src)) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        No Preview Available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
};

/* -----------------------------
Featured Project
------------------------------ */

const FeaturedProject = ({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`grid md:grid-cols-12 gap-6 items-center ${
        isEven ? '' : 'md:text-right'
      }`}
    >
      {/* Image */}
      <div className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          <ProjectImage src={project.image} title={project.title} />
        </div>
      </div>

      {/* Content */}
      <div className={`md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <p className="text-sm text-primary font-mono mb-2">
          Featured Project
        </p>

        <a
          href={isValidUrl(project.live ?? project.github) ? (project.live ?? project.github) : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-bold hover:text-primary transition"
        >
          {project.title}
        </a>

        <div className="mt-4 p-4 rounded-lg bg-muted/40">
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition flex items-center gap-1"
            >
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline transition flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Live Site
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* -----------------------------
Project Card
------------------------------ */

const ProjectCard = ({
  project,
  inView,
  index,
}: {
  project: Project;
  inView: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 rounded-xl border bg-card"
    >
      <Folder
        className={`w-8 h-8 transition ${
          hovered ? 'text-primary' : 'text-muted-foreground'
        }`}
      />

      <h3 className="mt-3 font-semibold text-lg">{project.title}</h3>

      <p className="text-sm text-muted-foreground mt-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-mono text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* -----------------------------
Main Section
------------------------------ */

export const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { featured, others } = useMemo(() => {
    return {
      featured: projects.filter((p) => p.featured),
      others: projects.filter((p) => !p.featured),
    };
  }, []);

  return (
    <section ref={ref} className="max-w-6xl mx-auto py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="mb-12"
      >
        <p className="text-sm font-mono text-primary">04.</p>
        <h2 className="text-3xl font-bold">Projects</h2>
      </motion.div>

      {/* Featured */}
      <div className="space-y-24">
        {featured.map((p, i) => (
          <FeaturedProject
            key={p.title}
            project={p}
            index={i}
            inView={inView}
          />
        ))}
      </div>

      {/* Other */}
      <div className="mt-20 text-center">
        <h3 className="text-xl font-semibold">
          Other Noteworthy Projects
        </h3>
        <p className="text-muted-foreground text-sm">
          Archive of smaller builds
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {others.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
};
