import { Module } from '@nestjs/common';
import { DocubucketService } from './docu-bucket.service';
import { DocubucketController } from './docu-bucket.controller';
import { DatabaseModule } from 'src/database/database.module';
import { docuBucketProviders } from './docu-bucket.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DocubucketController],
  providers: [DocubucketService, ...docuBucketProviders],
})
export class DocubucketModule {}
