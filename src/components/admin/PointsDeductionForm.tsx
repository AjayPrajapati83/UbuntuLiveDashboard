'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, Users, MinusCircle } from 'lucide-react';
import { PERFORMANCE_CONFIG } from '@/lib/performance';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const PointsDeductionForm = () => {
  const [selectedCollegeId, setSelectedCollegeId] = useState('');
  const [pointsToDeduct, setPointsToDeduct] = useState(0);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { colleges, fetchColleges, awardPoints } = useSupabaseCollegeStore();

  // Fetch colleges on component mount
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const selectedCollege = colleges.find(c => c.id === selectedCollegeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCollegeId || pointsToDeduct <= 0) {
      toast.error('Please select a college and enter valid points to deduct');
      return;
    }

    if (!reason.trim()) {
      toast.error('Please provide a reason for the deduction');
      return;
    }

    if (selectedCollege && pointsToDeduct > selectedCollege.total_points) {
      toast.error('Cannot deduct more points than the college currently has');
      return;
    }

    setIsSubmitting(true);

    try {
      // Award negative points for deduction with reason in event name
      const success = await awardPoints(
        selectedCollegeId,
        `deduction_${Date.now()}`, // Unique event ID for deduction
        `Points Deduction: ${reason}`,
        'participant',
        -pointsToDeduct // Negative points for deduction
      );

      if (success) {
        // Reset form
        setSelectedCollegeId('');
        setPointsToDeduct(0);
        setReason('');
        
        toast.success(`${pointsToDeduct} points deducted successfully!`);
      }
    } catch (error) {
      toast.error('Failed to deduct points', {
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4"
          >
            <TrendingDown className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Points Deduction
            </span>
          </CardTitle>
          <p className="text-gray-600">Deduct points from colleges</p>
        </CardHeader>
      </Card>

      {/* Deduction Form */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="w-5 h-5 text-red-500" />
            Deduct Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* College Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 text-red-500" />
                Select College
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                required
              >
                <option value="">Choose a college...</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name} ({college.total_points} points)
                  </option>
                ))}
              </select>
              {selectedCollege && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div className="text-sm text-red-700">
                    <strong>{selectedCollege.name}</strong>
                    <div className="mt-1 text-xs">
                      Current Points: {selectedCollege.total_points}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Points to Deduct */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MinusCircle className="w-4 h-4 text-red-500" />
                Points to Deduct
              </label>
              <Input
                type="number"
                min="1"
                max={selectedCollege?.total_points || 1000}
                value={pointsToDeduct || ''}
                onChange={(e) => setPointsToDeduct(parseInt(e.target.value) || 0)}
                placeholder="Enter points to deduct..."
                className="bg-white/20 backdrop-blur-md border border-white/20 focus:border-red-500"
                required
              />
            </motion.div>

            {/* Reason for Deduction */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Reason for Deduction
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for deduction (e.g., Rule violation, Disqualification, etc.)..."
                className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 min-h-[80px] resize-none"
                required
              />
              <p className="text-xs text-gray-500">This reason will be recorded in the history for transparency</p>
            </motion.div>

            {/* Deduction Preview */}
            {selectedCollege && pointsToDeduct > 0 && reason.trim() && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg border border-orange-200"
              >
                <div className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Deduction Preview</span>
                </div>
                <p className="mt-1 text-orange-600">
                  <strong>{selectedCollege.name}</strong> will have{' '}
                  <strong className="text-red-700">{pointsToDeduct} points deducted</strong>.
                  <br />
                  Reason: <strong>{reason}</strong>
                  <br />
                  New total: <strong>{selectedCollege.total_points - pointsToDeduct} points</strong>
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting || !selectedCollegeId || pointsToDeduct <= 0 || !reason.trim()}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Deducting Points...' : 'Deduct Points'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {/* Warning Notice */}
      <Card className="bg-red-50/50 backdrop-blur-md border border-red-200 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">
              <p className="font-medium mb-1">Important Notice:</p>
              <ul className="space-y-1 text-xs">
                <li>• Points deduction is permanent and will be reflected in real-time</li>
                <li>• All deductions are logged and will appear in recent activity</li>
                <li>• Cannot deduct more points than a college currently has</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
