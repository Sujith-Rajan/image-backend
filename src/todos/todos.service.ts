import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createTodoDto: CreateTodoDto, user: any): Promise<Todo> {
    // Optionally automatically assign the todo to the creator if not specified, or track creator.
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      assignedTo: createTodoDto.assignedTo || user._id,
      createdBy: user._id,
    });
    return createdTodo.save();
  }

  async findAll(user: any): Promise<Todo[]> {
    let query: any = {};
    if (user.role === 'admin') {
      const usersCreatedByAdmin = await this.userModel.find({ createdBy: user._id }).select('_id').lean();
      const userIds = usersCreatedByAdmin.map(u => u._id.toString());
      query = { createdBy: { $in: [user._id, ...userIds] } };
    } else {
      query = { createdBy: user._id };
    }
    return this.todoModel.find(query).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
  }

  async findRecent(user: any): Promise<Todo[]> {
    let query: any = {};
    if (user.role === 'admin') {
      const usersCreatedByAdmin = await this.userModel.find({ createdBy: user._id }).select('_id').lean();
      const userIds = usersCreatedByAdmin.map(u => u._id.toString());
      query = { createdBy: { $in: [user._id, ...userIds] } };
    } else {
      query = { $or: [{ createdBy: user._id }, { assignedTo: user._id }] };
    }
    return this.todoModel.find(query).sort({ createdAt: -1 }).limit(5).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
  }

  async findOne(id: string, user: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: any): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .populate('assignedTo')
      .exec();
      
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  async remove(id: string, user: any): Promise<any> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return deletedTodo;
  }

  async startTimer(id: string, user: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    
    if (!todo.startedAt) {
      todo.startedAt = new Date();
      await todo.save();
    }
    return this.findOne(id, user);
  }

  async stopTimer(id: string, user: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

    if (todo.startedAt) {
      const elapsedSeconds = Math.floor((Date.now() - todo.startedAt.getTime()) / 1000);
      todo.totalWorkedSeconds += elapsedSeconds;
      todo.startedAt = undefined;
      await todo.save();
    }
    return this.findOne(id, user);
  }

  async addComment(id: string, commentText: string, user: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

    todo.comments.push({
      user: user._id,
      comment: commentText,
      createdAt: new Date()
    } as any);

    await todo.save();
    return this.findOne(id, user);
  }

  async markAsRead(id: string, user: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

    // Only assignee should theoretically mark it as read, but we can just mark it read.
    todo.isReadByAssignee = true;
    await todo.save();
    return this.findOne(id, user);
  }
}
