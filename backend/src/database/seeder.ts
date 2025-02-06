import dataSource from '../ormconfig'
import { seeders } from './seeds'

async function runSeeders() {
  try {
    const initializedDataSource = await dataSource.initialize()
    console.log('Data Source initialized.')
    
    for (const SeederClass of seeders as { new (): { run: (dataSource: any) => Promise<void> }; name: string }[]) {
      const seeder = new SeederClass()
      console.log(`Running ${SeederClass.name}...`)
      await seeder.run(initializedDataSource)
    }
    console.log('All seeders completed successfully.')
  } catch (error) {
    console.error('Error while running seeders:', error)
  } finally {
    await dataSource.destroy()
    console.log('Data Source destroyed.')
  }
}

runSeeders()