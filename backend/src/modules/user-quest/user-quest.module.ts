import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserQuest} from './user-quest.entity'
import {UserQuestService} from './user-quest.service'
import {UserQuestController} from './user-quest.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserQuest])],
  providers: [UserQuestService],
  controllers: [UserQuestController],
  exports: [UserQuestService],
})
export class UserQuestModule {}