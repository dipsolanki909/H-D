import React from 'react';
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Video state
  videos: [],
  projects: [],
  currentProject: null,
  currentVideo: null,
  uploadedFile: null,
  selectedCategory: null,
  selectedTemplate: null,
  selectedResolution: '720p',
  selectedFormat: 'mp4',

  // Editing state
  editorSettings: {
    trim: { start: 0, end: 0 },
    merge: [],
    filters: [],
    text: [],
    music: [],
    transitions: [],
  },

  // Payment state
  isPremium: false,
  subscriptionPlan: null,
  watermarkRemoved: false,

  // UI state
  isLoading: false,
  error: null,
  successMessage: null,

  // Actions
  uploadVideo: (file) => set((state) => ({
    uploadedFile: file,
    videos: [...state.videos, { id: Date.now(), name: file.name, file, createdAt: new Date() }],
  })),

  deleteVideo: (id) => set((state) => ({
    videos: state.videos.filter(v => v.id !== id),
  })),

  setCategory: (category) => set({ selectedCategory: category }),

  setTemplate: (template) => set({ selectedTemplate: template }),

  createProject: (name) => set((state) => ({
    projects: [...state.projects, {
      id: Date.now(),
      name,
      videos: [],
      status: 'In Progress',
      createdAt: new Date(),
    }],
    currentProject: state.projects.length > 0 ? state.projects[0] : null,
  })),

  updateProject: (projectId, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === projectId ? { ...p, ...updates } : p),
  })),

  deleteProject: (projectId) => set((state) => ({
    projects: state.projects.filter(p => p.id !== projectId),
    currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
  })),

  setCurrentProject: (projectId) => set((state) => ({
    currentProject: state.projects.find(p => p.id === projectId),
  })),

  assignVideoToProject: (videoId, projectId) => set((state) => ({
    projects: state.projects.map(p =>
      p.id === projectId
        ? { ...p, videos: [...p.videos, videoId] }
        : p
    ),
  })),

  updateEditorSettings: (settings) => set((state) => ({
    editorSettings: { ...state.editorSettings, ...settings },
  })),

  setResolution: (resolution) => set({ selectedResolution: resolution }),

  setFormat: (format) => set({ selectedFormat: format }),

  setPremium: (isPremium, plan = null) => set({
    isPremium,
    subscriptionPlan: plan,
    watermarkRemoved: isPremium,
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSuccess: (message) => set({ successMessage: message }),

  reset: () => set({
    videos: [],
    projects: [],
    currentProject: null,
    currentVideo: null,
    uploadedFile: null,
    selectedCategory: null,
    selectedTemplate: null,
    selectedResolution: '720p',
    selectedFormat: 'mp4',
    editorSettings: {
      trim: { start: 0, end: 0 },
      merge: [],
      filters: [],
      text: [],
      music: [],
      transitions: [],
    },
    isPremium: false,
    subscriptionPlan: null,
    watermarkRemoved: false,
    isLoading: false,
    error: null,
    successMessage: null,
  }),
}));
