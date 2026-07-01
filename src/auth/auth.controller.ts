import { Controller, Body, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User signup' })
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { user, accessToken } = await this.authService.login(loginDto, res);
        return {
            success: true,
            message: 'Login successful',
            user,
            accessToken,
        };
    }



    @Get('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Req() req: any) {
        const data = await this.authService.refreshToken(req);

        return {
            success: true,
            message: 'Token refreshed successfully',
            accessToken: data.accessToken,
            user: data.user,
        };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response) {
        const isSecureCookie = process.env.COOKIE_SECURE === 'true';

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isSecureCookie,
            sameSite: isSecureCookie ? 'none' : 'lax',
        });
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
}