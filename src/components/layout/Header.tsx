'use client';

import { motion } from 'framer-motion';
import { LogOut, User, Shield, Flame, Droplets, Wind, Mountain, Orbit, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { toast } from 'sonner';
import { useState } from 'react';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully', {
      description: 'See you at Ubuntu 2025!',
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/25 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 safe-area-top mobile-header-sticky ios-safe-area"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="max-w-7xl mx-auto mobile-padding">
        <div className="flex items-center justify-between h-16 sm:h-16 min-h-[4rem]">
          {/* Logo and Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <OptimizedImage
              src="/circle logo.png"
              alt="Ubuntu 2025 Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-lg sm:w-12 sm:h-12 md:w-14 md:h-14"
              priority={true}
            />
            <div className="block">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold">
                <span className="bg-gradient-to-r from-fire-500 via-water-500 to-space-500 bg-clip-text text-transparent">
                  Ubuntu
                </span>{' '}
                <span className="bg-gradient-to-r from-earth-500 via-air-500 to-space-600 bg-clip-text text-transparent">
                  2025
                </span>
              </h1>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fire-400" />
                <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-water-400" />
                <Wind className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-air-400" />
                <Mountain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-earth-400" />
                <Orbit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-space-400" />
              </div>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 text-gray-800 hover:bg-white/30 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop User Info and Actions */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-white/25 backdrop-blur-md rounded-lg border border-white/40"
            >
              <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
                user?.role === 'admin' ? 'bg-fire-100 text-fire-600' : 'bg-water-100 text-water-600'
              }`}>
                {user?.role === 'admin' ? <Shield className="w-3 h-3 lg:w-4 lg:h-4" /> : <User className="w-3 h-3 lg:w-4 lg:h-4" />}
              </div>
              <div className="text-xs lg:text-sm">
                <div className="font-medium text-gray-800">
                  {user?.role === 'admin' ? 'Admin' : 'Student'}
                </div>
                <div className="text-gray-600 truncate max-w-[100px] lg:max-w-[150px]">
                  {user?.email}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-white/25 backdrop-blur-md border border-white/40 hover:border-white/60 hover:bg-white/30 transition-all duration-200 text-gray-800 text-xs lg:text-sm"
              >
                <LogOut className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">Logout</span>
                <span className="lg:hidden">Exit</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-white/40 py-4"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile User Info */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/25 backdrop-blur-md rounded-lg border border-white/40">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  user?.role === 'admin' ? 'bg-fire-100 text-fire-600' : 'bg-water-100 text-water-600'
                }`}>
                  {user?.role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">
                    {user?.role === 'admin' ? 'Administrator' : 'Student'}
                  </div>
                  <div className="text-gray-600 text-xs truncate">
                    {user?.email}
                  </div>
                </div>
              </div>

              {/* Mobile Panchtavya Elements */}
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-fire-400" />
                  <span className="text-xs text-gray-600">Fire</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-water-400" />
                  <span className="text-xs text-gray-600">Water</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-air-400" />
                  <span className="text-xs text-gray-600">Air</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mountain className="w-4 h-4 text-earth-400" />
                  <span className="text-xs text-gray-600">Earth</span>
                </div>
                <div className="flex items-center gap-1">
                  <Orbit className="w-4 h-4 text-space-400" />
                  <span className="text-xs text-gray-600">Space</span>
                </div>
              </div>

              {/* Mobile Logout */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/25 backdrop-blur-md border border-white/40 hover:border-white/60 hover:bg-white/30 transition-all duration-200 text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout from Ubuntu
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
