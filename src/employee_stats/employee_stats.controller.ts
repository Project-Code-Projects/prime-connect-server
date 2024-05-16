import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EmployeeStatsService } from './employee_stats.service';

@Controller('employee_stats')
export class EmployeeStatsController {
  constructor(private readonly statsService: EmployeeStatsService) {}

  @Get('/:id')
  async getEmployeeStats(@Param('id') id: number): Promise<any> {
    return await this.statsService.workStatsByEmployeeId(id);
  }

  @Get('stats/:id')
  async getLast11DaysStats(@Param('id') id: number): Promise<any> {
    return await this.statsService.getLast11DaysData();
  }
}
