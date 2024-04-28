import { Injectable, Inject } from '@nestjs/common';
import { Department } from './department.model';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';
import { IDepartment } from './department.interface';
import { Employee } from '../employee/employee.model';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: typeof Department,
  ) {}

  async create(createDepartmentDto: IDepartment): Promise<Department> {
    return this.departmentRepository.create<Department>(createDepartmentDto);
  }
  async findAll(): Promise<Department[]> {
    return this.departmentRepository.findAll<Department>();
  }

  async findOne(id: number): Promise<any> {
    const dept = this.departmentRepository.findOne<Department>({where:{id}});
    return dept;
  }

  async findEmployeeByDeptId(id: number): Promise<any> {
    const dept = await this.departmentRepository.findOne<Department>({where:{id}, include: [{model: Team, include: [{model: Role, include: [{model: Employee}]}]}]});
    const teams = dept?.teams.filter(team => team.roles.filter(role => role.employees.length > 0));
    const roles = teams?.flatMap((team) => team.roles);
    const employees = roles?.flatMap((role) => role.employees);
    return employees;
  }

  async deleteDepartment(id: string): Promise<void> {
    await this.departmentRepository.destroy({ where: { id } });
  }

  async updateDepartment(id: string, updateData: Partial<IDepartment>): Promise<void> {
    await this.departmentRepository.update(updateData, { where: { id } });
  }
}