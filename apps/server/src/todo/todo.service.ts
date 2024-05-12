import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(todoBody: string): Promise<Todo> {
    const createdTodo = new this.todoModel({ description: todoBody });
    return createdTodo.save();
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async update(
    id: string,
    todo: Pick<Todo, 'description' | 'completed'>,
  ): Promise<Todo | null> {
    try {
      //* find and update todo if exists, and return mutated todo
      const mutatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, {
        new: true,
      });
      return mutatedTodo ? mutatedTodo.toObject() : null;
    } catch (error) {
      throw new Error(`Unable to update todo: ${error.message}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(id);

      if (!deletedTodo) {
        throw new NotFoundException('Todo not found');
      }

      return true; // Indicates successful deletion
    } catch (error) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  }
}
