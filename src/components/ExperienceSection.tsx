import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Building2, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Student Researcher',
    company: 'CVIS Lab - BRAC University',
    location: 'Dhaka',
    period: 'June 2024 – December 2025',
    description: [
      'Co-developed a Bangla Sign Language recognition system using a mid-fusion CNN + TCN architecture trained on 2,000+ video samples, achieving ~92% word-level accuracy — the first application of mid-fusion to Bangla sign language recognition.',
      'Designed and executed NLP preprocessing pipelines, including labeling, tokenization, and text representation, for a multimodal dataset, enabling downstream model training for the Bangla Sign Language recognition project.',
      'Built and evaluated CNN-based image classification models for feature extraction tasks, running ~1000 experimental iterations across architectures to identify the best-performing configuration for the lab\'s computer vision pipeline.',
    ],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">06.</span>
            <h2 className="section-heading">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Experience tabs */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Tab list */}
            <div className="md:w-48 flex md:flex-col overflow-x-auto md:overflow-x-visible">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-6 py-4 text-left font-mono text-sm whitespace-nowrap transition-all duration-300 ${
                    activeIndex === index
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {/* Active indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-0.5 md:w-0.5 bg-primary transition-opacity duration-300 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-[300px]">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 20,
                    display: activeIndex === index ? 'block' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {exp.title}
                    <span className="text-primary"> @ {exp.company}</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
