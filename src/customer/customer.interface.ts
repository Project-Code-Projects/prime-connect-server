export interface ICustomer {
  name: string;
  nid_no: number;
  phone: number;
  address: string;
  email: string;
  tin_no: string;
  birth_certificate_no: number;
}

export interface ICustomerAccountNo {
  acc_id: number | null;
  customer_id: number;
  acc_type: string;
  status: string;
  current_state?: string;
}
