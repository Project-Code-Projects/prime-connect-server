import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { IMainWorkOrder } from './main-work-order.interface';

@Controller('main-work-order')
export class MainWorkOrderController {
  constructor(private readonly mainWorkOrderService: MainWorkOrderService) {}
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
  async assignTask(): Promise<void> {
    await this.mainWorkOrderService.distributeTask();
  }

  @Post('update')
  async updateWorkOrder(@Body('id') id: number): Promise<IMainWorkOrder[]> {
    await this.mainWorkOrderService.updateReviwerWorkOrder(id);
    return this.mainWorkOrderService.findAllWorkOrder();
  }
}
