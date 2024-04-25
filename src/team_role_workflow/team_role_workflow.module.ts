import { Module } from '@nestjs/common';
import { TeamRoleService } from './team_role_workflow.service';
import { TeamRoleController } from './team_role_workflow.controller';
import { teamRoleProvider } from './team_role_workflow.provider';

@Module({
    controllers: [TeamRoleController],
    providers: [TeamRoleService, teamRoleProvider],
    exports: [TeamRoleService],
})

export class TeamRoleModule { }