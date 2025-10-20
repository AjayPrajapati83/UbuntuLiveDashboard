'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, Search, Sparkles, Users, Trophy, Star, Flame, Droplets, Wind, Mountain, Orbit } from 'lucide-react';
import { events } from '@/data/events';
import { Event } from '@/types';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters } from '@/components/events/EventFilters';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { PanchtavyaBackground } from '@/components/ui/animated-backgrounds';

export const UserDashboard = () => {
  const [selectedType, setSelectedType] = useState<Event['eventType'] | 'All'>('All');
  const [selectedDay, setSelectedDay] = useState<number | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter events based on selected criteria
  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'All' || event.eventType === selectedType;
    const matchesDay = selectedDay === 'All' || event.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      event.themedEventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesDay && matchesCategory && matchesSearch;
  });

  const eventStats = {
    flagship: events.filter(e => e.eventType === 'Flagship').length,
    large: events.filter(e => e.eventType === 'Large').length,
    small: events.filter(e => e.eventType === 'Small').length,
    day1: events.filter(e => e.day === 1).length,
    day2: events.filter(e => e.day === 2).length,
  };

  return (
    <div className="relative max-w-7xl mx-auto mobile-padding py-4 sm:py-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/40 hover:shadow-2xl hover:shadow-space-500/20 shadow-xl transition-all duration-500 relative overflow-hidden"
      >
        {/* Panchtavya Elements Indicator */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-gradient-to-r from-fire-200/10 via-water-300/15 to-space-200/10 opacity-60"
          style={{ backgroundSize: '500% 500%' }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <OptimizedImage
                src="/circle logo.png"
                alt="Ubuntu 2025 Logo"
                width={80}
                height={80}
                className="rounded-full shadow-2xl"
                priority={true}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
              >
                <Star className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mobile-heading font-bold mb-3"
              >
                <motion.span
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="inline-block bg-gradient-to-r from-fire-500 via-water-500 to-space-500 bg-clip-text text-transparent font-extrabold"
                  style={{ backgroundSize: '200%' }}
                >
                  Welcome to Ubuntu
                </motion.span>{' '}
                <motion.span
                  animate={{ 
                    backgroundPosition: ['100%', '0%', '100%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="inline-block bg-gradient-to-r from-earth-500 via-air-500 to-space-600 bg-clip-text text-transparent font-extrabold"
                  style={{ backgroundSize: '200%' }}
                >
                  2025
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mobile-text font-medium text-gray-800"
              >
                <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  <Flame className="w-4 h-4 text-fire-400" />
                  <span className="inline-block text-gray-800">Ubuntu Fest Live Dashboard</span>
                  <Orbit className="w-4 h-4 text-space-400" />
                </div>
                <span className="block mt-1 text-sm sm:text-base text-gray-700">Discover Elemental Events & Track Live Rankings</span>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Event Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {[
              { label: 'Fire Events', value: eventStats.flagship, color: 'from-fire-500 to-fire-600', icon: Flame, element: 'fire' },
              { label: 'Water Events', value: eventStats.large, color: 'from-water-500 to-water-600', icon: Droplets, element: 'water' },
              { label: 'Air Events', value: eventStats.small, color: 'from-air-500 to-air-600', icon: Wind, element: 'air' },
              { label: 'Earth Events', value: eventStats.day1, color: 'from-earth-500 to-earth-600', icon: Mountain, element: 'earth' },
              { label: 'Space Events', value: eventStats.day2, color: 'from-space-500 to-space-600', icon: Orbit, element: 'space' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className={`text-center p-3 sm:p-4 bg-white/25 backdrop-blur-md rounded-xl border border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <motion.div
                    key={stat.value}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-xl sm:text-2xl font-bold text-gray-800 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-tight font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>


      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Events Section */}
        <div className="xl:col-span-3">
          {/* Enhanced Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-space-400 transition-colors" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events, categories, or themes..."
                className="pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/25 backdrop-blur-md border border-white/40 focus:border-space-400 transition-all duration-300 hover:shadow-lg text-gray-800 placeholder:text-gray-500 text-sm sm:text-base shadow-md"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "ubuntu" : "outline"}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden group text-sm sm:text-base ${
                showFilters ? 'shadow-xl scale-105 space-gradient' : 'bg-white/25 backdrop-blur-md border border-white/40 hover:border-white/60 text-gray-800 shadow-md'
              }`}
            >
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span>Filters</span>
            </Button>
          </motion.div>

          {/* Animated Filters */}
          <AnimatePresence>
            {showFilters && (
              <EventFilters
                selectedType={selectedType}
                selectedDay={selectedDay}
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
                onTypeChange={setSelectedType}
                onDayChange={setSelectedDay}
                onCategoryChange={setSelectedCategory}
                onSearchChange={setSearchTerm}
                onClose={() => setShowFilters(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Leaderboard */}
          <div className="xl:hidden mb-8">
            <Leaderboard />
          </div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-xl sm:text-2xl font-semibold text-gray-800"
              >
                Events {filteredEvents.length !== events.length && `(${filteredEvents.length} of ${events.length})`}
              </motion.h2>
              {filteredEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Showing {filteredEvents.length} events</span>
                </motion.div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {filteredEvents.length === 0 ? (
                <motion.div
                  key="no-events"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/25 backdrop-blur-md rounded-xl p-8 sm:p-12 text-center border border-white/40 shadow-xl">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    >
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">No events found</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters or search terms</p>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="events-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Leaderboard Sidebar */}
        <div className="xl:col-span-1 hidden xl:block">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};
