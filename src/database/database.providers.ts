import { Sequelize } from 'sequelize-typescript';
import { Department } from '../department/department.model';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';
import { Employee } from '../employee/employee.model';
import { EmployeeLogin } from '../employee_login/employee_login.model';
import { EmployeeStats } from '../employee_stats/employee_stats.model';
import { TeamRole } from '../team_role/team_role.model';
import { Customer } from '../customer/customer.model';
import { MainWorkOrder } from '../main-work-order/main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import PdfData from 'src/pdf-data/pdf-data.model';
import EmployeeRole from 'src/employee-role/employee-role.model';
import PdfList, { DocuBucket } from 'src/docu-bucket/docu-bucket.model';
import Pdf from 'src/pdf/pdf.model';
import { DistributeWorkOrder } from 'src/distribute-work-order/distribute-work-order.model';
import FieldData from 'src/field-data/field-data.model';
import FieldTable from 'src/field-table/field-table.model';
import { TeamField } from 'src/team-field/team_field.model';
import { TeamPdf } from 'src/team-pdf/team_pdf.model';
import { AccountList } from 'src/account-list/account-list.model';

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

        DocuBucket,
        TeamField,
        TeamPdf,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
