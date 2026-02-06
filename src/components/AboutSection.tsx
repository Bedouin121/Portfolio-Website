import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Layout, Server, Database } from 'lucide-react';
import { LeetCodeStats } from './LeetCodeStats';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Computer Vision',
    description: 'Research experience in sign language recognition using AI and computer vision',
  },
  {
    icon: Code2,
    title: 'Problem Solving',
    description: 'Strong foundation in competitive programming and LeetCode style challenges',
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    description: 'Building clean and responsive interfaces with Flutter and React',
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    description: 'Experience with Java based backends and API driven architectures',
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Working with both MySQL and MongoDB for structured and flexible data storage',
  },
];


export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">01.</span>
            <h2 className="section-heading">About Me</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hello! I'm a passionate <span className="text-primary font-medium">Flutter Developer</span> with a strong interest in 
                building efficient and scalable applications. My journey into software development started with curiosity about how 
                systems work behind the scenes and has grown into hands on experience across multiple areas of development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I have worked on projects involving AI and computer vision, including a research project on sign language 
                recognition. Alongside Flutter, I have experience with React for frontend development, Java based backend 
                systems, and working with both MySQL and MongoDB databases. I focus on writing clean, maintainable code and 
                building solutions that are reliable and performance focused.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Outside of project work, I regularly practice competitive programming, solve problems on platforms like 
                LeetCode, and explore new technologies to strengthen my problem solving skills and broaden my technical 
                understanding.
              </p>

              {/* Highlight cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass-card-hover p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column: Profile image + LeetCode stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Profile image placeholder */}
              <div className="relative group">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card p-2">
                  <img 
                    src="/me.jpg" 
                    alt="Profile" 
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                {/* Decorative border */}
                <div className="absolute -inset-px rounded-2xl gradient-border opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* LeetCode Stats */}
              <LeetCodeStats />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
