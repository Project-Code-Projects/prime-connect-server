import { Customer } from './customer.model';

import { Pdf } from 'src/pdf/pdf.model';

import { DocuBucket } from 'src/docu-bucket/docu-bucket.model';
import { MainWorkOrder } from 'src/main-work-order/main-work-order.model';
export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },

  {
    provide: 'PDF_REPOSITORY',
    useValue: Pdf,
  },

  {
    provide: 'DOCUBUCKET_REPOSITORY',
    useValue: DocuBucket,
  },

  {
    provide: 'MAIN_WORK_ORDER_REPOSITORY',
    useValue: MainWorkOrder,
  },
];
