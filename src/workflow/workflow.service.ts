import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { Workflow } from './workflow.model';

@Injectable()
export class WorkflowService {
  constructor(
    @Inject('WORKFLOW_REPOSITORY') private workflowRepository: typeof Workflow,
  ) {}

  // async createWorkflow(createWorkflowDto: any): Promise<Workflow> {
  //   return this.workflowRepository.create<Workflow>(createWorkflowDto);
  // }

  async createWorkflow(createTeamRoleDto: any): Promise<Workflow> {
    const { sequence, team_id, isAuthor } = createTeamRoleDto;

    if (isAuthor) {
      await this.workflowRepository.update(
        { isAuthor: false },
        {
          where: { team_id, isAuthor: true },
        },
      );
    }

    await this.workflowRepository.increment(
      { sequence: 1 },
      { where: { sequence: { [Op.gte]: sequence }, team_id } },
    );
    return await this.workflowRepository.create<Workflow>(createTeamRoleDto);
  }

  async findAllWorkflow(): Promise<Workflow[]> {
    return this.workflowRepository.findAll<Workflow>();
  }

  async findOneWorkflow(id: number): Promise<Workflow | null> {
    return this.workflowRepository.findOne<Workflow>({ where: { id } });
  }

  async updateWorkflow(
    id: number,
    updateData: Partial<Workflow>,
  ): Promise<void> {
    await this.workflowRepository.update(updateData, { where: { id } });
  }

  async deleteWorkflow(team_id: number, role_id: number): Promise<any> {
    const workflow = await this.workflowRepository.findOne({
      where: { team_id, role_id },
    });
    await this.workflowRepository.destroy({ where: { team_id, role_id } });
    if (workflow)
      await this.workflowRepository.decrement(
        { sequence: 1 },
        { where: { sequence: { [Op.gte]: workflow.sequence }, team_id } },
      );
    return workflow;
  }

  async findAllByAccess(access: string): Promise<Workflow[]> {
    const workflows = await this.workflowRepository.findAll({
      where: { access },
    });
    return workflows;
  }
  async findAllByRoleId(role_id: number): Promise<Workflow | null> {
    const workflow = await this.workflowRepository.findOne({
      where: { role_id },
    });
    return workflow;
  }
  async getSequence(team_id: number, role_id: number): Promise<any> {
    const sequence = await this.workflowRepository.findOne({
      where: { team_id, role_id },
      attributes: ['sequence'],
      raw: true,
    });
    const check_next_sequence = await this.workflowRepository.findOne({
      where: { team_id, sequence: sequence.sequence + 1 },
      attributes: ['sequence', 'role_id', 'team_id'],
      raw: true,
    });
    if (check_next_sequence) {
      console.log('hit');
    }
    return check_next_sequence;
    // return sequence;
  }

  async getPrevSequence(team_id: number, role_id: number): Promise<any> {
    const sequence = await this.workflowRepository.findOne({
      where: { team_id, role_id },
      attributes: ['sequence'],
      raw: true,
    });
    const check_next_sequence = await this.workflowRepository.findOne({
      where: { team_id, sequence: sequence.sequence - 1 },
      attributes: ['sequence', 'role_id', 'team_id'],
      raw: true,
    });
    if (check_next_sequence) {
      console.log('hit');
    }
    return check_next_sequence;
  }

  async findAllByTeamId(team_id: number): Promise<Workflow[]> {
    console.log('team_id', team_id);
    const obj = await this.workflowRepository.findAll({
      where: { team_id },
    });
    console.log(obj);
    return obj;
  }

  async findOneByTeamRoleId(
    team_id: number,
    role_id: number,
  ): Promise<Workflow | null> {
    return await this.workflowRepository.findOne({
      where: { team_id, role_id },
    });
  }

  async getFirstSequenceByTeamId(team_id: number): Promise<any> {
    const sequence = await this.workflowRepository.findAll({
      where: { team_id: team_id },
      order: [['sequence', 'ASC']],
      limit: 1,
    });
    return sequence[0];
  }

  async getRoleIdByTeamIdAndAccess(
    team_id: number,
    access: string,
  ): Promise<any> {
    const roleId = await this.workflowRepository.findOne({
      where: { team_id, access },
      attributes: ['role_id'],
      raw: true,
    });
    return roleId;
  }
}
