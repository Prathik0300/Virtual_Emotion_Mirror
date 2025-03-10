import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Analysis, AnalysisSchema } from 'src/database/schemas/analysis.schema';
import { UtilsService } from 'src/utils/utils.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService, MongooseModule],
})
export class AnalysisModule {}
