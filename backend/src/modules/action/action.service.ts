import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Action} from './action.entity'

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>
  ) {}

  findAll(): Promise<Action[]> {
    return this.actionRepository.find()
  }

  async findOne(id: string): Promise<Action> {
    const action = await this.actionRepository.findOne({
      where: {id},
      relations: ['parent', 'children', 'quests'],
    })

    if (!action) {
      throw new Error(`Action with ID ${id} not found`)
    }

    return action
  }

  create(action: Action): Promise<Action> {
    return this.actionRepository.save(action)
  }

  async update(id: string, action: Action): Promise<Action> {
    await this.actionRepository.update(id, action)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.actionRepository.delete(id)
  }
}
