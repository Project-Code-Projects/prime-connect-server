import { Injectable, Inject } from '@nestjs/common';
import { IFieldTable } from './field-table.interface';
import FieldTable from './field-table.model';
import { group } from 'console';

@Injectable()
export class FieldTableService {
  constructor() {}
  async addFieldTable(fieldTable: IFieldTable): Promise<any> {
    console.log("field");
    return await FieldTable.create(fieldTable);
  }

  async findAllFieldTable(): Promise<any> {
    return await FieldTable.findAll();
  }

  async findAllFieldById(id: any): Promise<any> {
    
    const field_data = []
    for(let i=0; i<id.length; i++){
      // console.log("id", id[i]);
      const field_value = await FieldTable.findOne({ where : {id: id[i].field_id}, attributes: ['field_name', 'id'], raw: true });
      field_value['uuid'] = id[i].id;
      field_value['work_order_id'] = id[i].work_order_id;
      field_data[i] = field_value;
    }
   
    const control_names = field_data.map((field)=> [field.field_name]);
    const control_name2 = field_data.map((field)=> [{value: field.field_name, id: field.uuid, work_order_id: field.work_order_id}]);
    console.log('control name2', control_name2);
    // console.log('control names', control_names);
    // console.log('fiedl data', field_data);
    return {fieldData: field_data, controlNames: control_name2};
  }

  async findOneById(id: number): Promise<any> {
    return await FieldTable.findByPk(id);
  }

  async findFieldById(id: number): Promise<any> {
    return await FieldTable.findByPk(id);
  }
  async fieldNameForAuthorizer(id: number[]): Promise<any> { 
    return await FieldTable.findAll({ where : {id: id}, attributes: ['field_name']});
  }

  async deleteFieldTable(id: number): Promise<any> {
    return await FieldTable.destroy({ where: { id } });
  }
  
}
