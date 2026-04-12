import fs from 'fs';
import path from 'path';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in_progress' | 'completed';

export interface ILocalTask {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

const tasksFilePath = path.join(process.cwd(), 'db', 'localTasks.json');

const loadTasks = (): ILocalTask[] => {
  try {
    if (!fs.existsSync(tasksFilePath)) {
      return [];
    }

    const raw = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(raw || '[]') as ILocalTask[];
  } catch (error) {
    console.error('Failed to load local tasks store:', error);
    return [];
  }
};

const saveTasks = (tasks: ILocalTask[]) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to save local tasks store:', error);
  }
};

const createTaskRecord = ({
  title,
  description,
  priority,
  deadline,
  projectId,
}: {
  title: string;
  description: string;
  priority?: Priority;
  deadline?: string;
  projectId?: string;
}): ILocalTask => ({
  _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title,
  description,
  status: 'pending',
  priority: priority || 'medium',
  deadline: deadline ? new Date(deadline).toISOString() : undefined,
  projectId,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const getLocalTasks = (): ILocalTask[] => {
  return loadTasks().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createLocalTask = ({
  title,
  description,
  priority,
  deadline,
  projectId,
}: {
  title: string;
  description: string;
  priority?: Priority;
  deadline?: string;
  projectId?: string;
}): ILocalTask => {
  const tasks = loadTasks();
  const newTask = createTaskRecord({ title, description, priority, deadline, projectId });
  tasks.unshift(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateLocalTaskStatus = (id: string, status: Status): ILocalTask | null => {
  const tasks = loadTasks();
  const index = tasks.findIndex((task) => task._id === id);
  if (index === -1) {
    return null;
  }

  const updatedTask = {
    ...tasks[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  saveTasks(tasks);
  return updatedTask;
};
