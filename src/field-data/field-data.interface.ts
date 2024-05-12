export interface IFieldData {
  id?: number;
  work_order_id: number;
  field_id: number;
  value: string | null;
  status: string | null;
  estimated_time: number;
  assigned_time: Date | null;
  err_type: string | null;
  err_comment: string | null;
  sequence: number;
  page: number;
  assigned_to: number | null;
  time_interval: number | null;
  prev_assigned: number[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}
