// Performance optimization utilities
export const PERFORMANCE_CONFIG = {
  // Reduce animation durations for better performance
  ANIMATION_DURATION: {
    FAST: 0.2,
    NORMAL: 0.4,
    SLOW: 0.6,
  },
  
  // Reduce particle counts
  PARTICLE_COUNTS: {
    FIRE: 15,      // Reduced from 60
    WATER: 12,     // Reduced from 35
    AIR: 15,       // Reduced from 50
    EARTH: 18,     // Reduced from combined 70
    SPACE: 30,     // Reduced from 120
  },
  
  // Animation intervals
  INTERVALS: {
    BACKGROUND_CYCLE: 12000,  // Increased from 8000
    AUTO_RESUME: 45000,       // Increased from 30000
  },
  
  // Performance flags
  ENABLE_BLUR: false,         // Disable heavy backdrop-blur
  ENABLE_COMPLEX_ANIMATIONS: false,
  ENABLE_PARTICLE_INTERACTIONS: false,
  
  // GPU acceleration classes
  GPU_CLASSES: 'gpu-accelerated',
  OPTIMIZED_GLASS: 'glass-card-optimized',
};

// Framer Motion variants optimized for performance
export const optimizedVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: PERFORMANCE_CONFIG.ANIMATION_DURATION.FAST }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: PERFORMANCE_CONFIG.ANIMATION_DURATION.NORMAL }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: PERFORMANCE_CONFIG.ANIMATION_DURATION.NORMAL }
  },
  
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }
};

// Utility to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility to get optimized animation props
export const getAnimationProps = (variant: keyof typeof optimizedVariants) => {
  if (prefersReducedMotion()) {
    return {
      initial: false,
      animate: false,
      exit: false,
      transition: { duration: 0.01 }
    };
  }
  return optimizedVariants[variant];
};

// Performance monitoring
export const performanceMonitor = {
  startTime: 0,
  
  start() {
    this.startTime = performance.now();
  },
  
  end(label: string) {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    if (duration > 16) { // More than one frame at 60fps
      console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
    }
  }
};
