import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {TaskType} from './task-type.entity'

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectRepository(TaskType)
    private taskTypeRepository: Repository<TaskType>
  ) {}

  findAll(): Promise<TaskType[]> {
    return this.taskTypeRepository.find()
  }

  async findOne(id: string): Promise<TaskType> {
    const taskType = await this.taskTypeRepository.findOne({
      where: {id},
    })

    if (!taskType) {
      throw new Error(`TaskType with ID ${id} not found`)
    }

    return taskType
  }

  create(taskType: TaskType): Promise<TaskType> {
    return this.taskTypeRepository.save(taskType)
  }

  async update(id: string, taskType: TaskType): Promise<TaskType> {
    await this.taskTypeRepository.update(id, taskType)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.taskTypeRepository.delete(id)
  }
}
