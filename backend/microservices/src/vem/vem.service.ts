import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { request } from 'src/request/request.service';
import { Exception } from 'src/error/error.service';
import { VemAnalyzeResponseDto } from './dto/vem.dto';
import { AxiosResponse } from 'axios';
import { AnalysisService } from 'src/analysis/analysis.service';
import { AnalysisDocument } from 'src/database/schemas/analysis.schema';

@Injectable()
export class VemService {
  constructor(private readonly analysisService: AnalysisService) {}
  async analyze(
    file: Express.Multer.File,
    emailId: string,
  ): Promise<AnalysisDocument> {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path), {
        filename: file.filename,
      });
      const res: AxiosResponse<VemAnalyzeResponseDto> = await request(
        process.env.PYTHON_API_BASE_URL,
      ).post('/vemAnalysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...formData.getHeaders(),
        },
      });
      return this.analysisService.saveAnalysis(res.data.analysis, emailId);
    } catch (error) {
      throw new Exception(
        error?.response?.message,
        error?.response?.statusCode,
      );
    }
  }
}
