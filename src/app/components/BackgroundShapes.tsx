'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'circle' | 'square' | 'diamond' | 'ring' | 'dot';
  color: string;
  duration: number;
  delay: number;
}

const COLORS = [
  'bg-blue-600/6 dark:bg-blue-500/8',
  'bg-violet-600/6 dark:bg-violet-500/8',
  'bg-emerald-600/5 dark:bg-emerald-500/6',
  'bg-amber-600/4 dark:bg-amber-500/6',
  'bg-rose-600/4 dark:bg-rose-500/5',
  'bg-cyan-600/5 dark:bg-cyan-500/6',
  'bg-indigo-600/6 dark:bg-indigo-500/8',
];

const BORDER_COLORS = [
  'border-blue-600/12 dark:border-blue-500/15',
  'border-violet-600/12 dark:border-violet-500/15',
  'border-emerald-600/10 dark:border-emerald-500/12',
];

function generateShapes(count: number): Shape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 40 + Math.random() * 200,
    type: (['circle', 'square', 'diamond', 'ring', 'dot'] as const)[Math.floor(Math.random() * 5)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 5,
  }));
}

function ShapeElement({ shape }: { shape: Shape }) {
  const baseClasses = `absolute pointer-events-none ${shape.color}`;

  switch (shape.type) {
    case 'circle':
      return (
        <motion.div
          className={`${baseClasses} rounded-full`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      );
    case 'square':
      return (
        <motion.div
          className={`${baseClasses} rounded-3xl`}
          style={{
            width: shape.size * 0.8,
            height: shape.size * 0.8,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, 20, -15, 0],
            rotate: [0, 45, 90, 45, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      );
    case 'diamond':
      return (
        <motion.div
          className={`${baseClasses} rounded-2xl`}
          style={{
            width: shape.size * 0.6,
            height: shape.size * 0.6,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: 'rotate(45deg)',
          }}
          animate={{
            y: [0, -25, 15, 0],
            x: [0, -10, 20, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      );
    case 'ring':
      return (
        <motion.div
          className={`absolute pointer-events-none rounded-full border-2 ${BORDER_COLORS[shape.id % BORDER_COLORS.length]} bg-transparent`}
          style={{
            width: shape.size * 1.2,
            height: shape.size * 1.2,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -20, 10, 0],
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration * 1.2,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      );
    case 'dot':
      return (
        <motion.div
          className={`${baseClasses} rounded-full`}
          style={{
            width: shape.size * 0.15,
            height: shape.size * 0.15,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -40, 20, 0],
            x: [0, 20, -15, 0],
            opacity: [0.4, 0.8, 0.3, 0.4],
          }}
          transition={{
            duration: shape.duration * 0.7,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      );
  }
}

interface BackgroundShapesProps {
  count?: number;
  className?: string;
}

export default function BackgroundShapes({ count = 12, className = '' }: BackgroundShapesProps) {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    setShapes(generateShapes(count));
  }, [count]);

  if (shapes.length === 0) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10" />
      
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 0.5px, transparent 0.5px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial gradient lights */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-violet-400/10 dark:from-blue-500/10 dark:to-violet-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-emerald-400/20 to-cyan-400/10 dark:from-emerald-500/10 dark:to-cyan-500/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <ShapeElement key={shape.id} shape={shape} />
      ))}
    </div>
  );
}
