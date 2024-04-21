import { Controller, Post, Get, Put, Delete, Body,Param,ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: any) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamService.findAllTeam();
  }

  @Get('/role/:id')
  async findAllRoleByTeamId(@Param('id') id: number) {
    const roles = this.teamService.findOne(id);
    // console.log(roles);
    return roles;
  }

  @Put(':id')
  async updateTeam( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.teamService.updateTeam(id, updateData);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<void> {
    await this.teamService.deleteTeam(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any>{
    return this.teamService.findOneById(id);
  }
}