export interface IFieldData {
  id: number;
  work_order_id: number;
  field_id: number;
  value: string | null;
  status: string | null;
  estimated_time: number;
  start_time: Date | null;
  err_type: string | null;
  err_comment: string | null;
  sequence: number;
  page: number;
  assigned_to: number | null;
}
