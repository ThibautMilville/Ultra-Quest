import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Quest} from './quest.entity'
import {QuestService} from './quest.service'
import {QuestController} from './quest.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Quest])],
  providers: [QuestService],
  controllers: [QuestController],
  exports: [QuestService],
})
export class QuestModule {}