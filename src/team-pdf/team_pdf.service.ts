import { Injectable, Inject } from "@nestjs/common";
import { TeamPdf } from "./team_pdf.model";

@Injectable()
export class TeamPdfService {
    constructor( @Inject('TEAM_PDF_REPOSITORY') private teamPdfRepository: typeof TeamPdf) {}

    async createTeamPdf(createTeamPdfDto: any): Promise<TeamPdf> {
        const teamPdf = await this.teamPdfRepository.create<TeamPdf>(createTeamPdfDto);
        return teamPdf;
    }

    async findAllTeamPdf(): Promise<TeamPdf[]> {
        return this.teamPdfRepository.findAll<TeamPdf>();
    }

    async findOne(id: number): Promise<TeamPdf | null> {
        return this.teamPdfRepository.findOne<TeamPdf>({ where: { id } });
    }

    async updateTeamPdf(id: string, updateData: Partial<any>): Promise<void> {
        await this.teamPdfRepository.update(updateData, { where: { id } });
    }

    async deleteTeamPdf(id: string): Promise<void> {
        await this.teamPdfRepository.destroy({ where: { id } });
    }
}