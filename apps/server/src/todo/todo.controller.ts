import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import type { JWTPayload } from 'jsonwebtoken';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() { todo }: { todo: string }, @Auth() auth: JWTPayload) {
    return this.todoService.create(auth.sub, todo);
  }

  @Get()
  findAll(@Auth() auth: JWTPayload) {
    const userId = auth.sub;
    return this.todoService.findAllForUser(userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Pick<Todo, 'description' | 'completed'>,
    @Auth() auth: JWTPayload,
  ) {
    return this.todoService.update(id, auth.sub, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Auth() auth: JWTPayload) {
    try {
      return this.todoService.delete(auth.sub, id);
    } catch (error) {
      throw error;
    }
  }
}
