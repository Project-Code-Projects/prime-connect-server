import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeStatsService } from './employee-stats.service';
import { IEmployeeStats } from './employee-stats.interface';

@Controller('employee-stats')
export class EmployeeStatsController {
  constructor(private readonly employeeStatsService: EmployeeStatsService) {}
}
