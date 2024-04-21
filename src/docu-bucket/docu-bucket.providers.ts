import { DocuBucket } from './docu-bucket.model';

export const docuBucketProviders = [
  {
    provide: 'DOCU_BUCKET_REPOSITORY',
    useValue: DocuBucket,
  },
];
