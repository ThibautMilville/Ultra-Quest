import * as dotenv from 'dotenv'
dotenv.config()
import {DataSource} from 'typeorm'
import {databaseConfig} from './config/database.config'

export default new DataSource(databaseConfig)