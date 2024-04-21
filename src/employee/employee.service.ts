import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './employee.model';
import { IEmployee } from './employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
  ) {}
  async findActiveEmployee(): Promise<Employee[]> {
    return this.employeeModel.findAll({ where: { active: true } });
  }
}
