import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Recurrence} from './recurrence.entity'

@Injectable()
export class RecurrenceService {
  constructor(
    @InjectRepository(Recurrence)
    private recurrenceRepository: Repository<Recurrence>
  ) {}

  findAll(): Promise<Recurrence[]> {
    return this.recurrenceRepository.find({
      relations: ['parent', 'children', 'quests', 'userQuests'],
    })
  }

  async findOne(id: string): Promise<Recurrence> {
    const recurrence = await this.recurrenceRepository.findOne({
      where: {id},
      relations: ['parent', 'children', 'quests', 'userQuests'],
    })

    if (!recurrence) {
      throw new Error(`Recurrence with ID ${id} not found`)
    }

    return recurrence
  }

  create(recurrence: Recurrence): Promise<Recurrence> {
    return this.recurrenceRepository.save(recurrence)
  }

  async update(id: string, recurrence: Recurrence): Promise<Recurrence> {
    await this.recurrenceRepository.update(id, recurrence)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.recurrenceRepository.delete(id)
  }
}
