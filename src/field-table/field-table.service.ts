import { Injectable, Inject } from '@nestjs/common';
import { IFieldTable } from './field-table.interface';
import FieldTable from './field-table.model';

@Injectable()
export class FieldTableService {
  constructor() {}
  async addFieldTable(fieldTable: IFieldTable): Promise<any> {
    return await FieldTable.create(fieldTable);
  }

  async findAllFieldTable(): Promise<any> {
    return await FieldTable.findAll();
  }
}
