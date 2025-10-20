'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, User, Trophy, Star, Clock } from 'lucide-react';
import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  event: Event;
  index?: number;
}

export const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const getEventTypeColor = (type: Event['eventType']) => {
    switch (type) {
      case 'Flagship':
        return 'from-ubuntu-500 to-orange-500';
      case 'Large':
        return 'from-cosmic-500 to-blue-500';
      case 'Small':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getEventTypeIcon = (type: Event['eventType']) => {
    switch (type) {
      case 'Flagship':
        return <Star className="w-4 h-4" />;
      case 'Large':
        return <Trophy className="w-4 h-4" />;
      case 'Small':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className="bg-white/25 backdrop-blur-md border border-white/40 hover:border-white/60 transition-all duration-300 hover:shadow-2xl shadow-xl overflow-hidden">
        {/* Event Type Badge */}
        <div className="relative">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getEventTypeColor(event.eventType)} shadow-lg`}
          >
            <div className="flex items-center gap-1">
              {getEventTypeIcon(event.eventType)}
              {event.eventType}
            </div>
          </motion.div>

          {/* Day Badge */}
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow-lg"
          >
            Day {event.day}
          </motion.div>

          {/* Gradient Overlay */}
          <div className={`h-32 bg-gradient-to-br ${getEventTypeColor(event.eventType)} opacity-90 relative overflow-hidden`}>
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
              style={{ backgroundSize: '200% 200%' }}
            />
          </div>
        </div>

        <CardHeader className="pb-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-ubuntu-600 transition-colors">
              {event.themedEventName}
            </CardTitle>
            <p className="text-sm text-gray-600 font-medium">{event.event}</p>
            <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
              {event.category}
            </p>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Participation Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs text-blue-600 font-medium">Solo</div>
                <div className="text-sm font-semibold text-gray-800">
                  {event.solo === 'NA' ? 'N/A' : event.solo}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-xs text-green-600 font-medium">Group</div>
                <div className="text-sm font-semibold text-gray-800">
                  {event.group === 'NA' ? 'N/A' : event.group}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Points System */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-yellow-700">Participation</span>
              <span className="text-sm font-bold text-yellow-800">+{event.participationPoints}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg border border-yellow-300">
                <div className="font-bold text-yellow-800">1st</div>
                <div className="text-yellow-700">+{event.winnerPoints.first}</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border border-gray-300">
                <div className="font-bold text-gray-800">2nd</div>
                <div className="text-gray-700">+{event.winnerPoints.second}</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-b from-orange-100 to-orange-200 rounded-lg border border-orange-300">
                <div className="font-bold text-orange-800">3rd</div>
                <div className="text-orange-700">+{event.winnerPoints.third}</div>
              </div>
            </div>
          </motion.div>

        </CardContent>
      </Card>
    </motion.div>
  );
};
