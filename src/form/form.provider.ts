import { Form } from './form.model';

export const formProvider = 
{
  provide: 'FORM_REPOSITORY',
  useValue: Form,
}