export interface IWorkFlowAssignLog {
  id?: number;
  work_order_id: number;
  field_data_id: number | null;
  assigned_to: number;
}
