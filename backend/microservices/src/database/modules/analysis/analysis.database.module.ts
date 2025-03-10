import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://prathik0300:B2veh06M1MYqCmoO@cluster0.z38gl.mongodb.net/vem_local?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],

  exports: [MongooseModule],
})
export class AnalysisDatabaseModule {}
