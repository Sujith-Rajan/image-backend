import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto, adminUser: any): Promise<{
        success: boolean;
        message: string;
        user: Omit<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, "__v">;
    }>;
    getUsers(page: number, limit: number, user: any): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
    getAllUsers(page: number, limit: number, user: any): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        success: boolean;
        message: string;
    }>;
}
