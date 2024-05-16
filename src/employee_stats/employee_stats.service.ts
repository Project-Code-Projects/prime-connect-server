import { log } from 'console';
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
    const workFrequency = Math.floor(
      totalTaskByEmployee / (totalErrorCount + 1),
    );

    const workPercentageById = Math.ceil(
      ((totalTaskByEmployee - totalErrorCount) / totalTaskByEmployee) * 100,
    );
    const completedTasks = totalTaskByEmployee - totalErrorCount;
    console.log(totalTaskByEmployee, totalErrorCount, workFrequency);

    return {
      totalTaskByEmployee,
      workPercentageById,
      totalErrorCount,
      workFrequency,
      completedTasks,
    };
  }
  async getLast11DaysData() {
    try {
      const elevenDaysAgo = new Date();
      elevenDaysAgo.setDate(elevenDaysAgo.getDate() - 11);

      const last11DaysData = await EmployeeStats.findAll({
        where: {
          createdAt: {
            [Op.gte]: elevenDaysAgo,
          },
        },
      });

      return last11DaysData;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  }
}
