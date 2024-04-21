import { Customer, CustomerAccountList } from './customer.model';

import { Pdf } from 'src/pdf/pdf.model';

import { DocuBucket } from 'src/docu-bucket/docu-bucket.model';
import { ReviewerWorkOrder } from 'src/reviewer-work-order/reviewer-work-order.model';
export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },

  {
    provide: 'CUSTOMER_ACCOUNT_REPOSITORY',
    useValue: CustomerAccountList,
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
    provide: 'REVIEWER_WORK_ORDER_REPOSITORY',
    useValue: ReviewerWorkOrder,
  },
];
