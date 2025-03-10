import { IsBoolean, IsString } from 'class-validator';

export class VemAnalyzeDto {
  @IsString()
  image: string;
}

export class VemAnalyzeResponseDto {
  success: boolean;
  message: string;
  analysis?: any;
}
