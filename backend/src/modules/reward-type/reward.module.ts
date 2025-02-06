import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import { RewardType } from './reward-type.entity'
import {RewardTypeService} from './reward-type.service'
import {RewardTypeController} from './reward-type.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RewardType])],
  providers: [RewardTypeService],
  controllers: [RewardTypeController],
  exports: [RewardTypeService],
})
export class RewardTypeModule {}