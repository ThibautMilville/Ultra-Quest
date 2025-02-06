import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Platform} from './platform.entity'

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>
  ) {}

  findAll(): Promise<Platform[]> {
    return this.platformRepository.find({
      relations: ['tasks'],
    })
  }

  async findOne(id: string): Promise<Platform> {
    const platform = await this.platformRepository.findOne({
      where: {id},
      relations: ['tasks'],
    })

    if (!platform) {
      throw new Error(`Platform with ID ${id} not found`)
    }

    return platform
  }

  create(platform: Platform): Promise<Platform> {
    return this.platformRepository.save(platform)
  }

  async update(id: string, platform: Platform): Promise<Platform> {
    await this.platformRepository.update(id, platform)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.platformRepository.delete(id)
  }
}
