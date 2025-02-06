import {CategorySeeder} from './category.seeder'
import {PlatformSeeder} from './platform.seeder'
import {RecurrenceSeeder} from './recurrence.seeder'
import {TaskTypeSeeder} from './task-type.seeder'
import {ActionSeeder} from './action.seeder'
import {RewardTypeSeeder} from './reward-type.seeder'
import {RewardSeeder} from './reward.seeder'
import {UserSeeder} from './user.seeder'
import {QuestSeeder} from './quest.seeder'
import {TaskSeeder} from './task.seeder'
import {QuestRewardSeeder} from './quest-reward.seeder'
import {UserQuestSeeder} from './user-quest.seeder'

// Export seeders in the order they should be executed
export const seeders = [
  // Independent entities first
  CategorySeeder,
  PlatformSeeder,
  RecurrenceSeeder,
  TaskTypeSeeder,
  ActionSeeder,
  RewardTypeSeeder,

  // Entities with simple dependencies
  RewardSeeder,
  UserSeeder,

  // Complex entities with multiple dependencies
  QuestSeeder, // Depends on Category and Recurrence
  TaskSeeder, // Depends on Platform and Quest
  QuestRewardSeeder, // Depends on Quest and Reward
  UserQuestSeeder, // Depends on User, Quest and Recurrence
]