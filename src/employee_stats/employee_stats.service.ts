import { Injectable, Inject } from '@nestjs/common';
import { EmployeeStats } from './employee_stats.model';
import { Op } from 'sequelize';
@Injectable()
export class EmployeeStatsService {
  constructor(
    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private employeeStatsRepository: typeof EmployeeStats,
  ) {}

  async workStatsByEmployeeId(id: number): Promise<any> {
    const totalTaskByEmployee = await EmployeeStats.count({
      where: {
        employee_id: id,
      },
    });
    const totalErrorCount = await EmployeeStats.count({
      where: {
        employee_id: id,
        error_count: {
          [Op.or]: [{ [Op.not]: null }, { [Op.not]: 0 }],
        },
      },
    });
    const workFrequency = totalTaskByEmployee / (totalErrorCount + 1);

    return { totalTaskByEmployee, totalErrorCount, workFrequency };
  }
}
