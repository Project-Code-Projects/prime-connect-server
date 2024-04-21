import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { DocubucketService } from './docu-bucket.service';
import { IDocuBucket } from './docu-bucket.interface';
@Controller('docu-bucket')
export class DocubucketController {
  constructor(private readonly docubucketService: DocubucketService) {}

  @Get()
  async findAllDocs(): Promise<any> {
    return await this.docubucketService.findAllDocs();
  }
}
