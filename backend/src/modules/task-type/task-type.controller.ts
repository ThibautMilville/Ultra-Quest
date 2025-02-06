import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { TaskTypeService } from './task-type.service'
import {TaskType} from './task-type.entity'

@Controller('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Get()
  findAll(): Promise<TaskType[]> {
    return this.taskTypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskType> {
    return this.taskTypeService.findOne(id)
  }

  @Post()
  create(@Body() taskType: TaskType): Promise<TaskType> {
    return this.taskTypeService.create(taskType)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskType: TaskType): Promise<TaskType> {
    return this.taskTypeService.update(id, taskType)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.taskTypeService.remove(id)
  }
}