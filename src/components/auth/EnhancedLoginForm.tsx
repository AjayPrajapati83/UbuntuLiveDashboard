'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, Shield, Users, Sparkles, Zap, Star, Lock, Flame, Droplets, Wind, Mountain, Orbit } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PanchtavyaBackground } from '@/components/ui/animated-backgrounds';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { toast } from 'sonner';

export const EnhancedLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useAuthStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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


  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden panchtavya-bg">
      {/* Panchtavya Animated Background */}
      <PanchtavyaBackground />

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-white/10 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center mobile-padding py-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-lg mx-auto"
        >
          <Card className="bg-black/40 backdrop-blur-md border-space-200/50 shadow-2xl hover:shadow-space-500/25 transition-all duration-500 mx-4 sm:mx-0 overflow-hidden">
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
                  {/* Enhanced circular glow behind logo */}
                  <motion.div
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-white/40 via-white/25 to-white/10 blur-lg"
                  />
                  
                  {/* Additional outer glow */}
                  <motion.div
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1.2, 1.4, 1.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -inset-2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-xl"
                  />
                  
                  {/* Ubuntu Logo */}
                  <OptimizedImage
                    src="/circle logo.png"
                    alt="Ubuntu 2025 Logo"
                    width={120}
                    height={120}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover z-10 relative"
                    priority={true}
                  />
                  
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Rotating border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-6 border border-dashed border-white/15 rounded-full"
                  />
                  
                  {/* Orbiting elements around logo */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* Fire element */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: 'center' }}
                    >
                      <Flame className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 text-fire-400" />
                    </motion.div>
                    
                    {/* Water element */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: 'center' }}
                    >
                      <Droplets className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 text-water-400" />
                    </motion.div>
                    
                    {/* Air element */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 6 }}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: 'center' }}
                    >
                      <Wind className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 text-air-400" />
                    </motion.div>
                    
                    {/* Earth element */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 9 }}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: 'center' }}
                    >
                      <Mountain className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 text-earth-400" />
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
                    <motion.span
                      animate={{ 
                        backgroundPosition: ['0%', '100%', '0%'] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="inline-block bg-gradient-to-r from-space-400 via-fire-400 to-water-400 bg-clip-text text-transparent"
                      style={{ backgroundSize: '200%' }}
                    >
                      UBUNTU 2025
                    </motion.span>
                  </CardTitle>
                  <CardDescription className="text-white/80 text-sm sm:text-base md:text-lg">
                    <motion.span
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Official Live Dashboard
                    </motion.span>
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
                    className="bg-black/30 border-white/40 text-white placeholder:text-white/70 focus:border-space-400 focus:bg-black/40 focus:ring-2 focus:ring-space-400/50 transition-all duration-300 h-10 sm:h-12 mobile-text"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-space-400 to-water-400"
                    initial={{ width: 0 }}
                    whileFocus={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
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
                    className="bg-black/30 border-white/40 text-white placeholder:text-white/70 focus:border-space-400 focus:bg-black/40 focus:ring-2 focus:ring-space-400/50 transition-all duration-300 h-10 sm:h-12 pr-12 mobile-text"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ opacity: 0.6 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-all duration-200 z-10 flex items-center justify-center w-8 h-8 hover:bg-white/10 rounded-full"
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
                    className="w-full h-12 sm:h-14 mobile-text font-semibold space-gradient hover:from-space-600 hover:to-water-600 border-0 shadow-2xl hover:shadow-space-500/25 transition-all duration-300 relative overflow-hidden group"
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Authenticating...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="login"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <Zap className="w-6 h-6" />
                          <span>Sign In</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </Button>
                </motion.div>
              </form>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-white/60 flex-wrap">
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-fire-400" />
                  <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-water-400" />
                  <Wind className="w-3 h-3 sm:w-4 sm:h-4 text-air-400" />
                  <Mountain className="w-3 h-3 sm:w-4 sm:h-4 text-earth-400" />
                  <Orbit className="w-3 h-3 sm:w-4 sm:h-4 text-space-400" />
                </div>
                <div className="text-center">
                  <span className="text-xs sm:text-sm text-white/60">Powered by Ubuntu 2025</span>
                </div>

                {/* Developer Credit */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-center mt-4 pt-3 border-t border-white/20"
                >
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <motion.div
                      animate={{ 
                        filter: [
                          "drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))",
                          "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
                          "drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="text-sm sm:text-base"
                      style={{
                        textShadow: "0 0 4px rgba(59, 130, 246, 0.6)"
                      }}
                    >
                      💻
                    </motion.div>
                    <span className="text-white/50">Developed by</span>
                    <motion.a
                      href="https://www.linkedin.com/in/ajayprajapatii/"
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{
                        scale: [1, 1.1, 1],
                        textShadow: [
                          "0 0 4px rgba(192, 192, 192, 0.6)",
                          "0 0 12px rgba(255, 255, 255, 0.8)",
                          "0 0 4px rgba(192, 192, 192, 0.6)"
                        ]
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        textShadow: "0 0 15px rgba(255, 255, 255, 1)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="font-semibold text-white/80 hover:text-white transition-colors duration-300 cursor-pointer"
                      style={{
                        filter: "drop-shadow(0 0 4px rgba(192, 192, 192, 0.7))"
                      }}
                    >
                      Ajay Prajapati
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
