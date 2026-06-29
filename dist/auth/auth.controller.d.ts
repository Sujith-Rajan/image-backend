import { AuthService } from "./auth.service";
import type { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        user: Omit<{
            name: string;
            email: string;
            phone: string;
            password: string;
            role: string;
            isEmailVerified: boolean;
            createdBy: {
                name: string;
                email: string;
                phone: string;
                password: string;
                role: string;
                isEmailVerified: boolean;
                createdBy: any;
            };
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "__v">;
        message: string;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        success: boolean;
        message: string;
        user: Omit<{
            name: string;
            email: string;
            phone: string;
            password: string;
            role: string;
            isEmailVerified: boolean;
            createdBy: {
                name: string;
                email: string;
                phone: string;
                password: string;
                role: string;
                isEmailVerified: boolean;
                createdBy: any;
            };
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "__v">;
        accessToken: string;
    }>;
    refreshToken(req: any): Promise<{
        success: boolean;
        message: string;
        accessToken: string;
        user: import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    logout(res: Response): Promise<{
        success: boolean;
        message: string;
    }>;
}
