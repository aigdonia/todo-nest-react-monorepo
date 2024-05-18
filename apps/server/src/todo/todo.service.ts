import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(userId: string, todoBody: string): Promise<Todo> {
    const createdTodo = new this.todoModel({ description: todoBody, userId });
    return createdTodo.save();
  }

  findAllForUser(userId: string): Promise<Todo[]> {
    return this.todoModel
      .find({ userId })
      .sort({ completed: 1, createdAt: -1, updatedAt: -1 })
      .exec();
  }

  async update(
    id: string,
    userId: string,
    todo: Pick<Todo, 'description' | 'completed'>,
  ): Promise<Todo | null> {
    try {
      //* find and update todo if exists, and return mutated todo
      const mutatedTodo = await this.todoModel.findOneAndUpdate(
        { _id: id, userId }, // filter criteria
        todo, // payload to update
        { new: true }, // force return updated todo
      );
      return mutatedTodo ? mutatedTodo.toObject() : null;
    } catch (error) {
      throw new Error(`Unable to update todo: ${error.message}`);
    }
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const deletedTodo = await this.todoModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return true; // Indicates successful deletion
  }
}
