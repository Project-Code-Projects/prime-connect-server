import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { PrimaryService } from '../Primary_data/primary.service';
import { IMainWorkOrder } from './main-work-order.interface';

@Controller('/main-work-order')
export class MainWorkOrderController {
  constructor(
    private readonly mainWorkOrderService: MainWorkOrderService,
    private readonly workDetails: PrimaryService,
  ) {}

  @Get('/employee/:id')
  async getWorkOrderByEmployeeId(@Param('id') id: number): Promise<any> {
    return this.mainWorkOrderService.getWorkOrderByEmployeeId(id);
  }

  @Get('work/:acc_id/:team_id/:customer_id')
  async getWorkDetails(
    @Param('acc_id') acc_id: number,
    @Param('team_id') team_id: number,
    @Param('customer_id') customer_id: number,
  ): Promise<any> {
    return this.workDetails.getWorkDetails(acc_id, team_id, customer_id);
  }

  @Post('update-status/reviewer')
  async updateStatusreviewer(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IMainWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.mainWorkOrderService.updateStatusReviewer(id);
    return this.mainWorkOrderService.findAllWorkOrder();
  }
  @Post('update-status/maker')
  async updateStatusmaker(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IMainWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.mainWorkOrderService.updateStatusMaker(id);
    return this.mainWorkOrderService.findAllWorkOrder();
  }

  @Get()
  async findAllWorkOrder(): Promise<IMainWorkOrder[]> {
    return this.mainWorkOrderService.findAllWorkOrder();
  }

  @Post('assign-task')
  async assignTask(): Promise<any> {
    return this.mainWorkOrderService.distributeTaskByCron();
  }

  @Get('/view/:order_id')
  async getCustomerDetails(@Param('order_id') orderId: number): Promise<any> {
    try {
      return await this.mainWorkOrderService.workOrderCustomerDetails(orderId);
    } catch (error) {
      console.error('Error in getCustomerDetails:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('work/:acc_id/:team_id/:customer_id')
  async updateMainWorkOrder( @Param('acc_id') acc_id: number, @Param('team_id') team_id: number, @Param('customer_id') customer_id: number, @Body() updateData: Partial<any>): Promise<any> {
    const updatedWork = await this.mainWorkOrderService.updateWorkDetails(acc_id, team_id, customer_id, updateData);
    const workOrder = await this.mainWorkOrderService.getWorkOrderByAccId(acc_id);
    if (workOrder) {
      this.mainWorkOrderService.explodeWorkOrder(team_id, workOrder.id, 'Write');
    }
    return updatedWork;
  }


  @Get('customer/:id')
  async customerCredentials(@Param('id') id: string): Promise<any> {
    const list = id.split(',');
    return this.mainWorkOrderService.CustomerCredentials(list);  

  }
}
