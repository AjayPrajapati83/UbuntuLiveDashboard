'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, TrendingUp, TrendingDown, Calendar, Filter, Search, Award, AlertCircle } from 'lucide-react';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const HistoryTab = () => {
  const { colleges, participations, fetchColleges } = useSupabaseCollegeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'addition' | 'deduction'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Get all history with college names
  const history = participations
    .map(participation => {
      const college = colleges.find(c => c.id === participation.college_id);
      return {
        ...participation,
        collegeName: college?.name || 'Unknown College',
        isDeduction: participation.points < 0
      };
    })
    .filter(item => {
      // Filter by type
      if (filterType === 'addition' && item.isDeduction) return false;
      if (filterType === 'deduction' && !item.isDeduction) return false;
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.collegeName.toLowerCase().includes(searchLower) ||
          item.event_name.toLowerCase().includes(searchLower) ||
          item.position.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const stats = {
    total: participations.length,
    additions: participations.filter(p => p.points > 0).length,
    deductions: participations.filter(p => p.points < 0).length,
    totalPointsAdded: participations.filter(p => p.points > 0).reduce((sum, p) => sum + p.points, 0),
    totalPointsDeducted: Math.abs(participations.filter(p => p.points < 0).reduce((sum, p) => sum + p.points, 0))
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass-card-optimized border border-white/40 shadow-xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg mb-4"
          >
            <History className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Points History
            </span>
          </CardTitle>
          <p className="text-gray-600">Complete record of all point additions and deductions</p>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Transactions', value: stats.total, color: 'from-purple-500 to-indigo-500', icon: History },
          { label: 'Points Added', value: stats.additions, color: 'from-green-500 to-emerald-500', icon: TrendingUp },
          { label: 'Points Deducted', value: stats.deductions, color: 'from-red-500 to-orange-500', icon: TrendingDown },
          { label: 'Total Added', value: stats.totalPointsAdded.toLocaleString(), color: 'from-blue-500 to-cyan-500', icon: Award },
          { label: 'Total Deducted', value: stats.totalPointsDeducted.toLocaleString(), color: 'from-orange-500 to-red-500', icon: AlertCircle },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="glass-card-optimized border border-white/40 hover:border-white/60 transition-all duration-200 hover:shadow-xl shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <motion.p
                        key={`stat-${stat.label}-${stat.value}`}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-xl font-bold text-gray-800"
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="glass-card-optimized border border-white/40 shadow-xl">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by college, event, or position..."
                className="pl-10 bg-white/20 backdrop-blur-md border border-white/20"
              />
            </div>

            {/* Filter Type */}
            <div className="flex gap-2">
              <Button
                onClick={() => setFilterType('all')}
                variant={filterType === 'all' ? 'ubuntu' : 'outline'}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                All
              </Button>
              <Button
                onClick={() => setFilterType('addition')}
                variant={filterType === 'addition' ? 'ubuntu' : 'outline'}
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Additions
              </Button>
              <Button
                onClick={() => setFilterType('deduction')}
                variant={filterType === 'deduction' ? 'ubuntu' : 'outline'}
                className="flex items-center gap-2"
              >
                <TrendingDown className="w-4 h-4" />
                Deductions
              </Button>
            </div>

            {/* Sort Order */}
            <Button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <Card className="glass-card-optimized border border-white/40 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5 text-purple-500" />
            Transaction History ({history.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
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
                <History className="w-10 h-10 text-gray-400" />
              </motion.div>
              <p className="text-gray-500 font-medium">No history found</p>
              <p className="text-gray-400 text-sm">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Points awarded or deducted will appear here'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              <AnimatePresence>
                {history.map((item, index) => (
                  <motion.div
                    key={`history-${index}-${item.college_id}-${item.event_id}-${item.timestamp}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 glass-card-optimized rounded-lg border transition-all duration-200 shadow-md ${
                      item.isDeduction 
                        ? 'border-red-200 hover:border-red-300 bg-red-50/20' 
                        : 'border-green-200 hover:border-green-300 bg-green-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.isDeduction 
                              ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                              : 'bg-gradient-to-br from-green-500 to-emerald-500'
                          }`}
                        >
                          {item.isDeduction ? (
                            <TrendingDown className="w-5 h-5 text-white" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-white" />
                          )}
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-800 truncate">{item.collegeName}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.isDeduction 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {item.isDeduction ? 'Deduction' : 'Addition'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Event:</strong> {item.event_name}
                          </p>
                          
                          {!item.isDeduction && (
                            <p className="text-sm text-gray-600">
                              <strong>Position:</strong>{' '}
                              {item.position === 'participant' ? 'Participated' : `${item.position} Place`}
                            </p>
                          )}
                          
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(item.timestamp).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <motion.p
                          key={`points-${index}-${item.points}`}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className={`text-2xl font-bold ${
                            item.isDeduction ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {item.isDeduction ? '' : '+'}{item.points}
                        </motion.p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
