import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

export enum PriorityLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum StatusState {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, minlength: 10 })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: PriorityLevel })
  priority: PriorityLevel;

  @Prop({
    required: true,
    enum: StatusState,
    default: StatusState.Pending,
  })
  status: StatusState;

  @Prop({
    required: true,
    min: 0,
    max: 100,
    default: 0,
  })
  progress: number;

  @Prop({
    type: [
      {
        title: String,
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  })
  subTasks: {
    title: string;
    isCompleted: boolean;
  }[];

  @Prop()
  dueDate?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  assignedTo?: User;

  // Task timer fields
  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;

  // Total work duration in seconds
  @Prop({
    default: 0,
  })
  totalWorkedSeconds: number;

  // Optional estimated duration
  @Prop()
  estimatedHours?: number;

  // Comments
  @Prop({
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
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
  })
  comments: {
    user: User;
    comment: string;
    createdAt: Date;
  }[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy?: User;

  @Prop({ default: false })
  isReadByAssignee: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);