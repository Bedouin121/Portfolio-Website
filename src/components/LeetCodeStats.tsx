import { motion } from 'framer-motion';
import { Code2, Trophy, Target, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LeetCodeData {
  username: string;
  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  total: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const LEETCODE_USERNAME = "hturjo121";

export const LeetCodeStats = () => {
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using alfa-leetcode-api - a reliable public API
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);

        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }

        const data = await response.json();
        
        if (!data.solvedProblem) {
          throw new Error('User not found or invalid data');
        }

        setLeetCodeStats({
          username: LEETCODE_USERNAME,
          solved: {
            all: data.solvedProblem || 0,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0
          },
          total: {
            easy: 100,
            medium: 100,
            hard: 100
          }
        });
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-2xl flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading LeetCode stats...</p>
        </div>
      </div>
    );
  }

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (error || !leetCodeStats) {
    return (
      <div className="glass-card p-6 rounded-2xl flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm text-muted-foreground">
            {error || 'Failed to load LeetCode stats'}
          </p>
          <button 
            onClick={handleRetry} 
            className="text-xs text-primary hover:underline px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
  const difficulties = [
    { 
      label: 'Easy', 
      solved: leetCodeStats.solved.easy, 
      total: leetCodeStats.total.easy,
      color: 'bg-[#00b8a3]',
      bgColor: 'bg-[#00b8a3]/20',
      textColor: 'text-[#00b8a3]'
    },
    { 
      label: 'Medium', 
      solved: leetCodeStats.solved.medium, 
      total: leetCodeStats.total.medium,
      color: 'bg-[#ffb800]',
      bgColor: 'bg-[#ffb800]/20',
      textColor: 'text-[#ffb800]'
    },
    { 
      label: 'Hard', 
      solved: leetCodeStats.solved.hard, 
      total: leetCodeStats.total.hard,
      color: 'bg-[#ff375f]',
      bgColor: 'bg-[#ff375f]/20',
      textColor: 'text-[#ff375f]'
    },
  ];

  const totalSolved = leetCodeStats.solved.all;
  const totalProblems = leetCodeStats.total.easy + leetCodeStats.total.medium + leetCodeStats.total.hard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">LeetCode Progress</h3>
          <p className="text-sm text-muted-foreground font-mono">@{leetCodeStats.username}</p>
        </div>
        <a 
          href={`https://leetcode.com/u/${leetCodeStats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-primary hover:underline"
        >
          View Profile →
        </a>
      </div>

      {/* Total solved circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={440}
              initial={{ strokeDashoffset: 440 }}
              whileInView={{ strokeDashoffset: 440 - (440 * (totalSolved / totalProblems)) }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              className="text-4xl font-bold gradient-text"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {totalSolved}
            </motion.span>
            <span className="text-sm text-muted-foreground">Solved</span>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="space-y-4">
        {difficulties.map((diff, index) => (
          <motion.div
            key={diff.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {diff.label === 'Easy' && <Zap className={`w-4 h-4 ${diff.textColor}`} />}
                {diff.label === 'Medium' && <Target className={`w-4 h-4 ${diff.textColor}`} />}
                {diff.label === 'Hard' && <Trophy className={`w-4 h-4 ${diff.textColor}`} />}
                <span className={diff.textColor}>{diff.label}</span>
              </div>
              <span className="text-muted-foreground font-mono">
                {diff.solved}/{diff.total}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${diff.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(diff.solved / diff.total) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats badges */}
      <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-border">
        {difficulties.map((diff) => (
          <div 
            key={diff.label}
            className={`px-3 py-1.5 rounded-full ${diff.bgColor} ${diff.textColor} text-xs font-mono`}
          >
            {diff.solved} {diff.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
