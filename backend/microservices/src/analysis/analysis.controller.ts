import { Controller, Get, Param } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisServices: AnalysisService) {}

  @Get(':emailId')
  async getUserAnalysis(@Param('emailId') emailId: string) {
    console.log('PARAMMM : ', emailId);
    return await this.analysisServices.getUserAnalysis(emailId);
  }
}
