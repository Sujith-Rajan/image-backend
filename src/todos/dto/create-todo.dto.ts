import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional, IsNumber, Min, Max, IsDateString } from 'class-validator';
import { PriorityLevel, StatusState } from '../schemas/todo.schema';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(PriorityLevel)
  @IsNotEmpty()
  priority: PriorityLevel;

  @IsEnum(StatusState)
  @IsOptional()
  status?: StatusState;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}
