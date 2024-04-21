import { Injectable, Inject } from '@nestjs/common';
import { employee_login } from './employee_login.model';
import { employee } from '../employee/employee.model';

@Injectable()
export class EmployeeLoginService {
  constructor(
    @Inject('EMPLOYEE_LOGIN_REPOSITORY')
    private loginRepository: typeof employee_login,
  ) {}

  async createEmployee(createEmployeeDto: any): Promise<employee_login> {
    return this.loginRepository.create<employee_login>(createEmployeeDto);
  }  

  async findAllEmployee(): Promise<employee_login[]> {
    return this.loginRepository.findAll<employee_login>();
  }
  
  async findByEmail(email:string): Promise<any> {
    return this.loginRepository.findOne<employee_login>( { where: {email}, include: [{model:employee}] } );
  }

  async updateEmployeeInfo(id: string, updateData: Partial<any>): Promise<void> {
    await this.loginRepository.update(updateData, { where: { id } });
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.loginRepository.destroy({ where: { id } });
  }


}  