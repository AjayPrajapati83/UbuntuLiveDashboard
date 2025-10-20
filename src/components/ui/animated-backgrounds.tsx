'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Fire Element Background
export const FireBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const fireParticles = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: `fire-particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 3,
    intensity: Math.random() * 0.5 + 0.5,
  })), []);

  const blazes = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: `fire-blaze-${i}`,
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 30,
    width: Math.random() * 20 + 15,
    height: Math.random() * 40 + 30,
    delay: Math.random() * 2,
  })), []);

  const sparks = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: `fire-spark-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
  })), []);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={() => setIsClicked(!isClicked)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Fire Gradient Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-800/40 to-yellow-600/30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: isClicked ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isClicked ? 4 : 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '400% 400%' }}
      />
      
      {/* Fire Blazes */}
      {blazes.map((blaze) => (
        <motion.div
          key={blaze.id}
          className="absolute bg-gradient-to-t from-red-600/60 via-orange-500/70 to-yellow-400/80"
          style={{
            left: `${blaze.x}%`,
            bottom: '0%',
            width: `${blaze.width}px`,
            height: `${blaze.height}px`,
            clipPath: 'polygon(40% 100%, 60% 100%, 80% 60%, 70% 40%, 85% 20%, 60% 30%, 50% 0%, 40% 30%, 15% 20%, 30% 40%, 20% 60%)',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [0.8, 1.4, 0.8],
            scaleX: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: blaze.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Fire Particles */}
      {fireParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-t from-red-500 to-yellow-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [-30, -120, -30],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, particle.intensity, 0.2],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Flying Sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, -Math.random() * 80 - 20],
            opacity: [1, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Fire Waves */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-600/40 to-transparent"
        animate={{
          scaleY: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Click Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-orange-400/20 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
};

// Water Element Background
export const WaterBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const bubbles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: `water-bubble-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  })), []);

  const droplets = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: `water-droplet-${i}`,
    x: Math.random() * 100,
    y: -Math.random() * 50,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 6,
    speed: Math.random() * 2 + 1,
  })), []);

  const waves = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: `water-wave-${i}`,
    index: i,
    delay: i * 0.5,
    amplitude: Math.random() * 20 + 10,
  })), []);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setIsClicked(true);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
    
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Water Gradient Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/40 to-teal-600/30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: isClicked ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isClicked ? 6 : 12,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '300% 300%' }}
      />
      
      {/* Falling Water Droplets */}
      {droplets.map((droplet) => (
        <motion.div
          key={droplet.id}
          className="absolute rounded-full bg-gradient-to-b from-blue-300/80 to-cyan-400/90 backdrop-blur-sm"
          style={{
            left: `${droplet.x}%`,
            width: `${droplet.size}px`,
            height: `${droplet.size * 1.5}px`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [droplet.y, window.innerHeight + 50],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3 + droplet.speed,
            delay: droplet.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Water Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-400/50 to-cyan-300/70 backdrop-blur-sm border border-blue-300/40"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [-8, 8, -8],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Animated Waves */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute inset-x-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent"
          style={{
            bottom: `${wave.index * 15}%`,
          }}
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            y: [0, -wave.amplitude, 0],
          }}
          transition={{
            duration: 4 + wave.index,
            delay: wave.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Water Surface Reflections */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-cyan-300/60"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
};

// Air Element Background
export const AirBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [windBurst, setWindBurst] = useState(false);
  
  const clouds = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: `air-cloud-${i}`,
    x: Math.random() * 120 - 10,
    y: Math.random() * 100,
    size: Math.random() * 50 + 25,
    delay: Math.random() * 6,
    speed: Math.random() * 0.5 + 0.5,
    direction: Math.random() > 0.5 ? 1 : -1,
  })), []);

  const windParticles = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: `air-particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    direction: Math.random() > 0.5 ? 1 : -1,
  })), []);

  const windStreams = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: `air-stream-${i}`,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    thickness: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.2,
  })), []);

  const handleClick = () => {
    setIsClicked(true);
    setWindBurst(true);
    
    setTimeout(() => setIsClicked(false), 500);
    setTimeout(() => setWindBurst(false), 2000);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Air Gradient Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sky-200/25 via-blue-100/35 to-indigo-200/25"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: isClicked ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isClicked ? 8 : 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Floating Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full bg-gradient-to-br from-white/30 to-gray-100/40 backdrop-blur-sm shadow-lg"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            filter: 'blur(1px)',
          }}
          animate={{
            x: windBurst ? [0, 150 * cloud.direction, 0] : [0, 120, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: windBurst ? 15 : (25 + Math.random() * 15),
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Wind Particle Streams */}
      {windParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-sky-300/60 to-blue-200/80"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: windBurst ? [0, 200 * particle.direction] : [0, 100 * particle.direction],
            y: [0, Math.random() * 40 - 20],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: windBurst ? 3 : (6 + Math.random() * 4),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Flowing Wind Streams */}
      {windStreams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute bg-gradient-to-r from-transparent via-sky-300/30 to-transparent"
          style={{
            top: `${stream.y}%`,
            left: '-30%',
            right: '-30%',
            height: `${stream.thickness}px`,
            opacity: stream.opacity,
          }}
          animate={{
            x: windBurst ? ['-150%', '150%'] : ['-120%', '120%'],
            opacity: [0, stream.opacity, 0],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: windBurst ? 4 : (8 + Math.random() * 6),
            delay: stream.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wind Swirls */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`wind-swirl-${i}`}
          className="absolute rounded-full border border-sky-300/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10 + i * 2,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Wind Burst Effect */}
      {windBurst && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-sky-300/20 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

// Earth Element Background
export const EarthBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [earthquake, setEarthquake] = useState(false);
  
  const floatingRocks = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: `earth-floating-rock-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 6,
    rotation: Math.random() * 360,
    delay: Math.random() * 4,
  })), []);

  const fallingRocks = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: `earth-falling-rock-${i}`,
    x: Math.random() * 100,
    y: -Math.random() * 100,
    size: Math.random() * 12 + 8,
    rotation: Math.random() * 360,
    delay: Math.random() * 8,
    speed: Math.random() * 2 + 1,
  })), []);

  const leaves = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: `earth-leaf-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 6,
    rotation: Math.random() * 360,
  })), []);

  const grassBlades = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: `earth-grass-${i}`,
    x: Math.random() * 100,
    y: 80 + Math.random() * 20,
    height: Math.random() * 20 + 15,
    delay: Math.random() * 3,
  })), []);

  const handleClick = () => {
    setIsClicked(true);
    setEarthquake(true);
    
    setTimeout(() => setIsClicked(false), 500);
    setTimeout(() => setEarthquake(false), 3000);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      animate={earthquake ? { x: [-2, 2, -2, 2, 0] } : {}}
    >
      {/* Earth Gradient Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-yellow-800/35 to-green-700/25"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: isClicked ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isClicked ? 10 : 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '300% 300%' }}
      />
      
      {/* Grass Blades */}
      {grassBlades.map((grass) => (
        <motion.div
          key={grass.id}
          className="absolute bg-gradient-to-t from-green-600/60 to-green-400/80"
          style={{
            left: `${grass.x}%`,
            top: `${grass.y}%`,
            width: '2px',
            height: `${grass.height}px`,
            transformOrigin: 'bottom center',
          }}
          animate={{
            rotate: earthquake ? [-10, 10, -10, 10, 0] : [-3, 3, -3],
            scaleY: [1, 1.1, 1],
          }}
          transition={{
            duration: earthquake ? 0.5 : (2 + Math.random() * 2),
            delay: grass.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Falling Rocks */}
      {fallingRocks.map((rock) => (
        <motion.div
          key={rock.id}
          className="absolute bg-gradient-to-br from-stone-600/70 to-stone-800/90 shadow-lg"
          style={{
            left: `${rock.x}%`,
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
          }}
          animate={{
            y: [rock.y, window.innerHeight + 100],
            rotate: [rock.rotation, rock.rotation + 720],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4 + rock.speed,
            delay: rock.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}
      
      {/* Floating Rocks/Crystals */}
      {floatingRocks.map((rock) => (
        <motion.div
          key={rock.id}
          className="absolute bg-gradient-to-br from-amber-600/50 to-yellow-700/70 backdrop-blur-sm shadow-md"
          style={{
            left: `${rock.x}%`,
            top: `${rock.y}%`,
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            transform: `rotate(${rock.rotation}deg)`,
          }}
          animate={{
            y: earthquake ? [-20, 20, -20] : [-15, 15, -15],
            rotate: [rock.rotation, rock.rotation + 360, rock.rotation],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: earthquake ? 2 : (8 + Math.random() * 4),
            delay: rock.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute bg-gradient-to-br from-green-400/60 to-green-600/80"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.5}px`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `rotate(${leaf.rotation}deg)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [-10, 10, -10],
            rotate: [leaf.rotation, leaf.rotation + 180, leaf.rotation],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Earth Layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-800/50 via-green-800/30 to-transparent"
        animate={{
          scaleX: earthquake ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: earthquake ? 3 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mountain Silhouettes */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-700/40 to-transparent"
        style={{
          clipPath: 'polygon(0% 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Earthquake Effect */}
      {earthquake && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-amber-600/20 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

// Space Element Background
export const SpaceBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [cosmicBurst, setCosmicBurst] = useState(false);
  
  const stars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    id: `space-star-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    twinkleSpeed: Math.random() * 2 + 1,
  })), []);

  const shootingStars = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: `space-shooting-star-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 50,
    delay: Math.random() * 10,
    speed: Math.random() * 3 + 2,
  })), []);

  const planets = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: `space-planet-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 35 + 20,
    color: ['purple', 'indigo', 'blue', 'violet', 'pink'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 3,
  })), []);

  const cosmicDust = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: `space-dust-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 8,
  })), []);

  const handleClick = () => {
    setIsClicked(true);
    setCosmicBurst(true);
    
    setTimeout(() => setIsClicked(false), 800);
    setTimeout(() => setCosmicBurst(false), 4000);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.3 }}
    >
      {/* Space Gradient Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/50 to-black/60"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: isClicked ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: isClicked ? 15 : 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '400% 400%' }}
      />
      
      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '100px',
            transformOrigin: 'left center',
          }}
          animate={{
            x: [0, window.innerWidth],
            y: [0, 200],
            opacity: [0, 1, 1, 0],
            scaleX: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.speed,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white shadow-white/50"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: cosmicBurst ? `0 0 ${star.size * 2}px rgba(255,255,255,0.8)` : 'none',
          }}
          animate={{
            opacity: cosmicBurst ? [0.3, 1, 0.3] : [0.2, 1, 0.2],
            scale: cosmicBurst ? [0.8, 1.5, 0.8] : [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: cosmicBurst ? 1 : (2 + Math.random() * 3),
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cosmic Dust */}
      {cosmicDust.map((dust) => (
        <motion.div
          key={dust.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-300/40 to-blue-300/60"
          style={{
            left: `${dust.x}%`,
            top: `${dust.y}%`,
            width: `${dust.size}px`,
            height: `${dust.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            delay: dust.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className={`absolute rounded-full bg-gradient-to-br from-${planet.color}-400/40 to-${planet.color}-600/50 backdrop-blur-sm border border-${planet.color}-300/30 shadow-lg`}
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            boxShadow: cosmicBurst ? `0 0 ${planet.size}px rgba(147, 51, 234, 0.5)` : 'none',
          }}
          animate={{
            rotate: [0, 360],
            scale: cosmicBurst ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: cosmicBurst ? 8 : (15 + Math.random() * 10),
            delay: planet.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Nebula Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(147, 51, 234, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(79, 70, 229, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: cosmicBurst ? [0.5, 1, 0.5] : [0.3, 0.8, 0.3],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: cosmicBurst ? 6 : 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Galaxy Spiral */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.1), transparent, rgba(79, 70, 229, 0.1), transparent)',
        }}
        animate={{
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Cosmic Burst Effect */}
      {cosmicBurst && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-400/30 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

// Combined Panchtavya Background
export const PanchtavyaBackground = () => {
  const [currentElement, setCurrentElement] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const elements = ['fire', 'water', 'air', 'earth', 'space'];

  useEffect(() => {
    if (isManualControl) return;
    
    const interval = setInterval(() => {
      setCurrentElement((prev) => (prev + 1) % elements.length);
    }, 8000); // Change element every 8 seconds

    return () => clearInterval(interval);
  }, [isManualControl]);

  const handleElementClick = (index: number) => {
    setCurrentElement(index);
    setIsManualControl(true);
    
    // Resume auto-cycling after 30 seconds of manual control
    setTimeout(() => {
      setIsManualControl(false);
    }, 30000);
  };

  const renderBackground = () => {
    switch (elements[currentElement]) {
      case 'fire':
        return <FireBackground />;
      case 'water':
        return <WaterBackground />;
      case 'air':
        return <AirBackground />;
      case 'earth':
        return <EarthBackground />;
      case 'space':
        return <SpaceBackground />;
      default:
        return <FireBackground />;
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden"
      whileHover={{ scale: 1.002 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={currentElement}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {renderBackground()}
      </motion.div>
      
    </motion.div>
  );
};

// Particles Background (ReactBits inspired)
export const ParticlesBackground = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [particleBurst, setParticleBurst] = useState(false);
  
  const particles = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: `particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 3,
    color: ['white', 'blue', 'purple', 'cyan', 'pink'][Math.floor(Math.random() * 5)],
  })), []);

  const connections = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: `connection-${i}`,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    delay: Math.random() * 4,
  })), []);

  const handleClick = () => {
    setIsClicked(true);
    setParticleBurst(true);
    
    setTimeout(() => setIsClicked(false), 600);
    setTimeout(() => setParticleBurst(false), 3000);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/30 to-purple-900/20"
        animate={{
          opacity: isClicked ? [0.5, 0.8, 0.5] : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Connection Lines */}
      {connections.map((connection) => (
        <motion.svg
          key={connection.id}
          className="absolute inset-0 w-full h-full pointer-events-none"
          animate={{
            opacity: particleBurst ? [0.2, 0.8, 0.2] : [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: connection.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.line
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: connection.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      ))}
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br from-${particle.color}-400/50 to-${particle.color}-200/70 backdrop-blur-sm`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: particleBurst ? `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.6)` : 'none',
          }}
          animate={{
            y: particleBurst ? [0, -150, 0] : [0, -100, 0],
            x: particleBurst ? [-20, 20, -20] : [-10, 10, -10],
            opacity: particleBurst ? [0, 1, 0] : [0, 0.8, 0],
            scale: particleBurst ? [0.3, 1.5, 0.3] : [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particleBurst ? particle.duration * 0.7 : particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particle Trails */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`particle-trail-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central Energy Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: particleBurst ? [1, 2, 1] : [1, 1.2, 1],
          opacity: particleBurst ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: particleBurst ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/60 to-purple-400/80 backdrop-blur-sm" />
      </motion.div>

      {/* Particle Burst Effect */}
      {particleBurst && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-400/20 to-transparent"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};
