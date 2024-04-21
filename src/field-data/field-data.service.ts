import { Injectable, Inject } from '@nestjs/common';
import { IFieldData } from './field-data.interface';
import { FieldData } from './field-data.model';

@Injectable()
export class FieldDataService {
  constructor() {}
  async findAllFieldData(): Promise<any> {
    return await FieldData.findAll();
  }
}
