import { Injectable, Inject } from '@nestjs/common';
import { role } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof role,
  ) {}

  async createRole(createRoleDto: any): Promise<role> {
    return this.roleRepository.create<role>(createRoleDto);
  }

  async findAllRole(): Promise<any[]> {
    return this.roleRepository.findAll<any>();
  }
  async findAllRoleByTeamId(id: number): Promise<role[]> {
     return this.roleRepository.findAll<role>({ where: { team_id: id },attributes: ['id', 'name'] });
  }

  async updateRole(id: string, updateData: Partial<any>): Promise<void> {
    await this.roleRepository.update(updateData, { where: { id } });
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.destroy({ where: { id } });
  }

}  