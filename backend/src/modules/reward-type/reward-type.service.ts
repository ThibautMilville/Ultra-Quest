import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { RewardType } from './reward-type.entity'

@Injectable()
export class RewardTypeService {
  constructor(
    @InjectRepository(RewardType)
    private rewardTypeRepository: Repository<RewardType>
  ) {}

  findAll(): Promise<RewardType[]> {
    return this.rewardTypeRepository.find()
  }

  async findOne(id: string): Promise<RewardType> {
    const rewardType = await this.rewardTypeRepository.findOne({
      where: { id },
    });
  
    if (!rewardType) {
      throw new Error(`RewardType with ID ${id} not found`);
    }
  
    return rewardType;
  }  

  create(rewardType: RewardType): Promise<RewardType> {
    return this.rewardTypeRepository.save(rewardType)
  }

  async update(id: string, rewardType: RewardType): Promise<RewardType> {
    await this.rewardTypeRepository.update(id, rewardType)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.rewardTypeRepository.delete(id)
  }
}