import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasksData: Task[] = [];

  get tasks(): Task[] {
    return this.tasksData;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasksData.push(task);
    return task;
  }

  findTask(id: string): Task {
    return this.tasksData.find((x) => x.id === id);
  }

  findTasks({ status, search }: GetTasksFilterDto): Task[] {
    return this.tasksData.filter(
      (x) =>
        (status && x.status === status) ||
        (search &&
          (x.title.includes(search) || x.description.includes(search))),
    );
  }

  delete(id: string): void {
    this.tasksData = this.tasksData.filter((x) => x.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.findTask(id);
    task.status = status;
    return task;
  }
}
