import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { EmployeeLoginService } from './employee_login.service';
import * as bcrypt  from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class EmployeeLoginController {
  constructor(private readonly loginService: EmployeeLoginService, private readonly jwtService: JwtService) {}

  
  @Post('/signup')
  async createEmployee(@Body() createEmployeeDto: any) {
    const email = createEmployeeDto.email;
    const existingEmployee = await this.loginService.findByEmail(email);
    if (existingEmployee) {
      return { message: 'Username already exists' };
    }
    console.log(email,createEmployeeDto.password);
    createEmployeeDto.password = await bcrypt.hash(createEmployeeDto.password,10);
    return this.loginService.createEmployee(createEmployeeDto);
  }

  @Post('/signin')
  async signin(@Body() createEmployeeDto: any) {
    const { email,password } = createEmployeeDto;
    // Check if user exists
    const user = await this.loginService.findByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    const admin =  user.employee.dataValues.admin;
    const active =  user.employee.dataValues.active;

    // if(admin!=='SA') return { message: 'This user is not an admin' };
    if(!active) return { message: 'You are not active at this moment' };

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return { message: 'Invalid password' };
    }

    // Signin successful
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { message: `Signin successful as ${admin}`, token:'bearer ' + token, admin, id: user.employee.dataValues.id, role: user.employee.dataValues.role_id };
  }

  @Get('/signin')
  async findAllEmployee() {
    return this.loginService.findAllEmployee();
  }

  @Put('/signin/:id')
  async updateEmployeeInfo( @Param('id') id: number, @Body() updateData: Partial<any> ): Promise<void> {
    await this.loginService.updateEmployeeInfo(id, updateData);
  }

  @Delete('/signin/:id')
  async deleteEmployee(@Param('id') id: number): Promise<void> {
    await this.loginService.deleteEmployee(id);
  }
}