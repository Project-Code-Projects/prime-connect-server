import { Injectable, Inject } from '@nestjs/common';
import { IFieldTable } from './field-table.interface';
import FieldTable from './field-table.model';

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
    console.log('field data check 2',id);
    const field_data =  await FieldTable.findAll({ where : {id: id}, attributes: ['id', 'field_name' ]});
    console.log('field data check 3',field_data);
    return field_data;
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
