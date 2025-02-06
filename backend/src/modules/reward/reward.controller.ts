import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { RewardService } from './reward.service'
import {Reward} from './reward.entity'

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  findAll(): Promise<Reward[]> {
    return this.rewardService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reward> {
    return this.rewardService.findOne(id)
  }

  @Post()
  create(@Body() reward: Reward): Promise<Reward> {
    return this.rewardService.create(reward)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reward: Reward): Promise<Reward> {
    return this.rewardService.update(id, reward)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rewardService.remove(id)
  }
}