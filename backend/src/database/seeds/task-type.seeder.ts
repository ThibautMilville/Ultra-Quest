import {TaskType} from '../../modules/task-type/task-type.entity'
import {DataSource} from 'typeorm'

export class TaskTypeSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const taskTypeRepository = dataSource.getRepository(TaskType)

    const taskTypes = [
      {
        name: 'Installation',
        subtitle: 'Install the game',
        state: 1,
        logo: 'install-logo.png'
      },
      {
        name: 'Social',
        subtitle: 'Social media tasks',
        state: 1,
        logo: 'social-logo.png'
      },
      {
        name: 'Achievement',
        subtitle: 'In-game achievements',
        state: 1,
        logo: 'achievement-logo.png'
      }
    ]

    await taskTypeRepository.save(taskTypes)
    console.log('Task Types seeded!')
  }
}