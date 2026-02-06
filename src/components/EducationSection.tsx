import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering ',
    school: 'BRAC University',
    location: 'Dhaka, Bangladesh',
    period: '2022 - 2026',
    description: 'Specialized in research and practical realsm of Computer Science',
    achievements: ['Undergraduate Researcher', 'IEEE Member'],
  },
  {
    degree: 'Higher Secondary Educations',
    school: 'RAJUK Uttara Model College',
    location: 'Dhaka, Bangladesh',
    period: '2020 - 2022',
    description: 'Passed with a cumulative GPA of 5.00',
    achievements: ['Photography Club'],
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="py-32 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">02.</span>
            <h2 className="section-heading">Education</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                </div>

                <div className="glass-card-hover p-8">
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.degree}</h3>
                      <p className="text-lg text-primary font-medium">{item.school}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono"
                      >
                        <Award className="w-3 h-3" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
