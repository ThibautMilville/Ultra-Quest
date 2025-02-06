import {User} from '../../modules/user/user.entity'
import {DataSource} from 'typeorm'

export class UserSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User)

    const users = [
      {
        wallet_id: '0x1234567890abcdef1234567890abcdef12345678',
      },
      {
        wallet_id: '0xabcdef1234567890abcdef1234567890abcdef12',
      },
    ]

    await userRepository.save(users)
    console.log('Users seeded!')
  }
}