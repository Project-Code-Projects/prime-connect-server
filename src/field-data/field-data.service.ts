import { Injectable, Inject } from '@nestjs/common';
import { IFieldData } from './field-data.interface';
import { FieldData } from './field-data.model';

@Injectable()
export class FieldDataService {
  constructor() {}
  @Inject('FIELD_DATA_REPOSITORY')
  private readonly fieldDataModel: typeof FieldData;
  async findAllFieldData(): Promise<any> {
    return await FieldData.findAll();
  }

  async createFieldData(fieldData: IFieldData): Promise<FieldData> {
    return await FieldData.create(fieldData);
  }
  async updateFieldData(id: number, employeeId: number): Promise<void> {
    await FieldData.update({ assigned_to: employeeId }, { where: { id } });
  }
}
