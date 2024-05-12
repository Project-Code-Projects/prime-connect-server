export interface IMainWorkOrder {
  id?: number;
  acc_id: number | null;
  customer_id: number;
  acc_type: string;
  team_id: number;
  status: string;
  assigned_to: number;
  start_time: Date;
  isAssigned: boolean;
  checked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
