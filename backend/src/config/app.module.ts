// src/app.module.ts
import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {databaseConfig} from './database.config'
import {ConfigModule} from '@nestjs/config'
// Import all modules
import {ActionModule} from '../modules/action/action.module'
import {CategoryModule} from '../modules/category/category.module'
import {PlatformModule} from '../modules/platform/platform.module'
import {QuestModule} from '../modules/quest/quest.module'
import {RecurrenceModule} from '../modules/recurrence/recurrence.module'
import {RewardModule} from '../modules/reward/reward.module'
import {TaskModule} from '../modules/task/task.module'
import {UserModule} from '../modules/user/user.module'
import {TaskTypeModule} from '../modules/task-type/task-type.module'
import {TestModule} from '../modules/test/test.module'
import {RewardTypeModule} from '../modules/reward-type/reward.module'
import {QuestRewardModule} from '../modules/quest-reward/quest-reward.module'
import {UserQuestModule} from '../modules/user-quest/user-quest.module'

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRoot(databaseConfig), TestModule, ActionModule, CategoryModule, PlatformModule, QuestModule, RecurrenceModule, RewardModule, TaskModule, UserModule, TaskTypeModule, RewardTypeModule, QuestRewardModule, UserQuestModule],
})
export class AppModule {}