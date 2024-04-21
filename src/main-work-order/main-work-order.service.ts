import { ReviewerWorkOrder } from './../reviewer-work-order/reviewer-work-order.model';
import { Injectable, Inject } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { ReviewerWorkOrderService } from 'src/reviewer-work-order/reviewer-work-order.service';

@Injectable()
export class MainWorkOrderService {
  constructor() {}
  @Inject('MAIN_WORKORDER_REPOSITORY')
  private readonly mainWorkOrderModel: typeof MainWorkOrder;
  @Inject('REVIEWER_WORKORDER_REPOSITORY')
  private readonly reviewerWorkOrderModel: typeof ReviewerWorkOrder;

  async findCompletedReviewerWorkOrder(): Promise<ReviewerWorkOrder[]> {
    return this.reviewerWorkOrderModel.findAll({
      where: { status: 'checked' },
    });
  }
  async createMainWorkOrder(
    mainWorkOrder: IMainWorkOrder,
  ): Promise<MainWorkOrder> {
    return this.mainWorkOrderModel.create(mainWorkOrder);
  }
}
