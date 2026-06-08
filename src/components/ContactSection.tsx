import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, Code2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Bedouin121',
    username: '@Bedouin121',
    color: 'hover:text-foreground',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/hasib-turjo-01263b2b4/',
    username: '@hasib-turjo',
    color: 'hover:text-[#0A66C2]',
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/hturjo121/',
    username: '@hturjo121',
    color: 'hover:text-[#FFA116]',
  },
  {
    name: 'Codeforces',
    icon: Trophy,
    url: 'https://codeforces.com/profile/turjo.cache',
    username: '@turjo.cache',
    color: 'hover:text-[#1F8ACB]',
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
    alert('Message sent! (Demo only)');
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-72 h-72 bg-primary/30 bottom-0 left-1/4 animate-float" />
        <div className="floating-orb w-64 h-64 bg-secondary/30 top-1/4 right-1/4 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-lg">07.</span>
            <h2 className="section-heading">Get In Touch</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                  Whether you have a question or just want to say hi, I'll get back to you!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:turjo.cache@gmail.com" className="text-foreground hover:text-primary transition-colors">
                      turjo.cache@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4 font-mono">Find me on</p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className={`glass-card-hover p-4 flex items-center gap-3 group ${link.color}`}
                    >
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-inherit transition-colors" />
                      <div>
                        <p className="font-medium text-sm">{link.name}</p>
                        <p className="text-xs text-muted-foreground">{link.username}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Let's work together..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
