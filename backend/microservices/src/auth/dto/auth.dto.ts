import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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


