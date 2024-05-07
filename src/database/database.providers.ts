import { Sequelize } from 'sequelize-typescript';
import { Department } from '../department/department.model';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';
import { Employee } from '../employee/employee.model';
import { EmployeeLogin } from '../employee_login/employee_login.model';
import { EmployeeStats } from '../employee_stats/employee_stats.model';
import { TeamRole } from '../team_role_workflow/team_role_workflow.model';
import { Customer } from '../customer/customer.model';
import { MainWorkOrder } from '../main-work-order/main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import PdfData from '../pdf-data/pdf-data.model';
import EmployeeRole from '../employee-role/employee-role.model';
import PdfList, { DocuBucket } from '../docu-bucket/docu-bucket.model';
import Pdf from '../pdf/pdf.model';
import { DistributeWorkOrder } from '../distribute-work-order/distribute-work-order.model';
import FieldData from '../field-data/field-data.model';
import FieldTable from '../field-table/field-table.model';
import { TeamField } from '../team-field/team_field.model';
import { TeamPdf } from '../team-pdf/team_pdf.model';
import { AccountList } from '../account-list/account-list.model';
import { Form } from '../form/form.model';
import { FormField } from '../form-field/form-field.model';
import {Workflow } from '../workflow/workflow.model';
import { Primary } from '../Primary_data/primary.model';
// import Primary from "../primary_data/primary.model"

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-wild-cell-a2u0265d.eu-central-1.pg.koyeb.app',
        // host: 'localhost',
        port: 5432,
        username: 'koyeb-adm',
        // username: 'postgres',
        password: '7fWnr6JZyUXe',
        // password: 'bsc16190',
        database: 'koyebdb',
        // database: 'admin',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      });
      sequelize.addModels([
        Department,
        Team,
        Role,
        Employee,
        EmployeeLogin,
        EmployeeStats,
        TeamRole,
        Customer,
        MainWorkOrder,
        WorkFlowAssignLog,
        PdfData,
        AccountList,
        EmployeeRole,
        PdfList,
        Pdf,
        DistributeWorkOrder,
        FieldData,
        FieldTable,
        Form,
        FormField,
        DocuBucket,
        TeamField,
        TeamPdf,
        Workflow,
        Primary
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
