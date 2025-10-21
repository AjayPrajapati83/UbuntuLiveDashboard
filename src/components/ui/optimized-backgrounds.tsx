'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback } from 'react';

// Optimized Fire Element Background
export const OptimizedFireBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  // Static values to prevent hydration mismatch
  const fireParticles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: `fire-particle-${i}`,
    x: (i * 23 + 17) % 100,
    y: (i * 31 + 13) % 100,
    size: (i % 3) + 2,
    delay: (i * 0.2) % 2,
    intensity: 0.4 + (i % 3) * 0.1,
  })), []);

  const blazes = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: `fire-blaze-${i}`,
    x: 20 + i * 30,
    y: 40 + i * 10,
    width: 12 + i * 2,
    height: 25 + i * 5,
    delay: i * 0.3,
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      style={{ willChange: 'transform' }}
    >
      {/* Simplified Fire Gradient Base - Using CSS animations instead of Framer Motion */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-800/25 to-yellow-600/20 animate-pulse-slow"
        style={{ 
          backgroundSize: '300% 300%',
          willChange: 'background-position',
        }}
      />
      
      {/* Reduced Fire Blazes */}
      {blazes.map((blaze) => (
        <motion.div
          key={blaze.id}
          className="absolute bg-gradient-to-t from-red-600/40 via-orange-500/50 to-yellow-400/60"
          style={{
            left: `${blaze.x}%`,
            bottom: '0%',
            width: `${blaze.width}px`,
            height: `${blaze.height}px`,
            clipPath: 'polygon(40% 100%, 60% 100%, 80% 60%, 70% 40%, 85% 20%, 60% 30%, 50% 0%, 40% 30%, 15% 20%, 30% 40%, 20% 60%)',
            willChange: 'transform',
          }}
          animate={{
            scaleY: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            delay: blaze.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Reduced Fire Particles */}
      {fireParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-t from-red-500/60 to-yellow-400/80"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0.1, particle.intensity, 0.1],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Click Effect - Simplified */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-orange-400/10 to-transparent"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

// Optimized Water Element Background
export const OptimizedWaterBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const bubbles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: `water-bubble-${i}`,
    x: (i * 19 + 11) % 100,
    y: (i * 27 + 23) % 100,
    size: 3 + (i % 4),
    delay: (i * 0.25) % 3,
  })), []);

  const droplets = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: `water-droplet-${i}`,
    x: (i * 13 + 7) % 100,
    y: -(i * 4),
    size: 1 + (i % 3),
    delay: (i * 0.5) % 4,
    speed: 0.5 + (i % 2),
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      style={{ willChange: 'transform' }}
    >
      {/* Simplified Water Gradient Base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-800/25 to-teal-600/20"
        style={{ 
          backgroundSize: '200% 200%',
          animation: 'panchtavya-flow 15s ease-in-out infinite',
          willChange: 'background-position',
        }}
      />
      
      {/* Reduced Water Droplets */}
      {droplets.map((droplet) => (
        <motion.div
          key={droplet.id}
          className="absolute rounded-full bg-gradient-to-b from-blue-300/60 to-cyan-400/70"
          style={{
            left: `${droplet.x}%`,
            width: `${droplet.size}px`,
            height: `${droplet.size * 1.5}px`,
            willChange: 'transform',
          }}
          animate={{
            y: [droplet.y, 120],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 4 + droplet.speed,
            delay: droplet.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Reduced Water Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-300/50 border border-blue-300/20"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Click Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-cyan-300/10 to-transparent"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </motion.div>
  );
};

// Optimized Air Element Background
export const OptimizedAirBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const clouds = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: `air-cloud-${i}`,
    x: -10 + (i * 15),
    y: (i * 12 + 5) % 100,
    size: 20 + (i * 5),
    delay: i * 0.5,
    speed: 0.3 + (i % 2) * 0.3,
  })), []);

  const windParticles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: `air-particle-${i}`,
    x: (i * 7 + 3) % 100,
    y: (i * 11 + 9) % 100,
    size: 1 + (i % 2),
    delay: (i * 0.4) % 6,
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      style={{ willChange: 'transform' }}
    >
      {/* Simplified Air Gradient Base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sky-200/15 via-blue-100/20 to-indigo-200/15"
        style={{ 
          backgroundSize: '150% 150%',
          animation: 'panchtavya-flow 20s ease-in-out infinite',
          willChange: 'background-position',
        }}
      />
      
      {/* Reduced Floating Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full bg-gradient-to-br from-white/20 to-gray-100/30 backdrop-blur-sm"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 80, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 20,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Reduced Wind Particles */}
      {windParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-sky-300/40 to-blue-200/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 60],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Click Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-sky-300/10 to-transparent"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </motion.div>
  );
};

// Optimized Earth Element Background
export const OptimizedEarthBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const floatingRocks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: `earth-floating-rock-${i}`,
    x: (i * 13 + 7) % 100,
    y: (i * 17 + 11) % 100,
    size: 4 + (i % 5),
    rotation: i * 45,
    delay: (i * 0.375) % 3,
  })), []);

  const leaves = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: `earth-leaf-${i}`,
    x: (i * 9 + 5) % 100,
    y: (i * 11 + 7) % 100,
    size: 2 + (i % 3),
    delay: (i * 0.4) % 4,
    rotation: i * 36,
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      style={{ willChange: 'transform' }}
    >
      {/* Simplified Earth Gradient Base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-yellow-800/20 to-green-700/15"
        style={{ 
          backgroundSize: '200% 200%',
          animation: 'panchtavya-flow 25s ease-in-out infinite',
          willChange: 'background-position',
        }}
      />
      
      {/* Reduced Floating Rocks */}
      {floatingRocks.map((rock) => (
        <motion.div
          key={rock.id}
          className="absolute bg-gradient-to-br from-amber-600/30 to-yellow-700/50"
          style={{
            left: `${rock.x}%`,
            top: `${rock.y}%`,
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            transform: `rotate(${rock.rotation}deg)`,
            willChange: 'transform',
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [rock.rotation, rock.rotation + 180, rock.rotation],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10,
            delay: rock.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Reduced Floating Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute bg-gradient-to-br from-green-400/40 to-green-600/60"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.5}px`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `rotate(${leaf.rotation}deg)`,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -20, 0],
            x: [-5, 5, -5],
            rotate: [leaf.rotation, leaf.rotation + 90, leaf.rotation],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Click Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-amber-600/10 to-transparent"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 2 }}
        />
      )}
    </motion.div>
  );
};

// Optimized Space Element Background
export const OptimizedSpaceBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: `space-star-${i}`,
    x: (i * 7 + 3) % 100,
    y: (i * 11 + 5) % 100,
    size: 1 + (i % 3),
    delay: (i * 0.133) % 4,
  })), []);

  const shootingStars = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: `space-shooting-star-${i}`,
    x: (i * 33 + 10) % 100,
    y: (i * 17) % 50,
    delay: i * 2.67,
    speed: 1 + i,
  })), []);

  const planets = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: `space-planet-${i}`,
    x: 20 + i * 30,
    y: 30 + i * 20,
    size: 15 + i * 8,
    color: ['purple', 'indigo', 'blue'][i],
    delay: i * 0.67,
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      style={{ willChange: 'transform' }}
    >
      {/* Simplified Space Gradient Base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/25 via-purple-900/30 to-black/40"
        style={{ 
          backgroundSize: '300% 300%',
          animation: 'panchtavya-flow 30s ease-in-out infinite',
          willChange: 'background-position',
        }}
      />
      
      {/* Reduced Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '60px',
            transformOrigin: 'left center',
            willChange: 'transform',
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 1, 0],
            scaleX: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.speed + 1,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Reduced Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Reduced Floating Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className={`absolute rounded-full bg-gradient-to-br from-${planet.color}-400/20 to-${planet.color}-600/30 border border-${planet.color}-300/20`}
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            willChange: 'transform',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            delay: planet.delay,
          }}
        />
      ))}

      {/* Click Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-purple-400/15 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 3 }}
        />
      )}
    </motion.div>
  );
};

// Optimized Combined Panchtavya Background
export const OptimizedPanchtavyaBackground = () => {
  const [currentElement, setCurrentElement] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const elements = ['fire', 'water', 'air', 'earth', 'space'];

  useEffect(() => {
    if (isManualControl) return;
    
    const interval = setInterval(() => {
      setCurrentElement((prev) => (prev + 1) % elements.length);
    }, 12000); // Increased interval for better performance

    return () => clearInterval(interval);
  }, [isManualControl]);

  const handleElementClick = useCallback((index: number) => {
    setCurrentElement(index);
    setIsManualControl(true);
    
    // Resume auto-cycling after 45 seconds
    setTimeout(() => {
      setIsManualControl(false);
    }, 45000);
  }, []);

  const renderBackground = useCallback(() => {
    switch (elements[currentElement]) {
      case 'fire':
        return <OptimizedFireBackground />;
      case 'water':
        return <OptimizedWaterBackground />;
      case 'air':
        return <OptimizedAirBackground />;
      case 'earth':
        return <OptimizedEarthBackground />;
      case 'space':
        return <OptimizedSpaceBackground />;
      default:
        return <OptimizedFireBackground />;
    }
  }, [currentElement]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        key={currentElement}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {renderBackground()}
      </motion.div>
    </motion.div>
  );
};
