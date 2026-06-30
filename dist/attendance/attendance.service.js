"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("./schemas/attendance.schema");
let AttendanceService = class AttendanceService {
    attendanceModel;
    constructor(attendanceModel) {
        this.attendanceModel = attendanceModel;
    }
    async checkIn(userId) {
        const today = new Date().toISOString().split('T')[0];
        let record = await this.attendanceModel.findOne({ userId: new mongoose_2.Types.ObjectId(userId), date: today });
        if (record) {
            throw new common_1.BadRequestException('Already checked in for today');
        }
        record = new this.attendanceModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: today,
            checkInTime: new Date(),
        });
        return record.save();
    }
    async checkOut(userId) {
        const today = new Date().toISOString().split('T')[0];
        const record = await this.attendanceModel.findOne({ userId: new mongoose_2.Types.ObjectId(userId), date: today });
        if (!record) {
            throw new common_1.BadRequestException('No check-in record found for today');
        }
        if (record.checkOutTime) {
            throw new common_1.BadRequestException('Already checked out for today');
        }
        const checkOutTime = new Date();
        const diffMs = checkOutTime.getTime() - record.checkInTime.getTime();
        const hoursWorked = diffMs / (1000 * 60 * 60);
        record.checkOutTime = checkOutTime;
        record.hoursWorked = hoursWorked;
        return record.save();
    }
    async getAttendance(userId, startDate, endDate, targetUserId) {
        const query = {};
        if (targetUserId) {
            if (targetUserId !== 'ALL') {
                query.userId = new mongoose_2.Types.ObjectId(targetUserId);
            }
        }
        else {
            query.userId = new mongoose_2.Types.ObjectId(userId);
        }
        if (startDate || endDate) {
            query.date = {};
            if (startDate)
                query.date.$gte = startDate;
            if (endDate)
                query.date.$lte = endDate;
        }
        return this.attendanceModel.find(query).sort({ date: -1 }).populate('userId', 'name email').exec();
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map