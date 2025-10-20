'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  animate?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width = 64, 
  height = 64, 
  className = '', 
  priority = false,
  animate = true 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    // Fallback when image fails to load
    return (
      <div 
        className={`bg-gradient-to-br from-ubuntu-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}
        style={{ width, height }}
      >
        U
      </div>
    );
  }

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      priority={priority}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {isLoading && (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
            style={{ width, height }}
          />
        )}
        {imageElement}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
          style={{ width, height }}
        />
      )}
      {imageElement}
    </div>
  );
};
