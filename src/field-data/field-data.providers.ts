import { FieldData } from './field-data.model';

export const fieldDataProviders = [
  {
    provide: 'FIELD_DATA_REPOSITORY',
    useValue: FieldData,
  },
];
