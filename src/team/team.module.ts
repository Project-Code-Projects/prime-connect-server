import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { teamProvider } from './team.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { TeamPdfService } from '../team-pdf/team_pdf.service';
import { teamPdfProvider } from '../team-pdf/team_pdf.provider';
import { TeamFieldService } from '../team-field/team_field.service';
import { teamFieldProvider } from '../team-field/team_field.provider';
import { PdfService } from '../pdf/pdf.service';
import { pdfProviders } from '../pdf/pdf.providers';
import { FieldTableService } from '../field-table/field-table.service';
import { fieldTableProviders } from '../field-table/field-table.providers';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { teamRoleProvider } from '../team_role_workflow/team_role_workflow.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [TeamController],
    providers: [
      TeamService,
      teamProvider,
      teamPdfProvider,
      TeamPdfService,
      TeamFieldService,
      teamFieldProvider,
      PdfService,
      ...pdfProviders,
      FieldTableService,
      TeamRoleService,
      teamRoleProvider,
      ...fieldTableProviders
      // JwtMiddleware,
      // EmployeeLoginService,
      // employeeLoginProvider
    ],
  })

  //   export class TeamModule implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(JwtMiddleware).forRoutes(TeamController);
  //   }
  // }

  export class TeamModule {}
  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })
