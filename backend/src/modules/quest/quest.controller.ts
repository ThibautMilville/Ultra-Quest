import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { QuestService } from './quest.service'
import {Quest} from './quest.entity'

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get()
  findAll(): Promise<Quest[]> {
    return this.questService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quest> {
    return this.questService.findOne(id)
  }

  @Post()
  create(@Body() quest: Quest): Promise<Quest> {
    return this.questService.create(quest)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() quest: Quest): Promise<Quest> {
    return this.questService.update(id, quest)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.questService.remove(id)
  }
}