import { databaseProviders } from './../database/database.providers';
import { Injectable, Inject } from '@nestjs/common';
import { IDocuBucket } from './docu-bucket.interface';
import { DocuBucket } from './docu-bucket.model';


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

  async getImages(acc_id: number, customer_id: number, pdf_id: number): Promise<any> {
    try {
      return await this.docBucketModel.findOne({where: {acc_id: acc_id, customer_id: customer_id, pdf_id: pdf_id}, attributes: ['pdf_values'], raw: true});
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getImg(customer_id: number, acc_id: number, pdf_id: number, page: number){
    const images = await this.docBucketModel.findOne({where: {acc_id: acc_id, customer_id: customer_id, pdf_id: pdf_id}, attributes: ['pdf_values'], raw: true});
    return images.pdf_values[page - 1];
  }
}
