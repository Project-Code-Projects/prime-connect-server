export interface IDistributeWorkOrder {
  id?: number;
  work_order_id: number;
  field_id: number[];
  assigned_to: number;
  estimated_time: number;
  status: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
