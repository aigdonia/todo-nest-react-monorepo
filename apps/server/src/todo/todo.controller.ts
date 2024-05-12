import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() { todo }: { todo: string }) {
    return this.todoService.create(todo);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Pick<Todo, 'description' | 'completed'>,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
