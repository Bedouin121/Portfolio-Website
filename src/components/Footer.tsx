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
              { icon: Github, href: 'https://github.com/Bedouin121', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/hasib-turjo-01263b2b4/', label: 'LinkedIn' },
              { icon: Code2, href: 'https://leetcode.com/u/hturjo121', label: 'LeetCode' },
              { icon: Trophy, href: 'https://www.kaggle.com/turjoone', label: 'Kaggle' },
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
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
