import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sln_jwt_2026_!@#_!@#',
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { 
      _id: user._id, 
      email: user.email, 
      role: user.role,
      phone: user.phone
    };
  }
}
