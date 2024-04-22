import { MainWorkOrder } from './../main-work-order/main-work-order.model';
import { Injectable, Inject } from '@nestjs/common';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { DistributeWorkOrder } from './distribute-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';

@Injectable()
export class DistributeWorkOrderService {
  constructor() {}
  @Inject('DISTRIBUTE_WORKORDER_REPOSITORY')
  private readonly distributeWorkOrderModel: typeof DistributeWorkOrder;
  @Inject('MAIN_WORKORDER_REPOSITORY')
  private readonly mainWorkOrderModel: typeof MainWorkOrder;

  async findCompletedMainWorkOrder(): Promise<MainWorkOrder[]> {
    return this.mainWorkOrderModel.findAll({
      where: { status: 'checked' },
    });
  }
  async createMainWorkOrder(
    distributeWorkOrder: IDistributeWorkOrder,
  ): Promise<DistributeWorkOrder> {
    return this.distributeWorkOrderModel.create(distributeWorkOrder);
  }
}
