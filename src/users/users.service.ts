import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(createUserDto: CreateUserDto, adminUser: any) {
    const { email, password, name, phone } = createUserDto;

    const existingUser = await this.userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    if (phone) {
      const existingPhone = await this.userModel.findOne({ phone });
      if (existingPhone) {
        throw new BadRequestException('Phone number is already registered');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      isEmailVerified: false,
      role: 'user',
      createdBy: adminUser._id, // Save the admin ID
    });

    const savedUser = await newUser.save();

    const userObject = savedUser.toObject({
      versionKey: false,
      transform: (doc: any, ret: Record<string, any>) => {
        delete ret.password;
        return ret;
      },
    });

    return userObject;
  }

  async getUsers(page: number = 1, limit: number = 10, user: any) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find({
          $or: [
            { createdBy: user._id },
            { _id: user._id },
          ],
        })
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),

      this.userModel.countDocuments({
        $or: [
          { createdBy: user._id },
          { _id: user._id },
        ],
      }),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }



  async getAllUsers(
    page = 1,
    limit = 10,
    user: any,
  ) {
    const skip = (page - 1) * limit;

    const currentUser = await this.userModel
      .findById(user._id)
      .select('createdBy')
      .lean();

    const ownerId =
      currentUser?.createdBy || user._id;

    const filter = {
      $or: [
        { createdBy: ownerId },
        { _id: ownerId },
      ],
    };

    const [users, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),

      this.userModel
        .countDocuments(filter)
        .exec(),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


}
