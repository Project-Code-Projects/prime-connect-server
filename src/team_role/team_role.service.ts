import { Injectable, Inject } from "@nestjs/common";
import { TeamRole } from "./team_role.model";

@Injectable()
export class TeamRoleService {
    constructor( @Inject('TEAM_ROLE_REPOSITORY') private teamRoleRepository: typeof TeamRole) {}

    async createTeamRole(createTeamRoleDto: any): Promise<TeamRole> {
        return this.teamRoleRepository.create<TeamRole>(createTeamRoleDto);
    }

    async findAllTeamRole(): Promise<TeamRole[]> {
        return this.teamRoleRepository.findAll<TeamRole>();
    }

    async findOneTeamRole(team_id: number, role_id:number): Promise<TeamRole | null> {
        return this.teamRoleRepository.findOne<TeamRole>({ where: { team_id, role_id } });
    }

    async updateTeamRole(team_id: number, role_id:number, updateData: Partial<TeamRole>): Promise<void> {
        await this.teamRoleRepository.update(updateData, { where: { team_id , role_id} });
    }

    async deleteTeamRole(team_id: number, role_id:number): Promise<void> {
        await this.teamRoleRepository.destroy({ where: { team_id , role_id} });
    }
}