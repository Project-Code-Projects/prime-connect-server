import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
  Param,
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

  @Get(':acc_id/:customer_id/:pdf_id')
  async getImages(@Param('acc_id') acc_id: number, @Param('customer_id') customer_id: number, @Param('pdf_id') pdf_id: number): Promise<any> {
    return await this.docubucketService.getImages(acc_id, customer_id, pdf_id);
  }
}
