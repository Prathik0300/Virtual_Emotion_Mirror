import { Module, Global } from '@nestjs/common';
import { UserDatabaseModule } from './modules/user/user.database.module';
import { AnalysisDatabaseModule } from './modules/analysis/analysis.database.module';

@Global()
@Module({
  imports: [UserDatabaseModule, AnalysisDatabaseModule],
  exports: [UserDatabaseModule, AnalysisDatabaseModule],
})
export class DatabaseModule {}
