import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { EmployeeStatsService } from './employee_stats.service';

@Controller('employee_stats')
export class EmployeeStatsController {
  constructor(private readonly statsService: EmployeeStatsService) {}


}