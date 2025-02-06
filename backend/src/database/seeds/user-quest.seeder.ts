import {UserQuest} from '../../modules/user-quest/user-quest.entity'
import {DataSource} from 'typeorm'

export class UserQuestSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const userQuestRepository = dataSource.getRepository(UserQuest)
    const userRepository = dataSource.getRepository('User')
    const questRepository = dataSource.getRepository('Quest')
    const recurrenceRepository = dataSource.getRepository('Recurrence')

    // Get first user, quest and recurrence for reference
    const user = await userRepository.findOne({where: {}})
    const quest = await questRepository.findOne({where: {}})
    const recurrence = await recurrenceRepository.findOne({where: {}})

    if (!user || !quest || !recurrence) {
      throw new Error('Users, Quests and Recurrences must be seeded first')
    }

    const userQuests = [
      {
        user_id: user.id,
        quest_id: quest.id,
        state: 1,
        start_date: new Date(),
        recurrence_id: recurrence.id,
      },
    ]

    await userQuestRepository.save(userQuests)
    console.log('User Quests seeded!')
  }
}