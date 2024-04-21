export interface IFieldData {
  id: number;
  work_order_id: number;
  field_id: number;
  value: string;
  status: string;
  estimated_time: number;
  start_time: Date;
  err_type: string;
  err_comment: string;
  sequence: number;
  page: number;
  assigned_to: number;
}
