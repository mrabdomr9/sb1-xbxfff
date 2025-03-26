import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import type { Project } from '../../types/project';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Must be a valid image URL'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectsManager = () => {
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = useProjectStore();
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: editingProject || undefined,
  });

  const onSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
      setEditingProject(null);
    } else {
      addProject(data);
    }
    reset();
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < projects.length) {
      reorderProjects(index, newIndex);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                {...register('image')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    reset();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleMoveProject(index, 'up')}
                    disabled={index === 0}
                    className="text-gray-600 hover:text-[#04968d] disabled:opacity-50"
                  >
                    <MoveUp className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleMoveProject(index, 'down')}
                    disabled={index === projects.length - 1}
                    className="text-gray-600 hover:text-[#04968d] disabled:opacity-50"
                  >
                    <MoveDown className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingProject(project)}
                    className="text-[#04968d] hover:text-opacity-80"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-opacity-80"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsManager;