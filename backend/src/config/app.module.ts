// src/app.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestModule } from '../modules/test/test.module'
import { databaseConfig } from './database.config'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot(databaseConfig),
    TestModule,
  ],
})

export class AppModule { }