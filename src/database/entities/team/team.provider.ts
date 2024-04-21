import { Team } from './team.model';

export const teamProvider = 
{
  provide: 'TEAM_REPOSITORY',
  useValue: Team,
}