import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    createTodo(createTodoDto: CreateTodoDto, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    getRecentTodos(user: any): Promise<{
        success: boolean;
        message: string;
        todos: import("./schemas/todo.schema").Todo[];
    }>;
    getTodos(user: any): Promise<{
        success: boolean;
        message: string;
        todos: import("./schemas/todo.schema").Todo[];
    }>;
    getTodo(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    updateTodo(id: string, updateTodoDto: UpdateTodoDto, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    patchTodo(id: string, updateTodoDto: UpdateTodoDto, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    deleteTodo(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        deleted: any;
    }>;
    startTimer(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    stopTimer(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    addComment(id: string, comment: string, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
    markAsRead(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        todo: import("./schemas/todo.schema").Todo;
    }>;
}
