import { Injectable, Inject } from '@nestjs/common';
import { TeamField } from './team_field.model';

@Injectable()
export class TeamFieldService {
  constructor(
    @Inject('TEAM_FIELD_REPOSITORY')
    private teamFieldRepository: typeof TeamField,
  ) {}

  async createTeamField(createTeamFieldDto: any): Promise<TeamField> {
    const teamField =
      await this.teamFieldRepository.create<TeamField>(createTeamFieldDto);
    return teamField;
  }

  async findAllTeamField(): Promise<TeamField[]> {
    return this.teamFieldRepository.findAll<TeamField>();
  }

  async findOne(id: number): Promise<TeamField | null> {
    return this.teamFieldRepository.findOne<TeamField>({ where: { id } });
  }

  async updateTeamField(id: string, updateData: Partial<any>): Promise<void> {
    await this.teamFieldRepository.update(updateData, { where: { id } });
  }

  async deleteTeamField(id: string): Promise<void> {
    await this.teamFieldRepository.destroy({ where: { id } });
  }
}
