import { Injectable, Inject } from '@nestjs/common';
import { Team } from './team.model';
import { Role } from '../role/role.model';
import { Pdf } from '../pdf/pdf.model';
import { Department } from '../department/department.model';
import { Workflow } from '../workflow/workflow.model';
// import { Employee } from '../employee/employee.model';

@Injectable()
export class TeamService {
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: typeof Team,
  ) {}

  async create(createTeamDto: any): Promise<Team> {
    return this.teamRepository.create<Team>(createTeamDto);
  }

  async findAllTeam(): Promise<any[]> {
    return this.teamRepository.findAll<any>();
  }


  async findAllTeamByDeptId(dept_id: number): Promise<any[]> {
    return this.teamRepository.findAll<any>({ where: { dept_id } });
  }

  async getPdfByTeamId(teamId: number): Promise<Pdf[]> {
    const team = await this.teamRepository.findByPk(teamId, {
      include: [{
        model: Pdf,
        attributes: ['id', 'pdf_name'],
        through: { attributes: [] }, // define join table attributes
      }],
    });
    return team ? team.pdfs : [];
  }

  async findOne(id: number): Promise<any> {
    return this.teamRepository.findOne<any>({ where: { id },include: [{model:Role},{model: Workflow}, {model: Department}] });
  }
  async updateTeam(id: string, updateData: Partial<any>): Promise<void> {
    await this.teamRepository.update(updateData, { where: { id } });
  }

  async deleteTeam(id: string): Promise<void> {
    await this.teamRepository.destroy({ where: { id } });
  }

  async findOneById(id: number): Promise<Team | null>{
    return this.teamRepository.findOne<Team>({ where:{ id } });
  }

  // async findEmployeeByTeamId(id: number): Promise<Employee[]>{
  //   const x = this.teamRepository.findAll<Employee>({ where:{ id }, include: [ { model: Role, include:  [{ model: Employee }] } ] });
  //   return x.roles.flatMap((role) => role.employees)
  // }



}  