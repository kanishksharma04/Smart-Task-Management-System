import fs from 'fs';
import path from 'path';

export interface ILocalProject {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const projectsFilePath = path.join(process.cwd(), 'db', 'localProjects.json');

const loadProjects = (): ILocalProject[] => {
  try {
    if (!fs.existsSync(projectsFilePath)) {
      return [];
    }

    const raw = fs.readFileSync(projectsFilePath, 'utf8');
    return JSON.parse(raw || '[]') as ILocalProject[];
  } catch (error) {
    console.error('Failed to load local projects store:', error);
    return [];
  }
};

const saveProjects = (projects: ILocalProject[]) => {
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to save local projects store:', error);
  }
};

const createProjectRecord = ({
  name,
  description,
}: {
  name: string;
  description: string;
}): ILocalProject => ({
  _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  description,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const getLocalProjects = (): ILocalProject[] => {
  return loadProjects().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createLocalProject = ({
  name,
  description,
}: {
  name: string;
  description: string;
}): ILocalProject => {
  const projects = loadProjects();
  const newProject = createProjectRecord({ name, description });
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
};
