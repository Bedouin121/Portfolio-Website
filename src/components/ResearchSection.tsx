import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, ExternalLink, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const research = [
  {
    title: 'Motion to Meaning: Word-Level Bangla Sign Language Recognition Using Mid-Fusion of CNN and TCN',
    journal: 'No journal yet',
    year: '2026',
    abstract: 'Proposal of a robust mid-fusion multimodal framework for Bangla Sign Language word-level recognition, combining RGB and landmark streams and introducing the BdSL-300 dataset to achieve high accuracy under real-world variability.',
    authors: [],
    link: '#',
    citations: 0,
  },
];

export const ResearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="research" className="py-32 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">05.</span>
            <h2 className="section-heading">Research</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Research papers */}
          <div className="space-y-6">
            {research.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-card-hover p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="hidden sm:flex p-4 rounded-xl bg-primary/10 shrink-0">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-4 justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors flex-1">
                        {paper.title}
                      </h3>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={paper.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {paper.journal}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                        {paper.year}
                      </span>
                      {paper.citations > 0 && (
                        <span className="font-mono text-primary/70">{paper.citations} citations</span>
                      )}
                      {paper.citations === 0 && (
                        <span className="font-mono text-muted-foreground">No citations yet</span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4">{paper.abstract}</p>

                    {paper.authors.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {paper.authors.map((author, i) => (
                            <span key={author}>
                              <span className={author === 'Your Name' ? 'text-primary font-medium' : ''}>
                                {author}
                              </span>
                              {i < paper.authors.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {[
              { label: 'Publications', value: '1' },
              { label: 'Citations', value: '0' },
              { label: 'Year', value: '2026' },
            ].map((stat) => (
              <div key={stat.label} className="text-center glass-card p-6">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
