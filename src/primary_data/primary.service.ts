import { Injectable,Inject } from "@nestjs/common";
import { Primary } from "./primary.model";

@Injectable()
export class PrimaryService {
  constructor(
    @Inject('PRIMARY_REPOSITORY')
    private readonly primaryRepository: typeof Primary,
  ) {}

  async createPrimary(createPrimaryDto: any): Promise<any> {
    return await this.primaryRepository.bulkCreate<Primary>([createPrimaryDto]);
  }

  async findAllPrimary(): Promise<Primary[]> {
    return await this.primaryRepository.findAll<Primary>();
  }

  async findOnePrimary(id: number): Promise<any> {
    return await this.primaryRepository.findOne<Primary>({ where: { id } });
  }

  async updatePrimary(id: number, updatePrimaryDto: any): Promise<any> {
    return await this.primaryRepository.update<Primary>(updatePrimaryDto, { where: { id } });
  }

  async removePrimary(id: number): Promise<any> {
    return await this.primaryRepository.destroy({ where: { id } });
  }
}