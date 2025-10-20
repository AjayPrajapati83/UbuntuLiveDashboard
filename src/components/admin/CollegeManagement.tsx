'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Users, Trophy, Edit3, School, AlertTriangle } from 'lucide-react';
import { useSupabaseCollegeStore } from '@/store/supabaseCollegeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const CollegeManagement = () => {
  const [newCollegeName, setNewCollegeName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{id: string, name: string, points: number, events: number} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { colleges, addCollege, removeCollege, fetchColleges, isLoading } = useSupabaseCollegeStore();

  // Fetch colleges on component mount
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const handleAddCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCollegeName.trim()) {
      toast.error('Please enter a college name');
      return;
    }

    setIsAdding(true);
    
    try {
      const success = await addCollege(newCollegeName.trim());
      if (success) {
        setNewCollegeName('');
      }
    } catch (error) {
      toast.error('Failed to add college');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveCollege = async (collegeId: string, collegeName: string, points: number, eventCount: number) => {
    setDeleteConfirm({ id: collegeId, name: collegeName, points, events: eventCount });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    setIsDeleting(true);
    try {
      const success = await removeCollege(deleteConfirm.id);
      if (success) {
        setDeleteConfirm(null);
      }
    } catch (error) {
      toast.error('Failed to remove college');
    } finally {
      setIsDeleting(false);
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
            className="mx-auto w-16 h-16 bg-gradient-to-br from-cosmic-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-4"
          >
            <School className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-cosmic-500 to-blue-500 bg-clip-text text-transparent">
              College Management
            </span>
          </CardTitle>
          <p className="text-gray-600">Add, edit, or remove participating colleges</p>
        </CardHeader>
      </Card>

      {/* Add New College */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-cosmic-500" />
            Add New College
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCollege} className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <Input
                type="text"
                value={newCollegeName}
                onChange={(e) => setNewCollegeName(e.target.value)}
                placeholder="Enter college name..."
                className="bg-white/20 backdrop-blur-md border border-white/20 focus:border-cosmic-500"
                disabled={isAdding}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                variant="cosmic"
                disabled={isAdding || !newCollegeName.trim()}
                className="px-6"
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isAdding ? 'Adding...' : 'Add College'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {/* Colleges List */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-cosmic-500" />
            Participating Colleges ({colleges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {colleges.length === 0 ? (
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
                <School className="w-10 h-10 text-gray-400" />
              </motion.div>
              <p className="text-gray-500 font-medium">No colleges added yet</p>
              <p className="text-gray-400 text-sm">Add your first college to get started</p>
            </motion.div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {colleges.map((college, index) => (
                  <motion.div
                    key={college.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                          className="w-12 h-12 bg-gradient-to-br from-cosmic-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <School className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          {editingId === college.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="bg-white/20 backdrop-blur-md border border-white/20"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Here you would implement the edit functionality
                                  setEditingId(null);
                                  setEditName('');
                                }}
                                className="px-3"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditName('');
                                }}
                                className="px-3"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <h3 className="font-semibold text-gray-800">{college.name}</h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Trophy className="w-4 h-4 text-yellow-500" />
                                  <span>{college.total_points} points</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4 text-blue-500" />
                                  <span>0 events</span> {/* Will be updated with participation count */}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {editingId !== college.id && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingId(college.id);
                                setEditName(college.name);
                              }}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveCollege(college.id, college.name, college.total_points, 0)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/30 shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-cosmic-600">{colleges.length}</div>
              <div className="text-sm text-gray-600">Total Colleges</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-2xl font-bold text-ubuntu-600">
                0 {/* Will be updated with actual participation count */}
              </div>
              <div className="text-sm text-gray-600">Total Participations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-2xl font-bold text-green-600">
                {colleges.reduce((sum, college) => sum + college.total_points, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Points</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !isDeleting && setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/40 shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4"
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete College?
                </h3>
                
                <div className="text-gray-600 mb-4">
                  <p className="mb-2">
                    Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
                  </p>
                  
                  {deleteConfirm.points > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-red-700 mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Warning: College has points!</span>
                      </div>
                      <div className="text-sm text-red-600">
                        • <strong>{deleteConfirm.points} points</strong> will be removed from leaderboard
                        <br />
                        • All participation records will be permanently deleted
                        <br />
                        • This action cannot be undone
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    {isDeleting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    {isDeleting ? 'Deleting...' : 'Delete College'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
