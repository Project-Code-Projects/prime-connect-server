import { CustomerController } from './../customer/customer.controller';
import { Injectable, Inject } from '@nestjs/common';
import { IFieldData } from './field-data.interface';
import { FieldData } from './field-data.model';
import { FieldTableService } from 'src/field-table/field-table.service';
import { Op } from 'sequelize';

@Injectable()
export class FieldDataService {
  constructor(private fieldTableService: FieldTableService) {}
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

  async updateFieldDataByFieldId(value: string, order_id: number, field_id: number, time: number, assigned_to: number): Promise<any> {
    console.log('update check', value, time, order_id, field_id, assigned_to)
    const field_data =  await FieldData.update({ value: value, time_interval: time}, { where: { work_order_id: order_id, id: field_id, assigned_to: assigned_to } });
    return field_data;
  }

  async findOneFieldData(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id }, attributes: ['field_id'] });
  }
  async getFieldDataById(id: number): Promise<FieldData> {
    return await FieldData.findOne({ where: { id } });
  }

  async findAllFieldByWorkOrderid(order_id: number, assigned_to: number): Promise<any> {
    
   const data = await FieldData.findAll({where: {assigned_to: assigned_to, [Op.or]: [{status: null}, {status: ''}]}, attributes: ['id','field_id','work_order_id'], raw: true});
   console.log('dat',data)
   
   return await this.fieldTableService.findAllFieldById(data);
  }

  async getFieldValues(order_id: number): Promise<any> {
    try {
      // console.log("order id: ",order_id);
      const values = await this.fieldDataModel.findAll({
        where: { work_order_id: order_id },
        attributes: ['value', 'field_id'],
      });
      const value_obj = {};
      values.forEach((element: any) => {
        value_obj[element.field_id] = element.value;
      });
      return value_obj;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fieldIdAndValuesAuthorized(field_id: number[]): Promise<any> {
    return await this.fieldDataModel.findAll({
      where: {
        id: {
          [Op.in]: field_id,
        },
      },
      attributes: ['value', 'field_id'],
      raw: true,
    });
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

  async getErrorFields(list: number[]): Promise<any> {

    const err_list = [];
   
      const fields = await this.fieldDataModel.findAll({
        where: { id: list },
        attributes: ['err_comment', 'id', 'field_id'],
        raw: true,
      });
    //   err_list[i] = fields['err_comment'] !== '' ? fields['err_comment'] : null;
    
    // err_list[err_list.length] = null;
    // console.log('err_list: ', err_list);
    // return err_list;
    return fields;
  }
  async findWorkStatusByMonth(month: string = '2024-04') {
    try {
      // console.log('Month:', month);

      const startOfMonth = new Date(month);
      const endOfMonth = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() + 1,
        0,
      );

      const totatlWorkOrders = await FieldData.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      const workOrdersChecked = await FieldData.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          value: {
            [Op.or]: [{ [Op.not]: null }],
          },
        },
      });
      // this.updateValues();

      const workOrdersNotChecked = await FieldData.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          value: null,
        },
      });

      return {
        totatlWorkOrders: totatlWorkOrders,
        workOrdersChecked: workOrdersChecked,
        workOrdersNotChecked: workOrdersNotChecked,
      };
    } catch (error) {
      console.error('Error finding work status by month:', error);
      throw error;
    }
  }
  async updateValues() {
    await this.fieldDataModel.update(
      {
        value: null,
      },
      {
        where: {
          value: {
            [Op.not]: null,
          },
        },
      },
    );
  }
}
