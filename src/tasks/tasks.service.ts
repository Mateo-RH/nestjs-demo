import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  createTask({ title, description }: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(title, description);
  }

  async findTask(id: string): Promise<Task> {
    const result = await this.tasksRepository.findOne(id);
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  findTasks({ status, search }: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(status, search);
  }

  async delete(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Task not found');
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findTask(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
