import { Module } from '@nestjs/common';
import { VemService } from './vem.service';
import { VemController } from './vem.controller';
import { AnalysisModule } from 'src/analysis/analysis.module';

@Module({
  imports: [AnalysisModule],
  controllers: [VemController],
  providers: [VemService],
  exports: [VemService],
})
export class VemModule {}
