require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import { Customer, CustomerAccountList } from '../customer/customer.model';
import { ReviewerWorkOrder } from '../reviewer-work-order/reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { EmployeeStats } from '../employee-stats/employee-stats.model';
import PdfData from 'src/pdf-data/pdf-data.model';
import EmployeeRole from 'src/employee-role/employee-role.model';
import PdfList, { DocuBucket } from 'src/docu-bucket/docu-bucket.model';
import Pdf from 'src/pdf/pdf.model';
import MainWorkOrder from 'src/main-work-order/main-work-order.model';
import FieldData from 'src/field-data/field-data.model';
import FieldTable from 'src/field-table/field-table.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-wild-cell-a2u0265d.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: '7fWnr6JZyUXe',
        database: 'koyebdb',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      });
      sequelize.addModels([
        Customer,
        ReviewerWorkOrder,
        WorkFlowAssignLog,
        Employee,
        EmployeeStats,
        // PdfData,
        CustomerAccountList,
        EmployeeRole,
        PdfList,
        Pdf,
        MainWorkOrder,
        FieldData,
        FieldTable,
        PdfData,
        DocuBucket,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
