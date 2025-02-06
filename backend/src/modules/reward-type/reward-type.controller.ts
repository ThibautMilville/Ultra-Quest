import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { RewardTypeService } from './reward-type.service'
import { RewardType } from './reward-type.entity'

@Controller('reward-type')
export class RewardTypeController {
  constructor(private readonly rewardTypeService: RewardTypeService) {}

  @Get()
  findAll(): Promise<RewardType[]> {
    return this.rewardTypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RewardType> {
    return this.rewardTypeService.findOne(id)
  }

  @Post()
  create(@Body() rewardType: RewardType): Promise<RewardType> {
    return this.rewardTypeService.create(rewardType)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() rewardType: RewardType): Promise<RewardType> {
    return this.rewardTypeService.update(id, rewardType)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rewardTypeService.remove(id)
  }
}