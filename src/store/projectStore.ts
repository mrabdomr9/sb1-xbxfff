import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Project } from '../types/project';

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: "ERP Implementation for Tech Corp",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    description: "Complete Oracle ERP implementation with custom modules"
  },
  {
    id: '2',
    title: "Logistics Management System",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    description: "End-to-end logistics and supply chain management solution"
  },
  {
    id: '3',
    title: "School Management Platform",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    description: "Comprehensive school management system with parent portal"
  }
];

export const useProjectStore = create<ProjectState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        projects: initialProjects,
        addProject: (project) =>
          set((state) => {
            const newProject = { ...project, id: Date.now().toString() };
            return {
              projects: [newProject, ...state.projects],
            };
          }),
        updateProject: (id, project) =>
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === id ? { ...project, id } : p
            ),
          })),
        deleteProject: (id) =>
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          })),
        reorderProjects: (startIndex: number, endIndex: number) =>
          set((state) => {
            const newProjects = [...state.projects];
            const [removed] = newProjects.splice(startIndex, 1);
            newProjects.splice(endIndex, 0, removed);
            return { projects: newProjects };
          }),
      }),
      {
        name: 'projects-storage',
        onRehydrateStorage: () => (state) => {
          console.log('Projects state rehydrated:', state?.projects);
        },
      }
    )
  )
);