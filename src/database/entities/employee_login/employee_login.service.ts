import { Injectable, Inject } from '@nestjs/common';
import { EmployeeLogin } from './employee_login.model';
import { Employee } from '../employee/employee.model';

@Injectable()
export class EmployeeLoginService {
  constructor(
    @Inject('EMPLOYEE_LOGIN_REPOSITORY')
    private loginRepository: typeof EmployeeLogin,
  ) {}

  async createEmployee(createEmployeeDto: any): Promise<EmployeeLogin> {
    return this.loginRepository.create<EmployeeLogin>(createEmployeeDto);
  }  

  async findAllEmployee(): Promise<EmployeeLogin[]> {
    return this.loginRepository.findAll<EmployeeLogin>();
  }
  
  async findByEmail(email:string): Promise<any> {
    return this.loginRepository.findOne<EmployeeLogin>( { where: {email}, include: [{model:Employee}] } );
  }

  async updateEmployeeInfo(id: string, updateData: Partial<any>): Promise<void> {
    await this.loginRepository.update(updateData, { where: { id } });
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.loginRepository.destroy({ where: { id } });
  }


}  