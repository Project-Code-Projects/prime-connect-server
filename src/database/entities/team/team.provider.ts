import { team } from './team.model';

export const teamProvider = 
{
  provide: 'TEAM_REPOSITORY',
  useValue: team,
}