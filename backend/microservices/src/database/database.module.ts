import { Module, Global } from '@nestjs/common';
import { UserDatabaseModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [UserDatabaseModule],
  exports: [UserDatabaseModule],
})
export class DatabaseModule {}
