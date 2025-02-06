import {RewardType} from '../../modules/reward-type/reward-type.entity'
import {DataSource} from 'typeorm'

export class RewardTypeSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const rewardTypeRepository = dataSource.getRepository(RewardType)

    const rewardTypes = [
      {
        name: 'Gems',
        url: 'gems-icon.png',
        state: 1,
      },
      {
        name: 'NFT',
        url: 'nft-icon.png',
        state: 1,
      },
      {
        name: 'In-game Item',
        url: 'item-icon.png',
        state: 1,
      },
    ]

    await rewardTypeRepository.save(rewardTypes)
    console.log('Reward Types seeded!')
  }
}