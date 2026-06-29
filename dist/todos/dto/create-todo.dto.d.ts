import { PriorityLevel, StatusState } from '../schemas/todo.schema';
export declare class CreateTodoDto {
    title: string;
    description: string;
    category: string;
    priority: PriorityLevel;
    status?: StatusState;
    progress?: number;
    dueDate?: string;
    assignedTo?: string;
}
