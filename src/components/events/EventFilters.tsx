'use client';

import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Event } from '@/types';
import { getEventCategories } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventFiltersProps {
  selectedType: Event['eventType'] | 'All';
  selectedDay: number | 'All';
  selectedCategory: string | 'All';
  searchTerm: string;
  onTypeChange: (type: Event['eventType'] | 'All') => void;
  onDayChange: (day: number | 'All') => void;
  onCategoryChange: (category: string | 'All') => void;
  onSearchChange: (search: string) => void;
  onClose?: () => void;
}

export const EventFilters = ({
  selectedType,
  selectedDay,
  selectedCategory,
  searchTerm,
  onTypeChange,
  onDayChange,
  onCategoryChange,
  onSearchChange,
  onClose
}: EventFiltersProps) => {
  const eventTypes: (Event['eventType'] | 'All')[] = ['All', 'Flagship', 'Large', 'Small'];
  const days: (number | 'All')[] = ['All', 1, 2];
  const categories = ['All', ...getEventCategories()];

  const clearAllFilters = () => {
    onTypeChange('All');
    onDayChange('All');
    onCategoryChange('All');
    onSearchChange('');
  };

  const hasActiveFilters = selectedType !== 'All' || selectedDay !== 'All' || selectedCategory !== 'All' || searchTerm !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card border-white/30 mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5 text-ubuntu-500" />
              Filters
            </CardTitle>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </Button>
              )}
              {onClose && (
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Event Type Filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Event Type</h3>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  variant={selectedType === type ? "ubuntu" : "outline"}
                  size="sm"
                  className={`transition-all duration-200 ${
                    selectedType === type 
                      ? 'shadow-lg scale-105' 
                      : 'glass-card border-white/20 hover:border-ubuntu-300'
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Day Filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Day</h3>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <Button
                  key={day}
                  onClick={() => onDayChange(day)}
                  variant={selectedDay === day ? "cosmic" : "outline"}
                  size="sm"
                  className={`transition-all duration-200 ${
                    selectedDay === day 
                      ? 'shadow-lg scale-105' 
                      : 'glass-card border-white/20 hover:border-cosmic-300'
                  }`}
                >
                  {day === 'All' ? 'All Days' : `Day ${day}`}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' 
                      : 'glass-card border-white/20 hover:border-purple-300'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-3 bg-ubuntu-50 rounded-lg border border-ubuntu-200"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-ubuntu-700">Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedType !== 'All' && (
                    <span className="px-2 py-1 bg-ubuntu-100 text-ubuntu-700 rounded text-xs">
                      {selectedType}
                    </span>
                  )}
                  {selectedDay !== 'All' && (
                    <span className="px-2 py-1 bg-cosmic-100 text-cosmic-700 rounded text-xs">
                      Day {selectedDay}
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {selectedCategory}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      &quot;{searchTerm}&quot;
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
