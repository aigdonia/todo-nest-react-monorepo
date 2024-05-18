import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Todo {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true, select: false })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, select: false })
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
export type TodoDocument = HydratedDocument<Todo>;
