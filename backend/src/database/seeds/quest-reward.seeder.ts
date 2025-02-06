import {QuestReward} from '../../modules/quest-reward/quest-reward.entity'
import {DataSource} from 'typeorm'

export class QuestRewardSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const questRewardRepository = dataSource.getRepository(QuestReward)
    const questRepository = dataSource.getRepository('Quest')
    const rewardRepository = dataSource.getRepository('Reward')

    // Get first quest and reward for reference
    const quest = await questRepository.findOne({where: {}})
    const reward = await rewardRepository.findOne({where: {}})

    if (!quest || !reward) {
      throw new Error('Quests and Rewards must be seeded first')
    }

    const questRewards = [
      {
        quest_id: quest.id,
        reward_id: reward.id,
      },
    ]

    await questRewardRepository.save(questRewards)
    console.log('Quest Rewards seeded!')
  }
}