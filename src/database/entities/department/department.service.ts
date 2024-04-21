import { Injectable, Inject } from '@nestjs/common';
import { department } from './department.model';
import { IDepartment } from '../../interfaces/department.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: typeof department,
  ) {}

  async create(createDepartmentDto: IDepartment): Promise<department> {
    return this.departmentRepository.create<department>(createDepartmentDto);
  }
  async findAll(): Promise<department[]> {
    return this.departmentRepository.findAll<department>();
  }

  async deleteDepartment(id: string): Promise<void> {
    await this.departmentRepository.destroy({ where: { id } });
  }

  async updateDepartment(id: string, updateData: Partial<IDepartment>): Promise<void> {
    await this.departmentRepository.update(updateData, { where: { id } });
  }
}