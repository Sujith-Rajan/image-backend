import { User } from "../users/schemas/user.schema";
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
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
    login(loginDto: LoginDto, res: any): Promise<{
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
        accessToken: string;
        user: import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
