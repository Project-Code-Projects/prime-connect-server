import { TeamRole } from './team_role.model';

export const teamRoleProvider = 
{
  provide: 'TEAM_ROLE_REPOSITORY',
  useValue: TeamRole,
}