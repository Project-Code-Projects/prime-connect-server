import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: typeof Employee
  ) {}

  async createEmployee(createEmployeeDto: any): Promise<Employee> {
    return this.employeeRepository.create<Employee>(createEmployeeDto);
  }  

  async findAllEmployee(): Promise<any[]> {
    return this.employeeRepository.findAll<any>();
  }

  async findOne(id: number): Promise<any>{
    return this.employeeRepository.findOne<Employee>({where: { id }})
  }

  async findByEmail(email:string): Promise<any> {
    return this.employeeRepository.findOne<Employee>( { where: {email} } );
  }

  async findAllEmployeeByTeamId(id: number): Promise<any[]> {
    const employees = await this.employeeRepository.findAll<any>({ where: {team_id: id, active:true },attributes: ['id', 'name','email','admin','role_id'], });
    // console.log(employees.map((employee) => employee));
    return employees;
  }

  async updateEmployeeInfo(id: string, updateData: Partial<any>): Promise<any> {
    await this.employeeRepository.update(updateData, { where: { id } });
    return this.employeeRepository.findByPk(id);
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.employeeRepository.destroy({ where: { id } });
  }
}