import { Injectable, Inject } from '@nestjs/common';
import { team } from './team.model';
import { role } from '../role/role.model';
import { employee } from '../employee/employee.model';

@Injectable()
export class TeamService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: typeof team,
  ) {}

  async create(createTeamDto: any): Promise<team> {
    return this.teamRepository.create<team>(createTeamDto);
  }

  async findAllTeam(): Promise<any[]> {
    return this.teamRepository.findAll<any>();
  }

  async updateTeam(id: string, updateData: Partial<any>): Promise<void> {
    await this.teamRepository.update(updateData, { where: { id } });
  }

  async deleteTeam(id: string): Promise<void> {
    await this.teamRepository.destroy({ where: { id } });
  }

  async findOneById(id: number): Promise<team | null>{
    console.log("Service id: "+id);
    return this.teamRepository.findOne<team>({ where:{ id } });
  }

  // async findEmployeeByTeamId(id: number): Promise<employee[]>{
  //   const x = this.teamRepository.findAll<employee>({ where:{ id }, include: [ { model: role, include:  [{ model: employee }] } ] });
  //   return x.roles.flatMap((role) => role.employees)
  // }

}  