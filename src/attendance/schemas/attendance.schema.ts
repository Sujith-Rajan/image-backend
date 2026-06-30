import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  date: string; // Format: YYYY-MM-DD

  @Prop({ type: Date, required: true })
  checkInTime: Date;

  @Prop({ type: Date })
  checkOutTime: Date;

  @Prop({ type: Number, default: 0 })
  hoursWorked: number;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

// Index to ensure a user only has one attendance record per day
AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
