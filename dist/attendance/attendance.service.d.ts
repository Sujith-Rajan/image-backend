import { Model, Types } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
export declare class AttendanceService {
    private attendanceModel;
    constructor(attendanceModel: Model<AttendanceDocument>);
    checkIn(userId: string): Promise<import("mongoose").Document<unknown, {}, AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & Attendance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    checkOut(userId: string): Promise<import("mongoose").Document<unknown, {}, AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & Attendance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAttendance(userId: string, startDate?: string, endDate?: string, targetUserId?: string): Promise<(import("mongoose").Document<unknown, {}, AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & Attendance & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
