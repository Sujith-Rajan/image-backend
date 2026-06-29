import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto) {
    const { email, password, name, phone } = signupDto;
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
      role: 'admin'
    });

    const savedUser = await newUser.save();

    const userObject = savedUser.toObject({
      versionKey: false,
      transform: (doc: any, ret: Record<string, any>) => {
        delete ret.password;
        return ret;
      },
    });

    return { user: userObject, message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto, res: any) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email: email?.toLowerCase() });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password && user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }
    }

    // if (!user.isEmailVerified) {
    //   throw new BadRequestException('User not verified');
    // }

    const payload = {
      sub: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    // store refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const userObject = user.toObject({
      versionKey: false,
      transform: (doc: any, ret: Record<string, any>) => {
        delete ret.password;
        return ret;
      },
    });

    return { user: userObject, accessToken };
  }

  async refreshToken(req: any) {

    const token = req.cookies.refreshToken;

    if (!token) {
      throw new UnauthorizedException('No refresh token');
    }

    try {

      const decoded = this.jwtService.verify(token);

      const user = await this.userModel.findById(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = {
        sub: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '15m',
      });

      return {
        accessToken,
        user,
      };

    } catch (err) {

      throw new UnauthorizedException(
        'Refresh token expired',
      );
    }
  }
}
