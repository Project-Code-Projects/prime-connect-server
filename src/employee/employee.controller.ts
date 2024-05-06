import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TeamService } from '../team/team.service';
import { RoleService } from '../role/role.service';

@Controller('employee')
export class EmployeeController {
  constructor(private roleService: RoleService,private readonly employeeService: EmployeeService, private readonly teamService: TeamService) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: any) {
    // console.log(createEmployeeDto);
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get()
  async findAllEmployee() {
    return this.employeeService.findAllEmployee();
  }

  @Get('/team_id/:id')
  async findAllActiveEmployeeByTeamId(@Param('id') team_id: number) {
    const team = await this.teamService.findOne(team_id);
    const roles = team?.roles;
    const employees = await this.employeeService.findAllActiveEmployeeByTeamId(team_id);
    return { roles, employees };
  }

  @Get('/team/:id')
  async findAllEmployeeByTeamId(@Param('id') team_id: number) {
    const team = await this.teamService.findOne(team_id);
    const roles = team?.roles;
    const employees = await this.employeeService.findAllEmployeeByTeamId(team_id);
    return { roles, employees };
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    const employee = await this.employeeService.findOne(id);
    const role = await this.roleService.findOne(employee.role_id);
    const team = await this.teamService.findOne(employee.team_id);
    return { roleName: role?.name,teamName: team?.name, employee };
  }

  @Get('/role/:id')
  async findAllEmployeeByRoleId(@Param('id') role_id: number) {
    const employee = await this.employeeService.findAllByRoleId(role_id);
    return employee;
  }

  @Put('/:id')
  async updateEmployeeInfo( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<any> {
    const updatedData = await this.employeeService.updateEmployeeInfo(id, updateData);
    // console.log(updatedData);
    return updatedData;
  }

  @Delete('/:id')
  async deleteEmployee(@Param('id') id: string): Promise<void> {
    await this.employeeService.deleteEmployee(id);
  }

  @Get('team/role/:id')
  async employeeTeamId(@Param('id') id: number): Promise<any> {
    return await this.employeeService.EmployeeTeamId(id);
  }

  @Post('employee_stats')
  async postEmployeeStats(@Body() employeeStats: any): Promise<any> {
    const { work_order_id, time_interval, error_count, employee_id } = employeeStats;
    return await this.employeeService.postEmployeeStats(work_order_id, time_interval, error_count, employee_id);
  }

}
