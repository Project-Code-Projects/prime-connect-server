import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReviewerWorkOrderService } from './reviewer-work-order.service';
import { IReviewerWorkOrder } from './reviewer-work-order.interface';

@Controller('reviewer-work-order')
export class ReviewerWorkOrderController {
  constructor(private readonly revWorkOrderService: ReviewerWorkOrderService) {}
  @Post('update-status/reviewer')
  async updateStatusreviewer(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IReviewerWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.revWorkOrderService.updateStatusReviewer(id);
    return this.revWorkOrderService.findAllWorkOrder();
  }
  @Post('update-status/maker')
  async updateStatusmaker(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IReviewerWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.revWorkOrderService.updateStatusMaker(id);
    return this.revWorkOrderService.findAllWorkOrder();
  }

  @Get()
  async findAllWorkOrder(): Promise<IReviewerWorkOrder[]> {
    return this.revWorkOrderService.findAllWorkOrder();
  }

  @Post('assign-task')
  async assignTask(): Promise<void> {
    await this.revWorkOrderService.distributeTask();
  }

  @Post('update')
  async updateWorkOrder(@Body('id') id: number): Promise<IReviewerWorkOrder[]> {
    await this.revWorkOrderService.updateReviwerWorkOrder(id);
    return this.revWorkOrderService.findAllWorkOrder();
  }
}
