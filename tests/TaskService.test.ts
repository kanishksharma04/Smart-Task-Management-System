import { TaskService } from '../db/services/TaskService';
import { TaskRepository } from '../db/repositories/TaskRepository';

// Mock the repository
jest.mock('../db/repositories/TaskRepository', () => {
  return {
    TaskRepository: {
      getInstance: jest.fn().mockReturnValue({
        findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Task' }]),
      })
    }
  };
});

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = TaskService.getInstance();
  });

  it('should be a singleton class instance', () => {
    expect(taskService).toBeInstanceOf(TaskService);
    const instance2 = TaskService.getInstance();
    expect(taskService).toBe(instance2);
  });

  it('should validate required fields when creating a task', async () => {
    await expect(taskService.createTask({ title: '', description: '', projectId: '1' })).rejects.toThrow('title is required, description is required');
  });

  it('should use repository to get all tasks', async () => {
    const tasks = await taskService.getAllTasks();
    expect(tasks).toEqual([{ id: '1', title: 'Test Task' }]);
  });
});
