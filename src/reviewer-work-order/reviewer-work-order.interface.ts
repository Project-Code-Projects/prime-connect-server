export interface IReviewerWorkOrder {
  id?: number;
  acc_id: number | null;
  customer_id: number;
  acc_type: string;
  status: string;
  assigned_to: number;
  start_time: Date;
  isAssigned: boolean;
}
