import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {UserQuest} from './user-quest.entity'

@Injectable()
export class UserQuestService {
  constructor(
    @InjectRepository(UserQuest)
    private userQuestRepository: Repository<UserQuest>
  ) {}

  findAll(): Promise<UserQuest[]> {
    return this.userQuestRepository.find({
      relations: ['user', 'quest', 'recurrence']
    })
  }

  async findOne(id: string): Promise<UserQuest> {
    const userQuest = await this.userQuestRepository.findOne({
      where: { id },
      relations: ['user', 'quest', 'recurrence'],
    });
  
    if (!userQuest) {
      throw new Error(`UserQuest with ID ${id} not found`);
    }
  
    return userQuest;
  }  

  create(userQuest: UserQuest): Promise<UserQuest> {
    return this.userQuestRepository.save(userQuest)
  }

  async update(id: string, userQuest: UserQuest): Promise<UserQuest> {
    await this.userQuestRepository.update(id, userQuest)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userQuestRepository.delete(id)
  }
}