import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { QuestRewardService } from './quest-reward.service'
import {QuestReward} from './quest-reward.entity'

@Controller('quest-reward')
export class QuestRewardController {
  constructor(private readonly questRewardService: QuestRewardService) {}

  @Get()
  findAll(): Promise<QuestReward[]> {
    return this.questRewardService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuestReward> {
    return this.questRewardService.findOne(id)
  }

  @Post()
  create(@Body() questReward: QuestReward): Promise<QuestReward> {
    return this.questRewardService.create(questReward)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() questReward: QuestReward): Promise<QuestReward> {
    return this.questRewardService.update(id, questReward)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.questRewardService.remove(id)
  }
}