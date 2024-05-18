import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICustomer } from './customer.interface';
import { convertPDFBufferToImagesAndUpload } from '../pdf-data/pdf.middleware';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { IPdfData } from 'src/pdf-data/pdf-data.interface';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { PdfService } from 'src/pdf/pdf.service';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';
import { PrimaryService } from '../Primary_data/primary.service';
import { WorkflowService } from 'src/workflow/workflow.service';
import * as Multer from 'multer';
import { Workflow } from 'src/workflow/workflow.model';
import { Sequelize } from 'sequelize';
@Controller('customer')
export class CustomerController {
  pdfs: { id: number; pdf_values: string[] }[] = [];
  constructor(
    private readonly customerService: CustomerService,
    private readonly pdfDataService: PdfDataService,
    private readonly docubucketService: DocubucketService,
    private readonly pdfService: PdfService,
    private readonly mainWorkOrderService: MainWorkOrderService,
    private readonly primaryService: PrimaryService,
    private readonly workflowService: WorkflowService,
  ) {}

  @Get()
  async getAllCustomer(): Promise<ICustomer[]> {
    return this.customerService.findAllCustomer();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async postCustomer(
    @Body() customer: ICustomer,
    @UploadedFiles() files: Array<Multer.File>,
  ): Promise<ICustomer> {
    const existingCustomer = await this.customerService.findByNid(
      customer.nid_no,
    );

  //   const pdfs = files.map(file => ({
  //     name: file.originalname,
  //     data: file.buffer
  // }));
    let nextAccId = 0;
    const { team_id, account_type } = customer;
    const firstSequence =
      await this.workflowService.getFirstSequenceByTeamId(team_id);
    const maxId = await this.customerService.findMaxAccId();
    nextAccId = maxId + 1;

    const allPdfNames = await this.pdfService.findAllPdfName();
    const matchedPdfIds = files.map((file) => {
      const pdfName = file.originalname.split('.')[0];
      const pdf = allPdfNames.find((pdf) => pdf.pdf_name === pdfName);
      return pdf ? pdf.id : null;
    });

    if (existingCustomer) {
      await this.customerService.createAccList({
        // acc_id: nextAccId,
        customer_id: existingCustomer.id,
        acc_type: 'personal',
        status: 'need approval',
        current_state: 'pending',
      });
      // console.log(files);

      await Promise.all(
        matchedPdfIds.map(async (pdfId, index) => {
          if (pdfId !== null) {
            const pdfValue = await convertPDFBufferToImagesAndUpload(
              files[index].buffer,
            );
            // console.log(pdfValue);
            this.pdfs.push({ id: pdfId, pdf_values: pdfValue });
            await this.docubucketService.postPdf({
              acc_id: nextAccId,
              customer_id: existingCustomer.id,
              pdf_id: pdfId,
              pdf_values: pdfValue,
            });
          }
        }),
      );
      if (firstSequence.access == 'Read') {
        await this.mainWorkOrderService.createMainWorkOrder({
          acc_id: nextAccId,
          customer_id: existingCustomer.id,
          acc_type: 'personal',
          status: 'Read',
          team_id: team_id,
          assigned_to: null,
          start_time: new Date(),
          isAssigned: false,
          checked: false,
        });
        const workFlow = await this.workflowService.getRoleIdByTeamIdAndAccess(
          team_id,
          'Read',
        );
        const workOrder =
          await this.mainWorkOrderService.getWorkOrderByAccId(nextAccId);
        this.mainWorkOrderService.distributeTask(
          team_id,
          workOrder.acc_id,
          workOrder.id,
          workFlow.role_id,
        );
        //assign
        const primaryData = {
          name: existingCustomer.name,
          nid: existingCustomer.nid_no,
          phone: existingCustomer.phone,
          address: existingCustomer.address,
          email: existingCustomer.email,
          tin: existingCustomer.tin_no,
          acc_type: account_type,
          acc_id: nextAccId,
          customer_id: existingCustomer.id,
          team_id: team_id,
          pdf: this.pdfs,
          birth_certi: existingCustomer.birth_certificate_no,
        };

        this.primaryService.createPrimary(primaryData);
      } else if (firstSequence.access == 'Write') {
        await this.mainWorkOrderService.createMainWorkOrder({
          acc_id: nextAccId,
          customer_id: existingCustomer.id,
          acc_type: 'personal',
          status: 'Write',
          team_id: team_id,
          assigned_to: null,
          start_time: new Date(),
          isAssigned: false,
          checked: false,
        });
        const workOrder =
          await this.mainWorkOrderService.getWorkOrderByAccId(nextAccId);

        this.mainWorkOrderService.explodeWorkOrder(
          team_id,
          workOrder.id,
          'Write',
        );
      }

      throw new HttpException(
        { message: 'NID number already exists', existingCustomer },
        HttpStatus.ACCEPTED,
      );
    }

    const createdCustomer = await this.customerService.create(customer);
    await this.customerService.createAccList({
      // acc_id: nextAccId,
      customer_id: createdCustomer.id,
      acc_type: 'personal',
      status: 'need approval',
      current_state: 'pending',
    });
    // await this.mainWorkOrderService.createMainWorkOrder({
    //   acc_id: nextAccId,
    //   customer_id: createdCustomer.id,
    //   acc_type: 'personal',
    //   status: 'need approval',
    //   team_id: 2,
    //   assigned_to: null,
    //   start_time: new Date(),
    //   isAssigned: false,
    //   checked: false,
    // });

    await Promise.all(
      matchedPdfIds.map(async (pdfId, index) => {
        if (pdfId !== null) {
          const pdfValue = await convertPDFBufferToImagesAndUpload(
            files[index].buffer,
          );
          console.log(pdfValue);

          this.pdfs.push({ id: pdfId, pdf_values: pdfValue });
          await this.docubucketService.postPdf({
            acc_id: nextAccId,
            customer_id: createdCustomer.id,
            pdf_id: pdfId,
            pdf_values: pdfValue,
          });
        }
      }),
    );
    if (firstSequence.access == 'Read') {
      await this.mainWorkOrderService.createMainWorkOrder({
        acc_id: nextAccId,
        customer_id: createdCustomer.id,
        acc_type: 'personal',
        status: 'Read',
        team_id: team_id,
        assigned_to: null,
        start_time: new Date(),
        isAssigned: false,
        checked: false,
      });
      const workFlow = await this.workflowService.getRoleIdByTeamIdAndAccess(
        team_id,
        'Read',
      );
      const workOrder =
        await this.mainWorkOrderService.getWorkOrderByAccId(nextAccId);
      this.mainWorkOrderService.distributeTask(
        team_id,
        workOrder.acc_id,
        workOrder.id,
        workFlow.role_id,
      );
      // assign
      const primaryData = {
        name: createdCustomer.name,
        nid: createdCustomer.nid_no,
        phone: createdCustomer.phone,
        address: createdCustomer.address,
        email: createdCustomer.email,
        tin: createdCustomer.tin_no,
        acc_type: account_type,
        acc_id: nextAccId,
        customer_id: createdCustomer.id,
        team_id: team_id,
        pdf: this.pdfs,
        birth_certi: createdCustomer.birth_certificate_no,
      };

      this.primaryService.createPrimary(primaryData);
    } else if (firstSequence.access == 'Write') {
      await this.mainWorkOrderService.createMainWorkOrder({
        acc_id: nextAccId,
        customer_id: createdCustomer.id,
        acc_type: 'personal',
        status: 'Write',
        team_id: team_id,
        assigned_to: null,
        start_time: new Date(),
        isAssigned: false,
        checked: false,
      });

      const workOrder =
        await this.mainWorkOrderService.getWorkOrderByAccId(nextAccId);

      this.mainWorkOrderService.explodeWorkOrder(
        team_id,
        workOrder.id,
        'Write',
      );
    }

    const pdfData: IPdfData = {
      //old data
      acc_id: 1,
      customer_id: createdCustomer.id,
      pdf_1: [],
      pdf_2: [],
      pdf_3: [],
      pdf_4: [],
    };

    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        pdfData[`pdf_${i + 1}`] = await convertPDFBufferToImagesAndUpload(
          files[i].buffer,
        );
        // console.log(pdfData[`pdf_${i + 1}`]);
      }
      this.pdfDataService.postPdf(pdfData);
    }

    return createdCustomer;
  }

  @Get('search')
  async getCustomer(
    @Body() searchData: { nid_no?: number; phone?: number },
  ): Promise<ICustomer> {
    const { nid_no, phone } = searchData;

    if (!nid_no && !phone) {
      throw new HttpException(
        'Either nid_no or phone must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    let customer: ICustomer;

    if (nid_no) {
      customer = await this.customerService.findByNid(nid_no);
    } else {
      customer = await this.customerService.findByPhone(phone);
    }

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return customer;
  }
}
