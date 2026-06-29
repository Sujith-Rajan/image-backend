import { Controller, Post, Get, Query, Body, HttpCode, HttpStatus, UseGuards, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create-user')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Admin can create a new user' })
    async createUser(@Body() createUserDto: CreateUserDto, @GetUser() adminUser: any) {
        const user = await this.usersService.createUser(createUserDto, adminUser);

        return {
            success: true,
            message: 'User created successfully',
            user,
        };
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Admin can view paginated users list' })
    async getUsers(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @GetUser() user: any
    ) {
        const result = await this.usersService.getUsers(page, limit, user);
        return {
            success: true,
            message: 'Users fetched successfully',
            ...result,
        };
    }

    @Get('/all-users')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('user')
    @ApiOperation({ summary: 'User can view paginated users list' })
    async getAllUsers(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @GetUser() user: any
    ) {
        const result = await this.usersService.getAllUsers(page, limit, user);
        return {
            success: true,
            message: 'Users fetched successfully',
            ...result,
        };
    }
}
