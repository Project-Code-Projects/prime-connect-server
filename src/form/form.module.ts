import { Form } from './form.controller';
import { TeamService } from './team.service';
import { teamProvider } from './team.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';