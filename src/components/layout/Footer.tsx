'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, Flame, Droplets, Wind, Mountain, Orbit } from 'lucide-react';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/25 backdrop-blur-md border-t border-white/40 mt-8 sm:mt-16"
    >
      <div className="max-w-7xl mx-auto mobile-padding py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Event Info */}
          <motion.div
            whileHover={{ y: -2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                {/* Ubuntu Logo */}
                <img 
                  src="/circle logo.png" 
                  alt="Ubuntu Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg"
                />
                <span className="bg-gradient-to-r from-fire-500 via-water-500 to-space-500 bg-clip-text text-transparent">
                  Ubuntu 2025
                </span>
              </div>
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-fire-400" />
                <span>12TH & 13TH DECEMBER 2025</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-space-400" />
                <span>PATKAR VARDE COLLEGE</span>
              </div>
              <div className="flex items-center gap-1 justify-center md:justify-start mt-3">
                <Flame className="w-3 h-3 text-fire-400" />
                <Droplets className="w-3 h-3 text-water-400" />
                <Wind className="w-3 h-3 text-air-400" />
                <Mountain className="w-3 h-3 text-earth-400" />
                <Orbit className="w-3 h-3 text-space-400" />
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            whileHover={{ y: -2 }}
            className="text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Element Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-fire-400">🔥</div>
                <div className="text-gray-600">Fire</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-water-400">💧</div>
                <div className="text-gray-600">Water</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-air-400">💨</div>
                <div className="text-gray-600">Air</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-earth-400">🌍</div>
                <div className="text-gray-600">Earth</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-lg sm:text-xl font-bold text-space-400">🌌</div>
                <div className="text-gray-600">Space</div>
              </div>
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            whileHover={{ y: -2 }}
            className="text-center md:text-right"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Developed by</h3>
            <div className="flex items-center gap-3 justify-center md:justify-end text-sm sm:text-base">
              <motion.div
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))",
                    "drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))",
                    "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-xl sm:text-2xl"
                style={{
                  textShadow: "0 0 8px rgba(59, 130, 246, 0.6)"
                }}
              >
                💻
              </motion.div>
              <motion.a
                href="https://www.linkedin.com/in/ajayprajapatii/"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  scale: [1, 1.15, 1],
                  textShadow: [
                    "0 0 8px rgba(192, 192, 192, 0.8)",
                    "0 0 20px rgba(255, 255, 255, 1)",
                    "0 0 8px rgba(192, 192, 192, 0.8)"
                  ]
                }}
                whileHover={{ 
                  scale: 1.2,
                  textShadow: "0 0 25px rgba(255, 255, 255, 1.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold text-lg sm:text-xl text-gray-700 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(192, 192, 192, 0.9))"
                }}
              >
                Ajay Prajapati
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/40 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-600"
        >
          <p>© 2025 Ubuntu College Festival. All rights reserved.</p>
          <p className="mt-1">Uniting the Five Elements of Innovation</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
