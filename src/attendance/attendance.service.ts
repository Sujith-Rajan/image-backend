import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async checkIn(userId: string) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    let record = await this.attendanceModel.findOne({ userId: new Types.ObjectId(userId), date: today });
    if (record) {
      throw new BadRequestException('Already checked in for today');
    }

    record = new this.attendanceModel({
      userId: new Types.ObjectId(userId),
      date: today,
      checkInTime: new Date(),
    });

    return record.save();
  }

  async checkOut(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    
    const record = await this.attendanceModel.findOne({ userId: new Types.ObjectId(userId), date: today });
    if (!record) {
      throw new BadRequestException('No check-in record found for today');
    }

    if (record.checkOutTime) {
      throw new BadRequestException('Already checked out for today');
    }

    const checkOutTime = new Date();
    const diffMs = checkOutTime.getTime() - record.checkInTime.getTime();
    const hoursWorked = diffMs / (1000 * 60 * 60);

    record.checkOutTime = checkOutTime;
    record.hoursWorked = hoursWorked;

    return record.save();
  }

  async getAttendance(userId: string, startDate?: string, endDate?: string, targetUserId?: string) {
    // Basic implementation: if a specific user is requested, return theirs (useful for admins).
    // The controller will ensure authorization rules.
    const query: any = {};
    
    if (targetUserId) {
      if (targetUserId !== 'ALL') {
        query.userId = new Types.ObjectId(targetUserId);
      }
    } else {
      query.userId = new Types.ObjectId(userId);
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }

    return this.attendanceModel.find(query).sort({ date: -1 }).populate('userId', 'name email').exec();
  }
}
