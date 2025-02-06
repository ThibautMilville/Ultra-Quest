import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {QuestReward} from './quest-reward.entity'
import {QuestRewardService} from './quest-reward.service'
import {QuestRewardController} from './quest-reward.controller'

@Module({
  imports: [TypeOrmModule.forFeature([QuestReward])],
  providers: [QuestRewardService],
  controllers: [QuestRewardController],
  exports: [QuestRewardService],
})
export class QuestRewardModule {}