import { Injectable, Inject } from '@nestjs/common';
import { TeamRole } from './team_role_workflow.model';
import { Op } from 'sequelize';

@Injectable()
export class TeamRoleService {
  constructor(
    @Inject('TEAM_ROLE_REPOSITORY') private teamRoleRepository: typeof TeamRole,
  ) {}

  async createTeamRole(createTeamRoleDto: any): Promise<TeamRole> {
    return await this.teamRoleRepository.create<TeamRole>(createTeamRoleDto);
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

  // async findAllByAccess(access: string): Promise<TeamRole[]> {
  //   const teamRoles = await this.teamRoleRepository.findAll({
  //     where: { access },
  //   });
  //   return teamRoles;
  // }
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

//   async getSequence(team_id: number, role_id: number): Promise<any> {
//     const sequence = await this.teamRoleRepository.findOne({ where: { team_id, role_id }, attributes: ['sequence'], raw: true });
//     const check_next_sequence = await this.teamRoleRepository.findOne({ where: { team_id, sequence: sequence.sequence + 1 }, attributes: ['sequence', 'role_id'	, 'team_id'	], raw: true });
//     if(check_next_sequence){
//       console.log('hit')
//     }
//     return check_next_sequence; 
//     // return sequence;
// }

// async getPrevSequence(team_id: number, role_id: number): Promise<any> {
//   const sequence = await this.teamRoleRepository.findOne({ where: { team_id, role_id }, attributes: ['sequence'], raw: true });
//   const check_next_sequence = await this.teamRoleRepository.findOne({ where: { team_id, sequence: sequence.sequence - 1 }, attributes: ['sequence', 'role_id'	, 'team_id'	], raw: true });
//   if(check_next_sequence){
//     console.log('hit')
//   }
//   return check_next_sequence; 
// }
}
