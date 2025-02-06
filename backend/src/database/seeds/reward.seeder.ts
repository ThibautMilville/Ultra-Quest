import {Reward} from '../../modules/reward/reward.entity'
import {DataSource} from 'typeorm'

export class RewardSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rewardRepository = dataSource.getRepository(Reward)

    const rewards = [
      {
        type: 1, // Gems
        params: JSON.stringify({amount: 50}),
      },
      {
        type: 2, // NFT
        params: JSON.stringify({
          name: 'Trailblazer Backpack Skin',
          description: 'Exclusive backpack skin for early adopters',
        }),
      },
      {
        type: 3, // In-game Item
        params: JSON.stringify({
          itemId: 'hair-color-dual',
          name: 'Blue & Pink Hair Color',
        }),
      },
    ]

    await rewardRepository.save(rewards)
    console.log('Rewards seeded!')
  }
}