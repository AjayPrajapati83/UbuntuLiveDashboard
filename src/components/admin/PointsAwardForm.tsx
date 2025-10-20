'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { events, calculateEventPoints } from '@/data/events';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const PointsAwardForm = () => {
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedCollegeId, setSelectedCollegeId] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<'participant' | '1st' | '2nd' | '3rd' | 'custom'>('participant');
  const [customPoints, setCustomPoints] = useState(0);
  const [participantCount, setParticipantCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { colleges, awardPoints, fetchColleges } = useSupabaseCollegeStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const selectedCollege = colleges.find(c => c.id === selectedCollegeId);
  
  const pointsToAward = selectedPosition === 'custom' ? customPoints :
    selectedEventId ? 
      (selectedPosition === 'participant' ? 
        calculateEventPoints(selectedEventId, selectedPosition) * participantCount : 
        calculateEventPoints(selectedEventId, selectedPosition)) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For custom points, only college selection is required
    if (selectedPosition === 'custom') {
      if (!selectedCollegeId || customPoints <= 0) {
        toast.error('Please select a college and enter valid custom points');
        return;
      }
    } else {
      if (!selectedEventId || !selectedCollegeId) {
        toast.error('Please select both event and college');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const success = await awardPoints(
        selectedCollegeId,
        selectedPosition === 'custom' ? `custom_${Date.now()}` : selectedEventId,
        selectedPosition === 'custom' ? 'Custom Points Award' : (selectedEvent?.themedEventName || 'Unknown Event'),
        selectedPosition === 'custom' ? 'participant' : selectedPosition,
        pointsToAward
      );

      if (success) {
        // Reset form
        setSelectedEventId('');
        setSelectedCollegeId('');
        setSelectedPosition('participant');
        setParticipantCount(1);
        setCustomPoints(0);
      }
    } catch (error) {
      toast.error('Failed to award points', {
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const positions = [
    { value: 'participant', label: 'Participant', icon: Users, color: 'from-blue-500 to-blue-600' },
    { value: '1st', label: '1st Place', icon: Trophy, color: 'from-yellow-400 to-yellow-600' },
    { value: '2nd', label: '2nd Place', icon: Award, color: 'from-gray-400 to-gray-600' },
    { value: '3rd', label: '3rd Place', icon: Award, color: 'from-orange-400 to-orange-600' },
    { value: 'custom', label: 'Custom', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-2xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-ubuntu-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-ubuntu-500 to-orange-500 bg-clip-text text-transparent">
              Award Points
            </span>
          </CardTitle>
          <p className="text-gray-600">Select event, college, and position to award points</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <label className="block text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 inline mr-2" />
                Select Event {selectedPosition === 'custom' && <span className="text-gray-500">(Optional for custom points)</span>}
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-ubuntu-500 focus:border-transparent transition-all duration-300"
                required={selectedPosition !== 'custom'}
              >
                <option value="">Choose an event...</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.themedEventName} ({event.eventType} - Day {event.day})
                  </option>
                ))}
              </select>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-ubuntu-50 rounded-lg border border-ubuntu-200"
                >
                  <div className="text-sm text-ubuntu-700">
                    <strong>{selectedEvent.themedEventName}</strong>
                    <div className="mt-1 text-xs">
                      Category: {selectedEvent.category} • Type: {selectedEvent.eventType}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* College Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <label className="block text-sm font-semibold text-gray-700">
                <Users className="w-4 h-4 inline mr-2" />
                Select College
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-ubuntu-500 focus:border-transparent transition-all duration-300"
                required
              >
                <option value="">Choose a college...</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name} ({college.total_points} points)
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Position Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <label className="block text-sm font-semibold text-gray-700">
                <Trophy className="w-4 h-4 inline mr-2" />
                Position/Achievement
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {positions.map((position, index) => {
                  const Icon = position.icon;
                  const isSelected = selectedPosition === position.value;
                  return (
                    <motion.button
                      key={position.value}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPosition(position.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${position.color} text-white border-transparent shadow-lg`
                          : 'bg-white/20 backdrop-blur-md border-white/20 hover:border-white/40 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{position.label}</span>
                      </div>
                      {selectedEventId && position.value !== 'custom' && (
                        <div className="text-sm mt-1 opacity-90">
                          +{calculateEventPoints(selectedEventId, position.value)} pts
                        </div>
                      )}
                      {position.value === 'custom' && (
                        <div className="text-sm mt-1 opacity-90">
                          Custom Points
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Custom Points Input - Only show when custom is selected */}
            {selectedPosition === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <label className="block text-sm font-semibold text-gray-700">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Custom Points
                </label>
                <Input
                  type="number"
                  min="1"
                  value={customPoints || ''}
                  onChange={(e) => setCustomPoints(parseInt(e.target.value) || 0)}
                  placeholder="Enter custom points to award..."
                  className="bg-white/20 backdrop-blur-md border border-white/20 focus:border-purple-500"
                  required
                />
                <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 text-purple-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Custom Points Info</span>
                  </div>
                  <p className="mt-1 text-purple-600">
                    Award custom points for special achievements, bonus activities, or administrative adjustments.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Participant Count Selection - Only show when participant is selected */}
            {selectedPosition === 'participant' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <label className="block text-sm font-semibold text-gray-700">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Participants
                </label>
                <select
                  value={participantCount}
                  onChange={(e) => setParticipantCount(Number(e.target.value))}
                  className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-ubuntu-500 focus:border-transparent transition-all duration-300"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((count) => (
                    <option key={count} value={count}>
                      {count} participant{count > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Participant Count Info</span>
                  </div>
                  <p className="mt-1 text-blue-600">
                    Each participant will receive{' '}
                    <strong>{selectedEventId ? calculateEventPoints(selectedEventId, 'participant') : 0} points</strong>.
                    Total: <strong>{selectedEventId ? calculateEventPoints(selectedEventId, 'participant') * participantCount : 0} points</strong>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Points Preview */}
            {((selectedEventId && selectedCollegeId) || (selectedPosition === 'custom' && selectedCollegeId && customPoints > 0)) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Points Preview</span>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <strong>{selectedCollege?.name}</strong> will receive{' '}
                  <strong className="text-green-700">{pointsToAward} points</strong> for{' '}
                  {selectedPosition === 'custom' ? (
                    <strong>custom achievement</strong>
                  ) : selectedPosition === 'participant' ? (
                    <>
                      <strong>{participantCount} participant{participantCount > 1 ? 's' : ''} participating in</strong>
                    </>
                  ) : (
                    <strong>achieving {selectedPosition} place in</strong>
                  )}
                  {selectedPosition !== 'custom' && selectedEvent && (
                    <> <strong>{selectedEvent.themedEventName}</strong></>
                  )}
                  {selectedPosition === 'participant' && participantCount > 1 && selectedEventId && (
                    <div className="mt-1 text-xs text-green-500">
                      ({calculateEventPoints(selectedEventId, 'participant')} points × {participantCount} participants)
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="submit"
                variant="ubuntu"
                className="w-full h-12 text-lg font-semibold"
                disabled={
                  isSubmitting || 
                  !selectedCollegeId || 
                  (selectedPosition === 'custom' ? customPoints <= 0 : !selectedEventId)
                }
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Award className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Awarding Points...' : 'Award Points'}
              </Button>
            </motion.div>
          </form>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-sm text-gray-500 border-t border-white/20 pt-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Points are awarded instantly and update the leaderboard</span>
            </div>
            <p>Make sure to select the correct event and college before awarding points</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
