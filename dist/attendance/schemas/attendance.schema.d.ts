import { Document, Types } from 'mongoose';
export type AttendanceDocument = Attendance & Document;
export declare class Attendance {
    userId: Types.ObjectId;
    date: string;
    checkInTime: Date;
    checkOutTime: Date;
    hoursWorked: number;
}
export declare const AttendanceSchema: import("mongoose").Schema<Attendance, import("mongoose").Model<Attendance, any, any, any, any, any, Attendance>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attendance, Document<unknown, {}, Attendance, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Attendance, Document<unknown, {}, Attendance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    date?: import("mongoose").SchemaDefinitionProperty<string, Attendance, Document<unknown, {}, Attendance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    checkInTime?: import("mongoose").SchemaDefinitionProperty<Date, Attendance, Document<unknown, {}, Attendance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    checkOutTime?: import("mongoose").SchemaDefinitionProperty<Date, Attendance, Document<unknown, {}, Attendance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    hoursWorked?: import("mongoose").SchemaDefinitionProperty<number, Attendance, Document<unknown, {}, Attendance, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Attendance & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Attendance>;
