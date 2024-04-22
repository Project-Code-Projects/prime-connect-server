import { TeamPdf } from './team_pdf.model';

export const teamPdfProvider = {
    provide: 'TEAM_PDF_REPOSITORY',
    useValue: TeamPdf
}