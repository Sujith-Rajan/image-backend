import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type TodoDocument = HydratedDocument<Todo>;
export declare enum PriorityLevel {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
export declare enum StatusState {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed"
}
export declare class Todo {
    title: string;
    description: string;
    category: string;
    priority: PriorityLevel;
    status: StatusState;
    progress: number;
    dueDate?: Date;
    assignedTo?: User;
    startedAt?: Date;
    completedAt?: Date;
    totalWorkedSeconds: number;
    estimatedHours?: number;
    comments: {
        user: User;
        comment: string;
        createdAt: Date;
    }[];
    createdBy?: User;
    isReadByAssignee: boolean;
}
export declare const TodoSchema: mongoose.Schema<Todo, mongoose.Model<Todo, any, any, any, any, any, Todo>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Todo, mongoose.Document<unknown, {}, Todo, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Todo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: mongoose.SchemaDefinitionProperty<string, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: mongoose.SchemaDefinitionProperty<string, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priority?: mongoose.SchemaDefinitionProperty<PriorityLevel, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: mongoose.SchemaDefinitionProperty<StatusState, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    progress?: mongoose.SchemaDefinitionProperty<number, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dueDate?: mongoose.SchemaDefinitionProperty<Date | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    assignedTo?: mongoose.SchemaDefinitionProperty<User | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startedAt?: mongoose.SchemaDefinitionProperty<Date | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    completedAt?: mongoose.SchemaDefinitionProperty<Date | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalWorkedSeconds?: mongoose.SchemaDefinitionProperty<number, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    estimatedHours?: mongoose.SchemaDefinitionProperty<number | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    comments?: mongoose.SchemaDefinitionProperty<{
        user: User;
        comment: string;
        createdAt: Date;
    }[], Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<User | undefined, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isReadByAssignee?: mongoose.SchemaDefinitionProperty<boolean, Todo, mongoose.Document<unknown, {}, Todo, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Todo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Todo>;
