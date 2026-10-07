import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as defaultProjects } from '../data/projects';

interface ProjectContextType {
  projects: Project[];
  addProject: (p: Project) => void;
  updateProject: (p: Project) => void;
  deleteProject: (slug: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gg_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  const save = (newProjects: Project[]) => {
    setProjects(newProjects);
    // Keep to a reasonable size so localStorage doesn't blow up (5MB limit)
    try {
      localStorage.setItem('gg_projects', JSON.stringify(newProjects));
    } catch (e) {
      console.warn("Storage quota exceeded, could not save to localStorage.");
    }
  };

  const addProject = (p: Project) => {
    save([...projects, p]);
  };

  const updateProject = (p: Project) => {
    save(projects.map(proj => proj.slug === p.slug ? p : proj));
  };

  const deleteProject = (slug: string) => {
    save(projects.filter(p => p.slug !== slug));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
};
