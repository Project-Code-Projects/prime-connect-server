import { AccountList } from './account-list.model';

import { Pdf } from 'src/pdf/pdf.model';

export const accountListProviders = [
  {
    provide: 'ACCOUNT_LIST_REPOSITORY',
    useValue: AccountList,
  },
];
