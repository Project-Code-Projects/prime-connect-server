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

  async updateFieldDataByFieldId(value: string, order_id: number, field_id: number): Promise<void> {
    await FieldData.update({ value: value}, { where: { work_order_id: order_id, field_id: field_id } });
  }

  async getFieldDataById(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } });
  }

  async findAllFieldByWorkOrderid(order_id: number, assigned_to: number): Promise<any> {
    return await FieldData.findAll({where: {work_order_id: order_id, assigned_to: assigned_to}});
  }

 
}
