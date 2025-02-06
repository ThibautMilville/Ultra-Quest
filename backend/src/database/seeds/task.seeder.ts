import {Task} from '../../modules/task/task.entity'
import {DataSource} from 'typeorm'

export class TaskSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const taskRepository = dataSource.getRepository(Task)
    const platformRepository = dataSource.getRepository('Platform')
    const questRepository = dataSource.getRepository('Quest')

    // Get first platform and quest for reference
    const platform = await platformRepository.findOne({where: {}})
    const quest = await questRepository.findOne({where: {}})

    if (!platform || !quest) {
      throw new Error('Platforms and Quests must be seeded first')
    }

    const tasks = [
      {
        name: 'Install Ashes of Mankind',
        description: 'Download and install the game from the official website',
        state: 1,
        type_id: 1, // Installation type
        platform_id: platform.id,
        action_id: 1, // Install Game action
        order: 1,
        quest_id: quest.id,
      },
      {
        name: 'Follow on Twitter',
        description: 'Follow @ultra_io on Twitter',
        state: 1,
        type_id: 2, // Social type
        platform_id: platform.id,
        action_id: 2, // Follow Social Media action
        order: 1,
        quest_id: quest.id,
      },
    ]

    await taskRepository.save(tasks)
    console.log('Tasks seeded!')
  }
}