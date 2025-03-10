import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserSignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  emailId: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  emailId: string;

  @IsNotEmpty()
  password: string;
}

export class UserAuthResponseDto {
  @Expose()
  success: boolean;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  emailId: string;

  @Expose()
  userId: string;

  @Exclude()
  password: string;
}
