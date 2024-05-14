import { Injectable, Inject } from '@nestjs/common';
import { Primary } from './primary.model';

@Injectable()
export class PrimaryService {
  constructor(
    @Inject('PRIMARY_REPOSITORY')
    private readonly primaryRepository: typeof Primary,
  ) {}

  async createPrimary(createPrimaryDto: any): Promise<any> {
    // console.log('primarry dattta', createPrimaryDto);
    return await this.primaryRepository.create(createPrimaryDto);
  }

  async findAllPrimary(): Promise<Primary[]> {
    return await this.primaryRepository.findAll<Primary>();
  }

  async findOnePrimary(id: number): Promise<any> {
    return await this.primaryRepository.findOne<Primary>({ where: { id } });
  }

  async getWorkDetails(acc_id: number, team_id: number, customer_id: number) {
    return await this.primaryRepository.findOne<any>({
      where: { acc_id, team_id, customer_id },
    });
  }

  async updatePrimary(id: number, updatePrimaryDto: any): Promise<any> {
    return await this.primaryRepository.update<Primary>(updatePrimaryDto, {
      where: { id },
    });
  }

  async removePrimary(id: number): Promise<any> {
    return await this.primaryRepository.destroy({ where: { id } });
  }
}
