import { TeamField } from './team_field.model';

export const teamFieldProvider = {
  provide: 'TEAM_FIELD_REPOSITORY',
  useValue: TeamField,
};
