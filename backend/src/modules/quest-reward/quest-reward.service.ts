import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {QuestReward} from './quest-reward.entity'

@Injectable()
export class QuestRewardService {
  constructor(
    @InjectRepository(QuestReward)
    private questRewardRepository: Repository<QuestReward>
  ) {}

  findAll(): Promise<QuestReward[]> {
    return this.questRewardRepository.find({
      relations: ['quest', 'reward'],
    })
  }

  async findOne(id: string): Promise<QuestReward> {
    const questReward = await this.questRewardRepository.findOne({
      where: {id},
      relations: ['quest', 'reward'],
    })

    if (!questReward) {
      throw new Error(`UserQuest with ID ${id} not found`)
    }

    return questReward
  }

  create(questReward: QuestReward): Promise<QuestReward> {
    return this.questRewardRepository.save(questReward)
  }

  async update(id: string, questReward: QuestReward): Promise<QuestReward> {
    await this.questRewardRepository.update(id, questReward)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.questRewardRepository.delete(id)
  }
}
