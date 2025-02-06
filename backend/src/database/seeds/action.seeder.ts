import {Action} from '../../modules/action/action.entity'
import {DataSource} from 'typeorm'

export class ActionSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const actionRepository = dataSource.getRepository(Action)

    const actions = [
      {
        name: 'Install Game',
        state: 1,
      },
      {
        name: 'Follow Social Media',
        state: 1,
      },
      {
        name: 'Share Post',
        state: 1,
      },
      {
        name: 'Play Game',
        state: 1,
      },
    ]

    await actionRepository.save(actions)
    console.log('Actions seeded!')
  }
}