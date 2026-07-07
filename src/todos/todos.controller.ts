import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusState } from './schemas/todo.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new todo' })
  async createTodo(@Body() createTodoDto: CreateTodoDto, @GetUser() user: any) {
    const todo = await this.todosService.create(createTodoDto, user);
    return {
      success: true,
      message: 'Todo created successfully',
      todo,
    };
  }

  @Get('recent')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get recent todos' })
  async getRecentTodos(
    @GetUser() user: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const result = await this.todosService.findRecent(user, pageNum, limitNum);
    return {
      success: true,
      message: 'Recent todos retrieved successfully',
      todos: result.todos,
      total: result.total,
      hasMore: result.hasMore,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all todos' })
  async getTodos(@GetUser() user: any) {
    const todos = await this.todosService.findAll(user);
    return {
      success: true,
      message: 'Todos retrieved successfully',
      todos,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific todo by id' })
  async getTodo(@Param('id') id: string, @GetUser() user: any) {
    const todo = await this.todosService.findOne(id, user);
    return {
      success: true,
      message: 'Todo retrieved successfully',
      todo,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a specific todo' })
  async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @GetUser() user: any) {
    const todo = await this.todosService.update(id, updateTodoDto, user);
    return {
      success: true,
      message: 'Todo updated successfully',
      todo,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Partially update a specific todo' })
  async patchTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @GetUser() user: any) {
    const todo = await this.todosService.update(id, updateTodoDto, user);
    return {
      success: true,
      message: 'Todo updated successfully',
      todo,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a specific todo' })
  async deleteTodo(@Param('id') id: string, @GetUser() user: any) {
    const deleted = await this.todosService.remove(id, user);
    return {
      success: true,
      message: 'Todo deleted successfully',
      deleted,
    };
  }

  @Post(':id/timer/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start task timer' })
  async startTimer(@Param('id') id: string, @GetUser() user: any) {
    const todo = await this.todosService.startTimer(id, user);
    return {
      success: true,
      message: 'Timer started',
      todo,
    };
  }

  @Post(':id/timer/stop')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stop task timer' })
  async stopTimer(@Param('id') id: string, @GetUser() user: any) {
    const todo = await this.todosService.stopTimer(id, user);
    return {
      success: true,
      message: 'Timer stopped',
      todo,
    };
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a comment to a task' })
  async addComment(
    @Param('id') id: string,
    @Body('comment') comment: string,
    @GetUser() user: any
  ) {
    const todo = await this.todosService.addComment(id, comment, user);
    return {
      success: true,
      message: 'Comment added',
      todo,
    };
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark task as read by assignee' })
  async markAsRead(@Param('id') id: string, @GetUser() user: any) {
    const todo = await this.todosService.markAsRead(id, user);
    return {
      success: true,
      message: 'Task marked as read',
      todo,
    };
  }
}
