import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VemAnalyzeResponseDto } from './dto/vem.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs-extra';
import { VemService } from './vem.service';

@Controller('vem')
export class VemController {
  constructor(private readonly vemService: VemService) {}

  @Post('/analyze')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Temporary storage
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async analyzeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { emailId: string },
  ): Promise<VemAnalyzeResponseDto> {
    if (!file) {
      return { success: false, message: 'No file uploaded!' };
    }

    try {
      const result = await this.vemService.analyze(file, body.emailId);
      return {
        success: true,
        message: 'Emotion Analyzed successfully!',
        analysis: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Cannot Analyze at the moment. Please try again later!',
      };
    } finally {
      await fs.remove(file.path);
    }
  }
}
