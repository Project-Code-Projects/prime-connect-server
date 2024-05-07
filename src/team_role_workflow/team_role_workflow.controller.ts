import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { TeamRoleService } from './team_role_workflow.service';
import { TeamRole } from './team_role_workflow.model';
@Controller('/workflow')
export class TeamRoleController {
    constructor( private teamRoleService: TeamRoleService) {}

    @Post()
    async create(@Body() createWorkflowDto: TeamRole) {
        return this.teamRoleService.createTeamRole(createWorkflowDto);
    }

    @Get()
     async findAll(): Promise<TeamRole[]> {
         return this.teamRoleService.findAllTeamRole();
     }

     @Get(':team_id/:role_id')
      async findOne(@Param('team_id') team_id: number, @Param('role_id') role_id: number): Promise<TeamRole[]> {
          return this.teamRoleService.findOneTeamRole(team_id, role_id);
      }

      @Put(':team_id/:role_id')
      async update(@Param('team_id') team_id: number, @Param('role_id') role_id: number, @Body() updateWorkflowDto: TeamRole) {
          return this.teamRoleService.updateTeamRole(team_id, role_id, updateWorkflowDto);
      }

      @Delete('/:team_id/:role_id')
      async delete(@Param('team_id') team_id: number, @Param('role_id') role_id: number) {
          return this.teamRoleService.deleteTeamRole(team_id, role_id);
      }

      @Delete('/:id')
      async deleteWorkflow(@Param('id') id: number) {
          return this.teamRoleService.deleteWorkflow(id);
      }

      @Get('/team/:team_id')
      async findAllByTeamId(@Param('team_id') team_id: number): Promise<TeamRole[]> {
          return this.teamRoleService.findAllByTeamId(team_id);
      }

      @Get('/role/:role_id')
      async findAllByRoleId(@Param('role_id') role_id: number): Promise<TeamRole[]> {
          return this.teamRoleService.findAllByRoleId(role_id);
      }

      @Get('sequence/:team_id/:role_id')
      async sequence(@Param('team_id') team_id: number, @Param('role_id') role_id: number): Promise<any> {
        return await this.teamRoleService.getSequence(team_id, role_id);
      }
}

