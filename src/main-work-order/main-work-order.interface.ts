export interface IMainWorkOrder {
  id?: number;
  acc_id: number | null;
  status: string;
  assigned_to: number;
  start_time: Date;
  checked: boolean;
  work_order_type: string;
}
