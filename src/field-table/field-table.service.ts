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
    return await FieldTable.findAll({ where : {id: id}, attributes: ['id', 'field_name' ]});
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
  
}
