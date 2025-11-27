'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users, Star } from 'lucide-react';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Leaderboard = () => {
  const { getLeaderboard, fetchColleges, subscribeToChanges, unsubscribeFromChanges } = useSupabaseCollegeStore();
  const colleges = getLeaderboard();

  // Fetch colleges and subscribe to changes on mount
  useEffect(() => {
    fetchColleges();
    subscribeToChanges();
    
    return () => {
      unsubscribeFromChanges();
    };
  }, [fetchColleges, subscribeToChanges, unsubscribeFromChanges]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <Star className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const getCardBorderColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-300 shadow-yellow-100';
      case 2:
        return 'border-gray-300 shadow-gray-100';
      case 3:
        return 'border-orange-300 shadow-orange-100';
      default:
        return 'border-white/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/25 backdrop-blur-md border border-white/40 shadow-xl sticky top-24">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <TrendingUp className="w-6 h-6 text-ubuntu-500" />
            </motion.div>
            <span className="bg-gradient-to-r from-ubuntu-500 to-orange-500 bg-clip-text text-transparent">
              Live Rankings
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{colleges.length} Colleges Participating</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {colleges.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No rankings yet</p>
                <p className="text-gray-400 text-sm mt-1">Points will appear here when awarded</p>
              </motion.div>
            ) : (
              colleges.map((college, index) => {
                const rank = index + 1;
                return (
                  <motion.div
                    key={college.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className={`bg-white/25 backdrop-blur-md rounded-lg p-4 border ${getCardBorderColor(rank)} hover:shadow-lg shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankBadgeColor(rank)} flex items-center justify-center shadow-lg relative overflow-hidden`}
                      >
                        {rank <= 3 && (
                          <motion.div
                            animate={{ 
                              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30"
                            style={{ backgroundSize: '200% 200%' }}
                          />
                        )}
                        <div className="relative z-10">
                          {getRankIcon(rank)}
                        </div>
                      </motion.div>

                      {/* College Info */}
                      <div className="flex-1 min-w-0">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + 0.3 }}
                        >
                          <h3 className="font-semibold text-gray-800 truncate">
                            {college.name}
                          </h3>
                        </motion.div>
                      </div>

                      {/* Points */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.4 }}
                        className="text-right"
                      >
                        <motion.div
                          key={college.total_points}
                          initial={{ scale: 1.2, color: '#10b981' }}
                          animate={{ scale: 1, color: '#374151' }}
                          transition={{ duration: 0.3 }}
                          className="text-lg font-bold text-gray-700"
                        >
                          {college.total_points.toLocaleString()}
                        </motion.div>
                        <div className="text-xs text-gray-500">points</div>
                      </motion.div>
                    </div>

                    {/* Progress Bar for Top 3 */}
                    {rank <= 3 && colleges[0]?.total_points > 0 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                        className="mt-3"
                      >
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(college.total_points / colleges[0].total_points) * 100}%` 
                            }}
                            transition={{ delay: index * 0.05 + 0.7, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${getRankBadgeColor(rank)} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          {/* Footer Stats */}
          {colleges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 mt-4 border-t border-white/20"
            >
              <div className="text-center text-sm text-gray-600">
                <div className="font-medium">
                  Total Points: {colleges.reduce((sum, college) => sum + college.total_points, 0).toLocaleString()}
                </div>
                <div className="text-xs mt-1">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
