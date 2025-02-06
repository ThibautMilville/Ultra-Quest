import {Platform} from '../../modules/platform/platform.entity'
import {DataSource} from 'typeorm'

export class PlatformSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const platformRepository = dataSource.getRepository(Platform)

    const platforms = [
      {
        name: 'Ultra',
        icon: 'ultra-icon.png',
        state: 1,
      },
      {
        name: 'Steam',
        icon: 'steam-icon.png',
        state: 1,
      },
      {
        name: 'Epic Games',
        icon: 'epic-icon.png',
        state: 1,
      },
    ]

    await platformRepository.save(platforms)
    console.log('Platforms seeded!')
  }
}