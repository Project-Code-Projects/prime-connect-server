import { Injectable, Inject } from '@nestjs/common';
import { IDocuBucket } from './docu-bucket.interface';
import { DocuBucket } from './docu-bucket.model';
import { DocubucketModule } from './docu-bucket.module';

@Injectable()
export class DocubucketService {
  constructor(
    @Inject('DOCU_BUCKET_REPOSITORY')
    private readonly docBucketModel: typeof DocuBucket,
  ) {}

  async postPdf(pdf: IDocuBucket): Promise<any> {
    return await this.docBucketModel.create(pdf);
  }
  async findAllDocs(): Promise<any> {
    return await this.docBucketModel.findAll();
  }
}
