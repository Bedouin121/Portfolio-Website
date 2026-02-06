import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript/TypeScript', level: 88 },
      { name: 'Dart', level: 82 },
      { name: 'Swift', level: 70 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'Flutter', level: 95 },
      { name: 'React', level: 85 },
      { name: 'Mongoose', level: 90 },
      { name: 'MySQL', level: 88 },

    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 75 },
      { name: 'Latex', level: 90 },

    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      ref={ref}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="font-mono text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
          className={`h-full rounded-full relative overflow-hidden ${
            hovered ? 'shadow-[0_0_20px_hsl(var(--primary)/0.5)]' : ''
          }`}
          style={{
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))`,
          }}
        >
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-l from-secondary/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">03.</span>
            <h2 className="section-heading">Skills</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold mb-6 gradient-text">{category.title}</h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6 font-mono text-sm">Technologies I work with</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Flutter', 'Dart', 'React', 'TypeScript', 'Node.js', 'Git', 'Docker'].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-4 py-2 rounded-lg glass-card-hover font-mono text-sm cursor-default"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
