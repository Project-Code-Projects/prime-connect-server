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
import { convertPDFBufferToImagesAndUpload } from 'src/pdf-data/pdf.middleware';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { IPdfData } from 'src/pdf-data/pdf-data.interface';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { PdfService } from 'src/pdf/pdf.service';
import { ReviewerWorkOrderService } from 'src/reviewer-work-order/reviewer-work-order.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly pdfDataService: PdfDataService,
    private readonly docubucketService: DocubucketService,
    private readonly pdfService: PdfService,
    private readonly reviewerWorkOrderService: ReviewerWorkOrderService,
  ) {}

  @Get()
  async getAllCustomer(): Promise<ICustomer[]> {
    return this.customerService.findAllCustomer();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async postCustomer(
    @Body() customer: ICustomer,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ICustomer> {
    const existingCustomer = await this.customerService.findByNid(
      customer.nid_no,
    );
    let nextAccId = 0;
    const maxId = await this.customerService.findMaxAccId();
    nextAccId = maxId + 1;

    const allPdfNames = await this.pdfService.findAllPdfName(); // Get all PDF names from the database
    const matchedPdfIds = files.map((file) => {
      const pdfName = file.originalname.split('.')[0]; // Extract PDF name from the filename
      const pdf = allPdfNames.find((pdf) => pdf.pdf_name === pdfName); // Find the corresponding PDF in the database
      return pdf ? pdf.id : null; // Return PDF ID or null if not found
    });

    if (existingCustomer) {
      await this.customerService.createAccList({
        acc_id: nextAccId,
        customer_id: existingCustomer.id,
        acc_type: 'personal',
        status: 'need approval',
        current_state: 'pending',
      });
      await this.reviewerWorkOrderService.createReviewerWorkOrder({
        acc_id: nextAccId,
        customer_id: existingCustomer.id,
        acc_type: 'personal',
        status: 'need approval',
        assigned_to: null,
        start_time: new Date(),
        isAssigned: false,
      });

      await Promise.all(
        matchedPdfIds.map(async (pdfId, index) => {
          if (pdfId !== null) {
            const pdfValue = await convertPDFBufferToImagesAndUpload(
              files[index].buffer,
            );
            console.log(pdfValue);

            await this.docubucketService.postPdf({
              acc_id: nextAccId,
              customer_id: existingCustomer.id,
              pdf_id: pdfId,
              pdf_values: pdfValue, // Add PDF value to the array
            });
          }
        }),
      );

      throw new HttpException(
        { message: 'NID number already exists', existingCustomer },
        HttpStatus.ACCEPTED,
      );
    }

    const createdCustomer = await this.customerService.create(customer);
    await this.customerService.createAccList({
      acc_id: nextAccId,
      customer_id: createdCustomer.id,
      acc_type: 'personal',
      status: 'need approval',
      current_state: 'pending',
    });
    await this.reviewerWorkOrderService.createReviewerWorkOrder({
      acc_id: nextAccId,
      customer_id: createdCustomer.id,
      acc_type: 'personal',
      status: 'need approval',
      assigned_to: null,
      start_time: new Date(),
      isAssigned: false,
    });
    await Promise.all(
      matchedPdfIds.map(async (pdfId, index) => {
        if (pdfId !== null) {
          const pdfValue = await convertPDFBufferToImagesAndUpload(
            files[index].buffer,
          );
          console.log(pdfValue);

          await this.docubucketService.postPdf({
            acc_id: nextAccId,
            customer_id: createdCustomer.id,
            pdf_id: pdfId,
            pdf_values: pdfValue, // Add PDF value to the array
          });
        }
      }),
    );
    const pdfData: IPdfData = {
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
        console.log(pdfData[`pdf_${i + 1}`]);
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
