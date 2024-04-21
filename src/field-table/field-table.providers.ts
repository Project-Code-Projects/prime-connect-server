import FieldTable from './field-table.model';

export const fieldTableProviders = [
  {
    provide: 'FIELD_TABLE_REPOSITORY',
    useValue: FieldTable,
  },
];
