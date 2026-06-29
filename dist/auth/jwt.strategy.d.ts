import { Strategy } from 'passport-jwt';
import { User } from "../users/schemas/user.schema";
import { Model } from 'mongoose';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: any): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        role: string;
        phone: string;
    }>;
}
export {};
