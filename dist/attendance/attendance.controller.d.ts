import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(user: any): Promise<{
        success: boolean;
        message: string;
        record: import("mongoose").Document<unknown, {}, import("./schemas/attendance.schema").AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/attendance.schema").Attendance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    checkOut(user: any): Promise<{
        success: boolean;
        message: string;
        record: import("mongoose").Document<unknown, {}, import("./schemas/attendance.schema").AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/attendance.schema").Attendance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getAttendance(user: any, startDate?: string, endDate?: string, userId?: string): Promise<{
        success: boolean;
        records: (import("mongoose").Document<unknown, {}, import("./schemas/attendance.schema").AttendanceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/attendance.schema").Attendance & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
}
