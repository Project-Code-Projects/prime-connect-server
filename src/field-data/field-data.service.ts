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

  async updateFieldDataByFieldId(value: string, order_id: number, field_id: number, time: number): Promise<void> {
    console.log('update check')
    await FieldData.update({ value: value, time_interval: time}, { where: { work_order_id: order_id, field_id: field_id } });
  }

  async findOneFieldData(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } , attributes: ['field_id']});
  }
  async getFieldDataById(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } });
  }

  async findAllFieldByWorkOrderid(order_id: number, assigned_to: number): Promise<any> {
   const data = await FieldData.findAll({where: {work_order_id: order_id, assigned_to: assigned_to}});
    console.log('data',data)
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


  // async postErrorFields(fields: number[], comments: any[]): Promise<any> {
  //   const updatedFields = [];
    
  //   for (let i = 0; i < fields.length; i++) {
  //     const fieldId = fields[i];
  //     const comment = comments[i] || ''; // To avoid out-of-bound access in case comments array is shorter
    
  //     const updatedField = await this.fieldDataModel.update(
       
  //       {
  //         err_type: "Error",
  //         err_comment: comment
  //       }
  //      ,{ where: { id: fieldId }});
      
  //     updatedFields.push(updatedField);
  //   }
    
  //   return updatedFields;
  // }

  async getErrorFields(list: number[]): Promise<any>{
    console.log('dog hit')
    const err_list = [];
    for(let i = 0; i < list.length; i++){
      const fields = await this.fieldDataModel.findOne({ where: { id: list[i] }, attributes: ['err_comment'], raw: true });
      err_list[i] = fields['err_comment'] !== '' ? fields['err_comment'] : null;
    }
    err_list[err_list.length] = null;
    return err_list;
  }
  

  }
  


