import { Role } from './role.model';

export const roleProvider = 
{
  provide: 'ROLE_REPOSITORY',
  useValue: Role,
}