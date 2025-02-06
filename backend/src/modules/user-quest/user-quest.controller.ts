import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { UserQuestService } from './user-quest.service'
import {UserQuest} from './user-quest.entity'

@Controller('user-quest')
export class UserQuestController {
  constructor(private readonly userQuestService: UserQuestService) {}

  @Get()
  findAll(): Promise<UserQuest[]> {
    return this.userQuestService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserQuest> {
    return this.userQuestService.findOne(id)
  }

  @Post()
  create(@Body() userQuest: UserQuest): Promise<UserQuest> {
    return this.userQuestService.create(userQuest)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userQuest: UserQuest): Promise<UserQuest> {
    return this.userQuestService.update(id, userQuest)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userQuestService.remove(id)
  }
}