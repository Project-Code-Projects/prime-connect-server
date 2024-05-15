import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './employee.model';
import { TeamRoleService } from 'src/team_role_workflow/team_role_workflow.service';
import { EmployeeStats } from 'src/employee_stats/employee_stats.model';
import { WorkflowService } from '../workflow/workflow.service';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: typeof Employee,
    private teamRoleService: TeamRoleService,

    private readonly workflowService: WorkflowService,

    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private employeeStatsRepository: typeof EmployeeStats,
  ) {}

  async findEmployeeAccess(employee_id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
      attributes: ['team_id', 'role_id'],
    });
   if(employee) {
    const workflow = await this.workflowService.findOneByTeamRoleId(
      employee.team_id,
      employee.role_id,
    );
    if(workflow) return workflow.access;
   }
  }

  async createEmployee(createEmployeeDto: any): Promise<Employee> {
    return this.employeeRepository.create<Employee>(createEmployeeDto);
  }

  async findAllEmployee(): Promise<any[]> {
    return this.employeeRepository.findAll<any>();
  }

  async findAllByRoleId(role_id: number): Promise<any[]> {
    return this.employeeRepository.findAll<any>({ where: { role_id } });
  }

  async findOne(id: number): Promise<any> {
    return this.employeeRepository.findOne<Employee>({ where: { id } });
  }

  async findByEmail(email: string): Promise<any> {
    return this.employeeRepository.findOne<Employee>({ where: { email } });
  }

  async findAllActiveEmployeeByTeamId(id: number): Promise<any[]> {
    const employees = await this.employeeRepository.findAll<any>({
      where: { team_id: id, active: true },
      attributes: ['id', 'name', 'email', 'admin', 'role_id', 'team_id'],
    });
    // console.log(employees.map((employee) => employee));
    return employees;
  }

  async findAllEmployeeByTeamId(id: number): Promise<any[]> {
    const employees = await this.employeeRepository.findAll<any>({
      where: { team_id: id },
    });
    // console.log(employees.map((employee) => employee));
    return employees;
  }

  async updateEmployeeAdminStatus(admin: string,team_id: number): Promise<void> {
    await this.employeeRepository.update(
      { admin: 'none' },
      { where: { admin, team_id } },
    );
  }

  async updateEmployeeInfo(
    email: string,
    updateData: Partial<any>,
  ): Promise<any> {
    await this.employeeRepository.update(updateData, { where: { email } });
    return this.employeeRepository.findOne({ where: { email } });
  }
  async updateEmployee(id: number, updateData: Partial<any>): Promise<any> {
    await this.employeeRepository.update(updateData, { where: { id } });
    return this.employeeRepository.findOne({ where: { id } });
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.employeeRepository.destroy({ where: { id } });
  }

  async EmployeeTeamId(id: number): Promise<any> {
   
    const prev_employee = await this.employeeRepository.findOne({
      where: { id: id },
      attributes: ['team_id', 'role_id'],
      raw: true,
    });

    const sequence = await this.workflowService.getSequence(
      Number(prev_employee.team_id),
      Number(prev_employee.role_id),
    );
    console.log('sequence', sequence);
    const employee = await this.employeeRepository.findAll({
      where: { team_id: sequence.team_id, role_id: sequence.role_id },
    });
    console.log('employee', employee);
    const employee_list = [];
    employee.forEach((employee) => {
      employee_list.push(employee.id);
    });
    console.log('employee_list', employee_list);
    return employee_list;
  }

  async AuthorTeamId(id: number): Promise<any> {
    const prev_employee = await this.employeeRepository.findOne({
      where: { id: id },
      attributes: ['team_id', 'role_id'],
      raw: true,
    });

    const sequence = await this.workflowService.getPrevSequence(
      Number(prev_employee.team_id),
      Number(prev_employee.role_id),
    );

    const employee = await this.employeeRepository.findAll({
      where: { team_id: sequence.team_id, role_id: sequence.role_id },
    });

    const employee_list = [];
    employee.forEach((employee) => {
      employee_list.push(employee.id);
    });
    console.log('employee list', employee_list);
    return employee_list;
  }

  async postEmployeeStats(
    work_order_id: number,
    time_interval: number,
    error_count: number,
    employee_id: number,
  ) {
    const prev_employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
      attributes: ['team_id', 'role_id'],
      raw: true,
    });
    const target_time = time_interval * 60 * 1000;
    const time_allotted = target_time - error_count * 60 * 1000;

    // await EmployeeStats.create({ work_order_id, target_time, time_interval, time_allotted, error_count, employee_id, team_id: prev_employee.team_id, role_id: prev_employee.role_id });
    // return employee_team_role_id;
  }
  async employeeActiveInfo(): Promise<any> {
    try {
      const active = await this.employeeRepository.count({
        where: { active: true },
      });
      const inActive = await this.employeeRepository.count({
        where: { active: false },
      });
      const activePercentage = Math.ceil((active / (active + inActive)) * 100);
      const inActivePercentage = Math.floor(
        (inActive / (active + inActive)) * 100,
      );
      return { active, inActive, activePercentage, inActivePercentage };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
