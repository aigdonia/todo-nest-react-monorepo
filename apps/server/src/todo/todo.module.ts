import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './todo.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ConfigModule,
    AuthModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
