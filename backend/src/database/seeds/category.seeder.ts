import {Category} from '../../modules/category/category.entity'
import {DataSource} from 'typeorm'

export class CategorySeeder {
  async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category)

    const categories = [
      {
        name: 'ashes-of-mankind',
        title: 'Ashes of Mankind',
        subtitle: 'Epic fantasy MMORPG',
        image: 'ashes-banner.jpg',
        logo: 'ashes-logo.png',
        start_date: new Date(),
        state: 1,
      },
      {
        name: 'ultra-rewards',
        title: 'Ultra Rewards',
        subtitle: 'Platform rewards and achievements',
        image: 'ultra-banner.jpg',
        logo: 'ultra-logo.png',
        start_date: new Date(),
        state: 1,
      },
    ]

    await categoryRepository.save(categories)
    console.log('Categories seeded!')
  }
}
