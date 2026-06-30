import { Controller, Post, Get, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { GetUser } from 'src/common/decorators/get-user.decorators';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post('check-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check in for the day' })
  async checkIn(@GetUser() user: any) {
    const record = await this.attendanceService.checkIn(user._id);
    return {
      success: true,
      message: 'Successfully checked in',
      record,
    };
  }

  @Post('check-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check out for the day' })
  async checkOut(@GetUser() user: any) {
    const record = await this.attendanceService.checkOut(user._id);
    return {
      success: true,
      message: 'Successfully checked out',
      record,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get attendance records' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'userId', required: false, description: 'Only for Admins to fetch a specific user' })
  async getAttendance(
    @GetUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('userId') userId?: string,
  ) {
    // If user is Admin (role check), allow fetching arbitrary userId.
    const targetUserId = (user.role === 'admin') && userId ? userId : user._id;

    const records = await this.attendanceService.getAttendance(user._id, startDate, endDate, targetUserId);
    return {
      success: true,
      records,
    };
  }
}
