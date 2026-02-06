import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Code2, Trophy } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6 mb-8"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Code2, href: 'https://leetcode.com/u/hturjo121', label: 'LeetCode' },
              { icon: Trophy, href: 'https://kaggle.com', label: 'Kaggle' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <p className="font-mono text-sm text-muted-foreground">
              Designed & Built with{' '}
              <Heart className="w-4 h-4 inline-block text-destructive animate-pulse" />{' '}
              using Flutter & React
            </p>
            <p className="font-mono text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
