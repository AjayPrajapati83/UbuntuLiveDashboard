'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, Shield, Users, Sparkles, Zap, Star, Lock, Flame, Droplets, Wind, Mountain, Orbit } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedPanchtavyaBackground } from '@/components/ui/optimized-backgrounds';
import { PERFORMANCE_CONFIG, getAnimationProps } from '@/lib/performance';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { toast } from 'sonner';

export const EnhancedLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  // Removed expensive mouse tracking for better performance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = login(email, password);
    
    if (success) {
      toast.success('Welcome to Ubuntu 2025! 🎉', {
        description: 'Redirecting to your dashboard...',
      });
    } else {
      toast.error('Access Denied', {
        description: 'Please verify your credentials',
      });
    }
    setIsLoading(false);
  };


  // Removed floating elements for better performance

  return (
    <div className="min-h-screen relative overflow-hidden panchtavya-bg">
      {/* Optimized Panchtavya Background */}
      <OptimizedPanchtavyaBackground />

      {/* Removed expensive mouse follower */}

      <div className="relative z-10 min-h-screen flex items-center justify-center mobile-padding py-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-lg mx-auto"
        >
          <Card className="glass-card-optimized border-space-200/50 shadow-2xl hover:shadow-space-500/25 transition-all duration-300 mx-4 sm:mx-0 overflow-hidden gpu-accelerated">
            <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-6 sm:px-8 pt-8 sm:pt-10">
              {/* Ubuntu Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative mx-auto"
              >
                {/* Main Logo Container */}
                <div className="relative">
                  {/* Simplified glow behind logo */}
                  <div className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-white/30 via-white/15 to-white/5 blur-lg animate-pulse-slow" />
                  
                  {/* Ubuntu Logo */}
                  <OptimizedImage
                    src="/circle logo.png"
                    alt="Ubuntu 2025 Logo"
                    width={120}
                    height={120}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover z-10 relative"
                    priority={true}
                  />
                  
                  {/* Simplified shine effect */}
                  <div className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full animate-spin" style={{animationDuration: '8s'}} />
                  
                  {/* Static border */}
                  <div className="absolute -inset-6 border border-dashed border-white/10 rounded-full" />
                  
                  {/* Five Elements Orbiting Animation */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* Fire Element Orbit */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-fire-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-fire-400/30">
                          <Flame className="w-5 h-5 text-fire-600" />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Water Element Orbit */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 4 }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-water-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-water-400/30">
                          <Droplets className="w-5 h-5 text-water-600" />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Air Element Orbit */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 8 }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-air-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-air-400/30">
                          <Wind className="w-5 h-5 text-air-600" />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Earth Element Orbit */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 12 }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-earth-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-earth-400/30">
                          <Mountain className="w-5 h-5 text-earth-600" />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Space Element Orbit */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 16 }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-space-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-space-400/30">
                          <Orbit className="w-5 h-5 text-space-600" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    <span
                      className="inline-block bg-gradient-to-r from-space-400 via-fire-400 to-water-400 bg-clip-text text-transparent"
                      style={{ 
                        backgroundSize: '200%',
                        animation: 'panchtavya-flow 4s ease-in-out infinite',
                        willChange: 'background-position'
                      }}
                    >
                      UBUNTU 2025
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-800 font-medium text-sm sm:text-base md:text-lg animate-pulse-slow">
                    Official Live Dashboard
                  </CardDescription>
                </motion.div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8 px-6 sm:px-8 pb-8 sm:pb-10">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative group"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="glass-card-optimized border-gray-400 text-gray-800 placeholder:text-gray-600 focus:border-space-400 focus:ring-2 focus:ring-space-400/50 transition-all duration-200 h-10 sm:h-12 mobile-text gpu-accelerated"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="relative group"
                >
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass-card-optimized border-gray-400 text-gray-800 placeholder:text-gray-600 focus:border-space-400 focus:ring-2 focus:ring-space-400/50 transition-all duration-200 h-10 sm:h-12 pr-12 mobile-text gpu-accelerated"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ opacity: 0.6 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10 flex items-center justify-center w-8 h-8 hover:bg-gray-200/20 rounded-full"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-14 mobile-text font-semibold space-gradient hover:from-space-600 hover:to-water-600 border-0 shadow-2xl hover:shadow-space-500/25 transition-all duration-200 relative overflow-hidden group gpu-accelerated"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-gray-700 flex-wrap">
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-fire-500" />
                  <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-water-500" />
                  <Wind className="w-3 h-3 sm:w-4 sm:h-4 text-air-500" />
                  <Mountain className="w-3 h-3 sm:w-4 sm:h-4 text-earth-500" />
                  <Orbit className="w-3 h-3 sm:w-4 sm:h-4 text-space-500" />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">Powered by Ubuntu 2025</span>
                </div>

                {/* Developer Credit */}
                <div className="text-center mt-4 pt-3 border-t border-gray-300/40 animate-fade-in">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <div className="text-sm sm:text-base animate-pulse-slow">💻</div>
                    <span className="text-gray-600">Developed by</span>
                    <a
                      href="https://www.linkedin.com/in/ajayprajapatii/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-800 hover:text-space-600 transition-colors duration-200 cursor-pointer hover:scale-105 gpu-accelerated"
                    >
                      Ajay Prajapati
                    </a>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
