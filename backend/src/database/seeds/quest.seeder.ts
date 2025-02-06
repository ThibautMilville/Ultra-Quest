import {Quest} from '../../modules/quest/quest.entity'
import {DataSource} from 'typeorm'

export class QuestSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const questRepository = dataSource.getRepository(Quest)
    const categoryRepository = dataSource.getRepository('Category')
    const recurrenceRepository = dataSource.getRepository('Recurrence')

    // Get first category and recurrence for reference
    const category = await categoryRepository.findOne({where: {}})
    const recurrence = await recurrenceRepository.findOne({where: {}})

    if (!category || !recurrence) {
      throw new Error('Categories and Recurrences must be seeded first')
    }

    const quests = [
      {
        title: 'Ready for battle',
        description: 'Install Ashes of Mankind and prepare for adventure!',
        image: 'quest-install.jpg',
        params: JSON.stringify({gems: 50, xp: 100}),
        state: 1,
        start_date: new Date(),
        single: 'true',
        type: 1,
        category_id: category.id,
        recurrence_id: recurrence.id,
      },
    ]

    await questRepository.save(quests)
    console.log('Quests seeded!')
  }
}
