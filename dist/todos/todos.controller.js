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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorators_1 = require("../common/decorators/get-user.decorators");
const swagger_1 = require("@nestjs/swagger");
let TodosController = class TodosController {
    todosService;
    constructor(todosService) {
        this.todosService = todosService;
    }
    async createTodo(createTodoDto, user) {
        const todo = await this.todosService.create(createTodoDto, user);
        return {
            success: true,
            message: 'Todo created successfully',
            todo,
        };
    }
    async getRecentTodos(user) {
        const todos = await this.todosService.findRecent(user);
        return {
            success: true,
            message: 'Recent todos retrieved successfully',
            todos,
        };
    }
    async getTodos(user) {
        const todos = await this.todosService.findAll(user);
        return {
            success: true,
            message: 'Todos retrieved successfully',
            todos,
        };
    }
    async getTodo(id, user) {
        const todo = await this.todosService.findOne(id, user);
        return {
            success: true,
            message: 'Todo retrieved successfully',
            todo,
        };
    }
    async updateTodo(id, updateTodoDto, user) {
        const todo = await this.todosService.update(id, updateTodoDto, user);
        return {
            success: true,
            message: 'Todo updated successfully',
            todo,
        };
    }
    async patchTodo(id, updateTodoDto, user) {
        const todo = await this.todosService.update(id, updateTodoDto, user);
        return {
            success: true,
            message: 'Todo updated successfully',
            todo,
        };
    }
    async deleteTodo(id, user) {
        const deleted = await this.todosService.remove(id, user);
        return {
            success: true,
            message: 'Todo deleted successfully',
            deleted,
        };
    }
    async startTimer(id, user) {
        const todo = await this.todosService.startTimer(id, user);
        return {
            success: true,
            message: 'Timer started',
            todo,
        };
    }
    async stopTimer(id, user) {
        const todo = await this.todosService.stopTimer(id, user);
        return {
            success: true,
            message: 'Timer stopped',
            todo,
        };
    }
    async addComment(id, comment, user) {
        const todo = await this.todosService.addComment(id, comment, user);
        return {
            success: true,
            message: 'Comment added',
            todo,
        };
    }
    async markAsRead(id, user) {
        const todo = await this.todosService.markAsRead(id, user);
        return {
            success: true,
            message: 'Task marked as read',
            todo,
        };
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new todo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent todos' }),
    __param(0, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getRecentTodos", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all todos' }),
    __param(0, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific todo by id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodo", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific todo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Partially update a specific todo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "patchTodo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific todo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "deleteTodo", null);
__decorate([
    (0, common_1.Post)(':id/timer/start'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Start task timer' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "startTimer", null);
__decorate([
    (0, common_1.Post)(':id/timer/stop'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Stop task timer' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "stopTimer", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a task' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Mark task as read by assignee' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "markAsRead", null);
exports.TodosController = TodosController = __decorate([
    (0, swagger_1.ApiTags)('Todos'),
    (0, common_1.Controller)('todos'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map