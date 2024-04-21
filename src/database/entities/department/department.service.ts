import { Injectable, Inject } from '@nestjs/common';
import { Department } from './department.model';
import { IDepartment } from '../../interfaces/department.interface';

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

  async deleteDepartment(id: string): Promise<void> {
    await this.departmentRepository.destroy({ where: { id } });
  }

  async updateDepartment(id: string, updateData: Partial<IDepartment>): Promise<void> {
    await this.departmentRepository.update(updateData, { where: { id } });
  }
}