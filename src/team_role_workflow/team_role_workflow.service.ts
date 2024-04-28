import { Injectable, Inject } from '@nestjs/common';
import { TeamRole } from './team_role_workflow.model';

@Injectable()
export class TeamRoleService {
  constructor(
    @Inject('TEAM_ROLE_REPOSITORY') private teamRoleRepository: typeof TeamRole,
  ) {}

  async createTeamRole(createTeamRoleDto: any): Promise<TeamRole> {
    return this.teamRoleRepository.create<TeamRole>(createTeamRoleDto);
  }

  async findAllTeamRole(): Promise<TeamRole[]> {
    return this.teamRoleRepository.findAll<TeamRole>();
  }

  async findOneTeamRole(
    team_id: number,
    role_id: number,
  ): Promise<TeamRole []> {
    return this.teamRoleRepository.findAll<TeamRole>({
      where: { team_id, role_id },
    });
  }

  async updateTeamRole(
    team_id: number,
    role_id: number,
    updateData: Partial<TeamRole>,
  ): Promise<void> {
    await this.teamRoleRepository.update(updateData, {
      where: { team_id, role_id },
    });
  }

  async updateAccessTeamRole(
    team_id: number
  ): Promise<void> {
    await this.teamRoleRepository.update({ isAuthor: false }, {
      where: { team_id, isAuthor: true },
    });
  }

  async deleteTeamRole(team_id: number, role_id: number): Promise<void> {
    await this.teamRoleRepository.destroy({ where: { team_id, role_id } });
    
  }

  async deleteWorkflow(id: number): Promise<any> {
    await this.teamRoleRepository.destroy({ where: { id } });
    return {message: 'deleted'}
  }

  // async deleteTeamRoleByRoleId(role_id: number): Promise<void> {
  //   await this.teamRoleRepository.destroy({ where: { role_id } });
  // }

  async findAllByAccess(access: string): Promise<TeamRole[]> {
    const teamRoles = await this.teamRoleRepository.findAll({
      where: { access },
    });
    return teamRoles;
  }
  async findAllByTeamId(team_id: number): Promise<TeamRole[]> {
    const obj = await this.teamRoleRepository.findAll({
      where: { team_id },
    });
    return obj;
  }

  async findAllByRoleId(role_id: number): Promise<TeamRole[]> {
    const obj = await this.teamRoleRepository.findAll({
      where: { role_id },
    });
    return obj;
  }
}
