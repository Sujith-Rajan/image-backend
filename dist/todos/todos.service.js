"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_schema_1 = require("./schemas/todo.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let TodosService = class TodosService {
    todoModel;
    userModel;
    constructor(todoModel, userModel) {
        this.todoModel = todoModel;
        this.userModel = userModel;
    }
    async create(createTodoDto, user) {
        const createdTodo = new this.todoModel({
            ...createTodoDto,
            assignedTo: createTodoDto.assignedTo || user._id,
            createdBy: user._id,
        });
        return createdTodo.save();
    }
    async findAll(user) {
        let query = {};
        if (user.role === 'admin') {
            const usersCreatedByAdmin = await this.userModel.find({ createdBy: user._id }).select('_id').lean();
            const userIds = usersCreatedByAdmin.map(u => u._id.toString());
            query = { createdBy: { $in: [user._id, ...userIds] } };
        }
        else {
            query = { createdBy: user._id };
        }
        return this.todoModel.find(query).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
    }
    async findRecent(user) {
        let query = {};
        if (user.role === 'admin') {
            const usersCreatedByAdmin = await this.userModel.find({ createdBy: user._id }).select('_id').lean();
            const userIds = usersCreatedByAdmin.map(u => u._id.toString());
            query = { createdBy: { $in: [user._id, ...userIds] } };
        }
        else {
            query = { $or: [{ createdBy: user._id }, { assignedTo: user._id }] };
        }
        return this.todoModel.find(query).sort({ createdAt: -1 }).limit(5).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
    }
    async findOne(id, user) {
        const todo = await this.todoModel.findById(id).populate('assignedTo', 'name email').populate('comments.user', 'name email').exec();
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async update(id, updateTodoDto, user) {
        const updatedTodo = await this.todoModel
            .findByIdAndUpdate(id, updateTodoDto, { new: true })
            .populate('assignedTo')
            .exec();
        if (!updatedTodo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return updatedTodo;
    }
    async remove(id, user) {
        const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
        if (!deletedTodo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return deletedTodo;
    }
    async startTimer(id, user) {
        const todo = await this.todoModel.findById(id);
        if (!todo)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        if (!todo.startedAt) {
            todo.startedAt = new Date();
            await todo.save();
        }
        return this.findOne(id, user);
    }
    async stopTimer(id, user) {
        const todo = await this.todoModel.findById(id);
        if (!todo)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        if (todo.startedAt) {
            const elapsedSeconds = Math.floor((Date.now() - todo.startedAt.getTime()) / 1000);
            todo.totalWorkedSeconds += elapsedSeconds;
            todo.startedAt = undefined;
            await todo.save();
        }
        return this.findOne(id, user);
    }
    async addComment(id, commentText, user) {
        const todo = await this.todoModel.findById(id);
        if (!todo)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        todo.comments.push({
            user: user._id,
            comment: commentText,
            createdAt: new Date()
        });
        await todo.save();
        return this.findOne(id, user);
    }
    async markAsRead(id, user) {
        const todo = await this.todoModel.findById(id);
        if (!todo)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        todo.isReadByAssignee = true;
        await todo.save();
        return this.findOne(id, user);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_schema_1.Todo.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TodosService);
//# sourceMappingURL=todos.service.js.map