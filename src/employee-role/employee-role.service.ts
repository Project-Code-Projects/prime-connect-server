import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRole } from './employee-role.model';
import { IEmployeeRole } from './employee-role.interface';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @Inject('EMPLOYEE_ROLE_REPOSITORY')
    private readonly employeeRoleModel: typeof EmployeeRole,
  ) {}
  async getRoles(): Promise<EmployeeRole[]> {
    return this.employeeRoleModel.findAll();
  }
  async getRoleName(id: number): Promise<string> {
    const { name } = await this.employeeRoleModel.findOne({ where: { id } });
    return name;
  }
}
