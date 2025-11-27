'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Calendar, Users, Trophy, Award, TrendingDown, Shield, Zap } from 'lucide-react';
import { PERFORMANCE_CONFIG, getAnimationProps } from '@/lib/performance';
import { events } from '@/data/events';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { PointsAwardForm } from '@/components/admin/PointsAwardForm';
import { PointsDeductionForm } from '@/components/admin/PointsDeductionForm';
import { CollegeManagement } from '@/components/admin/CollegeManagement';
import { HistoryTab } from '@/components/admin/HistoryTab';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { EventCard } from '@/components/events/EventCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { colleges, fetchColleges, participations, subscribeToChanges, unsubscribeFromChanges } = useSupabaseCollegeStore();

  // Fetch data and subscribe to real-time changes on component mount
  useEffect(() => {
    fetchColleges();
    subscribeToChanges();
    
    // Cleanup: unsubscribe when component unmounts
    return () => {
      unsubscribeFromChanges();
    };
  }, [fetchColleges, subscribeToChanges, unsubscribeFromChanges]);

  const stats = {
    totalEvents: events.length,
    totalColleges: colleges.length,
    totalParticipations: participations.length,
    totalPointsAwarded: colleges.reduce((sum: number, college) => sum + college.total_points, 0),
    flagshipEvents: events.filter(e => e.eventType === 'Flagship').length,
    largeEvents: events.filter(e => e.eventType === 'Large').length,
    smallEvents: events.filter(e => e.eventType === 'Small').length,
  };

  // Get recent activity from participations
  const recentActivity = participations
    .map(participation => {
      const college = colleges.find(c => c.id === participation.college_id);
      return {
        ...participation,
        collegeName: college?.name || 'Unknown College'
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const tabsData = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'award-points', label: 'Award Points', icon: Award },
    { id: 'deduct-points', label: 'Deduct Points', icon: TrendingDown },
    { id: 'manage-colleges', label: 'Manage Colleges', icon: Users },
    { id: 'history', label: 'History', icon: Shield },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-optimized rounded-2xl p-8 mb-8 border border-white/40 hover:shadow-xl shadow-xl transition-all duration-300 relative overflow-hidden gpu-accelerated"
      >
        {/* Optimized Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-100/20 via-orange-100/20 to-yellow-100/20 opacity-40"
          style={{ 
            backgroundSize: '300% 300%',
            animation: 'panchtavya-flow 20s ease-in-out infinite',
            willChange: 'background-position'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative animate-float gpu-accelerated">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <img 
                  src="/circle logo.png" 
                  alt="Ubuntu Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse-slow">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-3"
              >
                <span
                  className="inline-block bg-gradient-to-r from-ubuntu-500 via-orange-500 to-red-500 bg-clip-text text-transparent font-extrabold"
                  style={{ 
                    backgroundSize: '200%',
                    animation: 'panchtavya-flow 4s ease-in-out infinite',
                    willChange: 'background-position'
                  }}
                >
                  Ubuntu 2025
                </span>{' '}
                <span
                  className="inline-block bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold"
                  style={{ 
                    backgroundSize: '200%',
                    animation: 'panchtavya-flow 4s ease-in-out infinite reverse',
                    willChange: 'background-position'
                  }}
                >
                  Admin
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg font-medium text-gray-800"
              >
                <span className="inline-block">🛡️ Administrative Control Center</span>
                <span className="block mt-1 text-base text-gray-700">Manage Events, Awards & Track Performance</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-card-optimized border border-white/40 p-2 shadow-lg gpu-accelerated">
            {tabsData.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <TabsTrigger
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-ubuntu-500/80 data-[state=active]:to-orange-500/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:backdrop-blur-md hover:scale-105 hover:bg-white/20"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                </motion.div>
              );
            })}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Events', value: stats.totalEvents, color: 'from-ubuntu-500 to-orange-500', icon: Calendar },
                    { label: 'Colleges', value: stats.totalColleges, color: 'from-cosmic-500 to-blue-500', icon: Users },
                    { label: 'Participations', value: stats.totalParticipations, color: 'from-purple-500 to-pink-500', icon: Trophy },
                    { label: 'Points Awarded', value: stats.totalPointsAwarded.toLocaleString(), color: 'from-green-500 to-emerald-500', icon: Award },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="glass-card-optimized border border-white/40 hover:border-white/60 transition-all duration-200 hover:shadow-xl shadow-md gpu-accelerated">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg animate-float gpu-accelerated`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <motion.p
                                  key={`stat-${stat.label}-${stat.value}`}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="text-2xl font-bold text-gray-800"
                                >
                                  {stat.value}
                                </motion.p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Event Distribution */}
                <Card className="glass-card-optimized border border-white/40 shadow-xl gpu-accelerated">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Event Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { type: 'Flagship', count: stats.flagshipEvents, points: '250', color: 'from-ubuntu-500 to-orange-500' },
                        { type: 'Large', count: stats.largeEvents, points: '150', color: 'from-cosmic-500 to-blue-500' },
                        { type: 'Small', count: stats.smallEvents, points: '50', color: 'from-purple-500 to-pink-500' },
                      ].map((event, index) => (
                        <motion.div
                          key={event.type}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className={`text-center p-6 rounded-xl bg-gradient-to-br ${event.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          <div className="text-4xl font-bold mb-2 animate-pulse-slow">
                            {event.count}
                          </div>
                          <div className="text-lg font-medium mb-1">{event.type} Events</div>
                          <div className="text-sm opacity-90">{event.points} participation points</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="glass-card-optimized border border-white/40 shadow-xl gpu-accelerated">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Award className="w-10 h-10 text-gray-400" />
                        </motion.div>
                        <p className="text-gray-500 font-medium">No activity yet</p>
                        <p className="text-gray-400 text-sm">Points awarded will appear here</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        <AnimatePresence>
                          {recentActivity.map((activity, index) => (
                            <motion.div
                              key={`activity-${index}-${activity.college_id}-${activity.event_id}-${activity.timestamp}-${activity.position}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center justify-between p-4 glass-card-optimized rounded-lg border border-white/40 hover:border-white/60 transition-all duration-200 shadow-md gpu-accelerated"
                            >
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                  className={`w-3 h-3 rounded-full ${
                                    activity.position === '1st' ? 'bg-yellow-500' :
                                    activity.position === '2nd' ? 'bg-gray-400' :
                                    activity.position === '3rd' ? 'bg-orange-500' :
                                    'bg-blue-500'
                                  }`}
                                />
                                <div>
                                  <p className="font-medium text-gray-800">{activity.collegeName}</p>
                                  <p className="text-sm text-gray-600">
                                    {activity.event_name} • {activity.position === 'participant' ? 'Participated' : `${activity.position} Place`}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <motion.p
                                  key={`points-${index}-${activity.points}`}
                                  initial={{ scale: 1.2, color: '#10b981' }}
                                  animate={{ scale: 1, color: '#374151' }}
                                  className="font-semibold text-gray-800"
                                >
                                  +{activity.points}
                                </motion.p>
                                <p className="text-xs text-gray-500">
                                  {new Date(activity.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="award-points">
              <motion.div
                key="award-points"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <PointsAwardForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="deduct-points">
              <motion.div
                key="deduct-points"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <PointsDeductionForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="manage-colleges">
              <motion.div
                key="manage-colleges"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <CollegeManagement />
              </motion.div>
            </TabsContent>

            <TabsContent value="history">
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HistoryTab />
              </motion.div>
            </TabsContent>

            <TabsContent value="events">
              <motion.div
                key="events"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-800">All Events ({events.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Leaderboard />
              </motion.div>
            </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
