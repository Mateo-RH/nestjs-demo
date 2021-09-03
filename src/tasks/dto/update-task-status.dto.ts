import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `Status should be one of the values: ${Object.keys(TaskStatus)}`,
  })
  status: TaskStatus;
}
