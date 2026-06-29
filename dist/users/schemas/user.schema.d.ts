import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    createdBy: User;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any, any, User>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isEmailVerified?: mongoose.SchemaDefinitionProperty<boolean, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<User, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, User>;
