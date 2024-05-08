import { Controller, Post, Get, Put, Delete, Body,Param,ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamPdfService } from '../team-pdf/team_pdf.service';
import { TeamFieldService } from '../team-field/team_field.service';
import { PdfService } from '../pdf/pdf.service';
import { FieldTableService } from '../field-table/field-table.service';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';

@Controller('/team')
export class TeamController {
  constructor( private teamService: TeamService, private teamRoleService: TeamRoleService, private teamPdfService: TeamPdfService, private teamFieldService: TeamFieldService, private pdfService: PdfService, private fieldTableService: FieldTableService) {}

  @Post()
  async create(@Body() createTeamDto: any) {
    const {name,description,dept_id,exist_pdf,new_pdf, exist_field, new_field} = createTeamDto;
    const teamInfo = {name,description,dept_id};
    const team = await this.teamService.create(teamInfo);

    if(exist_pdf){
      const len = exist_pdf.length;
      for(let i = 0; i < len; i++){
        const teamPdf = {team_id:team.id,pdf_id:exist_pdf[i].pdf_id};
        this.teamPdfService.createTeamPdf(teamPdf);
      }
    }

    if(new_pdf){
      const len = new_pdf.length;
      for(let i = 0; i < len; i++){
        const {pdf_name,pdf_type} = new_pdf[i];
        const newPdf = await this.pdfService.addPdf({pdf_name,pdf_type});
        const teamPdf = {team_id:team.id,pdf_id:newPdf.id};
        this.teamPdfService.createTeamPdf(teamPdf);
      }
    }

    if(exist_field){
      const len = exist_field.length;
      for(let i = 0; i < len; i++){
        const { id,page,co_ordinate,sequence } = exist_field[i];
        const teamField = {page,co_ordinate,sequence,team_id:team.id,field_id:id};
        this.teamFieldService.createTeamField(teamField);
      }
    }

    if(new_field){
      const len = new_field.length;
      for(let i = 0; i < len; i++){
        const {name,type,estimated_time,page,co_ordinate,sequence} = new_field[i];
        const newField = await this.fieldTableService.addFieldTable({field_name:name,field_type:type,estimated_time});
        const teamField = {page,co_ordinate,sequence,team_id:team.id,field_id:newField.id};
        this.teamFieldService.createTeamField(teamField);
      }
    }

    return team;
  }

  @Get()
  async findAll() {
    return this.teamService.findAllTeam();
  }

  @Get('/:id')
  async findAllTeamByDeptId(@Param('id') id: number) {
    return this.teamService.findAllTeamByDeptId(id);
  }

  
  @Get('/:id/pdfs')
  async getPdfByTeamId(@Param('id') id: number) {
    console.log(id);
    const pdfs = await this.teamService.getPdfByTeamId(id);
    return  pdfs ;
  }

  @Get('/role/:id')
  async findAllRoleByTeamId(@Param('id') id: number) {
    const data = await this.teamService.findOne(id);
    // console.log(roles);
    return data;
  }

  @Get('/workflow/:id')
  async findAllWokflowByTeamId(@Param('id') id: number) {
    const workflow = await this.teamRoleService.findAllByTeamId(id);
    // console.log(roles);
    return workflow;
  }

  @Put('/:id')
  async updateTeam( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.teamService.updateTeam(id, updateData);
  }

  @Delete('/:id')
  async deleteTeam(@Param('id') id: string): Promise<void> {
    await this.teamService.deleteTeam(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any>{
    return this.teamService.findOneById(id);
  }
}