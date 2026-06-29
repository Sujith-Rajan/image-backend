import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
