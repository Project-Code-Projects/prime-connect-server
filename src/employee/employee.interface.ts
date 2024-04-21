export interface IEmployee {
  id: number;
  name: string;
  age?: number;
  email: string;
  phone: number;
  active: boolean;
  admin: boolean;
  team_id: number;
  role_id: number;
}
