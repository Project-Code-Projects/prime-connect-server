import { Injectable, Inject } from '@nestjs/common';
import { IFieldData } from './field-data.interface';
import { FieldData } from './field-data.model';
import { FieldTableService } from 'src/field-table/field-table.service';
import { Op } from 'sequelize';

@Injectable()
export class FieldDataService {
  constructor( private fieldTableService: FieldTableService) {}
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

  async findOneFieldData(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } , attributes: ['field_id']});
  }
  async getFieldDataById(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } });
  }

  async findAllFieldByWorkOrderid(order_id: number, assigned_to: number): Promise<any> {
   const data = await FieldData.findAll({where: {work_order_id: order_id, assigned_to: assigned_to}});
  
   const fields = data.map((field) => field.field_id);
   console.log('field data check',fields);
  //  console.log(fields);
   return await this.fieldTableService.findAllFieldById(fields);
  }

  async getFieldValues(order_id: number): Promise<any> {
    try {
      // console.log("order id: ",order_id);
      const values =  await this.fieldDataModel.findAll({ where: { work_order_id: order_id }, attributes: ['value', 'field_id'	] });
      const value_obj = {};
      values.forEach((element: any)=>{
        value_obj[element.field_id] = element.value
      })
      return value_obj;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fieldIdAndValuesAuthorized(field_id: number []): Promise<any> {

    return await this.fieldDataModel.findAll({
      where: { id: {
        [Op.in]: field_id
      }},attributes: ['value', 'field_id'], raw: true
    })

  }
  

}
