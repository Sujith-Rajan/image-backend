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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = exports.Todo = exports.StatusState = exports.PriorityLevel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const user_schema_1 = require("../../users/schemas/user.schema");
var PriorityLevel;
(function (PriorityLevel) {
    PriorityLevel["Low"] = "Low";
    PriorityLevel["Medium"] = "Medium";
    PriorityLevel["High"] = "High";
})(PriorityLevel || (exports.PriorityLevel = PriorityLevel = {}));
var StatusState;
(function (StatusState) {
    StatusState["Pending"] = "Pending";
    StatusState["InProgress"] = "In Progress";
    StatusState["Completed"] = "Completed";
})(StatusState || (exports.StatusState = StatusState = {}));
let Todo = class Todo {
    title;
    description;
    category;
    priority;
    status;
    progress;
    dueDate;
    assignedTo;
    startedAt;
    completedAt;
    totalWorkedSeconds;
    estimatedHours;
    comments;
    createdBy;
    isReadByAssignee;
};
exports.Todo = Todo;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, minlength: 10 }),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Todo.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: PriorityLevel }),
    __metadata("design:type", String)
], Todo.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: StatusState,
        default: StatusState.Pending,
    }),
    __metadata("design:type", String)
], Todo.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        min: 0,
        max: 100,
        default: 0,
    }),
    __metadata("design:type", Number)
], Todo.prototype, "progress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Todo.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_schema_1.User)
], Todo.prototype, "assignedTo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Todo.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Todo.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Todo.prototype, "totalWorkedSeconds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Todo.prototype, "estimatedHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                user: {
                    type: mongoose_2.default.Schema.Types.ObjectId,
                    ref: 'User',
                },
                comment: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Todo.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_schema_1.User)
], Todo.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "isReadByAssignee", void 0);
exports.Todo = Todo = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Todo);
exports.TodoSchema = mongoose_1.SchemaFactory.createForClass(Todo);
//# sourceMappingURL=todo.schema.js.map