import { TeamRole } from './team_role_workflow.model';

export const teamRoleProvider = {
  provide: 'TEAM_ROLE_REPOSITORY',
  useValue: TeamRole,
};
