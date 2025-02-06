import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {TaskType} from './task-type.entity'
import { TaskTypeService } from './task-type.service'
import {TaskTypeController} from './task-type.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  providers: [TaskTypeService],
  controllers: [TaskTypeController],
  exports: [TaskTypeService],
})
export class TaskTypeModule {}