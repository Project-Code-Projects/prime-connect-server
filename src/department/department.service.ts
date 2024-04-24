import { Injectable, Inject } from '@nestjs/common';
import { Department } from './department.model';
import { IDepartment } from './department.interface';

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

  async deleteDepartment(id: string): Promise<void> {
    await this.departmentRepository.destroy({ where: { id } });
  }

  async updateDepartment(id: string, updateData: Partial<IDepartment>): Promise<void> {
    await this.departmentRepository.update(updateData, { where: { id } });
  }
}