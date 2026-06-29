import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosService {
    private todoModel;
    private userModel;
    constructor(todoModel: Model<TodoDocument>, userModel: Model<UserDocument>);
    create(createTodoDto: CreateTodoDto, user: any): Promise<Todo>;
    findAll(user: any): Promise<Todo[]>;
    findRecent(user: any): Promise<Todo[]>;
    findOne(id: string, user: any): Promise<Todo>;
    update(id: string, updateTodoDto: UpdateTodoDto, user: any): Promise<Todo>;
    remove(id: string, user: any): Promise<any>;
    startTimer(id: string, user: any): Promise<Todo>;
    stopTimer(id: string, user: any): Promise<Todo>;
    addComment(id: string, commentText: string, user: any): Promise<Todo>;
    markAsRead(id: string, user: any): Promise<Todo>;
}
