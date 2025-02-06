import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Task} from './task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['platform', 'quest'],
    })
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {id},
      relations: ['platform', 'quest'],
    })

    if (!task) {
      throw new Error(`UserQuest with ID ${id} not found`)
    }

    return task
  }

  create(task: Task): Promise<Task> {
    return this.taskRepository.save(task)
  }

  async update(id: string, task: Task): Promise<Task> {
    await this.taskRepository.update(id, task)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id)
  }
}
