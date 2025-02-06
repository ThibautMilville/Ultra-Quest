import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Quest} from './quest.entity'

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private questRepository: Repository<Quest>
  ) {}

  findAll(): Promise<Quest[]> {
    return this.questRepository.find({
      relations: ['category', 'recurrence', 'tasks', 'userQuests', 'questRewards'],
    })
  }

  async findOne(id: string): Promise<Quest> {
    const quest = await this.questRepository.findOne({
      where: {id},
      relations: ['category', 'recurrence', 'tasks', 'userQuests', 'questRewards'],
    })

    if (!quest) {
      throw new Error(`UserQuest with ID ${id} not found`)
    }

    return quest
  }

  create(quest: Quest): Promise<Quest> {
    return this.questRepository.save(quest)
  }

  async update(id: string, quest: Quest): Promise<Quest> {
    await this.questRepository.update(id, quest)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.questRepository.delete(id)
  }
}
