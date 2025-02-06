import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['user', 'quest', 'recurrence']
    })
  }

  async findOne(id: string): Promise<User> {
    const userQuest = await this.userRepository.findOne({
      where: { id },
      relations: ['user', 'quest', 'recurrence'],
    });
  
    if (!userQuest) {
      throw new Error(`User with ID ${id} not found`);
    }
  
    return userQuest;
  }  

  create(userQuest: User): Promise<User> {
    return this.userRepository.save(userQuest)
  }

  async update(id: string, userQuest: User): Promise<User> {
    await this.userRepository.update(id, userQuest)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}