import { Workflow } from './workflow.model';

export const workflowProvider = {
  provide: 'WORKFLOW_REPOSITORY',
  useValue: Workflow,
};