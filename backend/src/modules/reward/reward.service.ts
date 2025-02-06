import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Reward} from './reward.entity'

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>
  ) {}

  findAll(): Promise<Reward[]> {
    return this.rewardRepository.find({
      relations: ['questRewards'],
    })
  }

  async findOne(id: string): Promise<Reward> {
    const reward = await this.rewardRepository.findOne({
      where: {id},
    })

    if (!reward) {
      throw new Error(`UserQuest with ID ${id} not found`)
    }

    return reward
  }

  create(reward: Reward): Promise<Reward> {
    return this.rewardRepository.save(reward)
  }

  async update(id: string, reward: Reward): Promise<Reward> {
    await this.rewardRepository.update(id, reward)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.rewardRepository.delete(id)
  }
}
