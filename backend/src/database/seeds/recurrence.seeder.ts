import {Recurrence} from '../../modules/recurrence/recurrence.entity'
import {DataSource} from 'typeorm'

export class RecurrenceSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const recurrenceRepository = dataSource.getRepository(Recurrence)

    const recurrences = [
      {
        type: 1, // Daily
        params: JSON.stringify({time: '00:00'}),
        start_date: new Date(),
        repeat_iteration: 1,
        state: 1
      },
      {
        type: 2, // Weekly
        params: JSON.stringify({day: 1}), // Monday
        start_date: new Date(),
        repeat_iteration: 1,
        state: 1
      }
    ]

    await recurrenceRepository.save(recurrences)
    console.log('Recurrences seeded!')
  }
}