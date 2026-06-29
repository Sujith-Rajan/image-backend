import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, {
    message: 'Name must be at least 3 characters long',
  })
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Name can contain only letters and spaces',
  })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Please provide a valid email address',
  })
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 10, {
    message: 'Phone number must be exactly 10 digits',
  })
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Phone number must start with 6, 7, 8, or 9 and be 10 digits',
  })
  phone?: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    },
  )
  password: string;
}
