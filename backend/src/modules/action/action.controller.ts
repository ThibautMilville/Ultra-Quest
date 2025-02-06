import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { ActionService } from './action.service'
import {Action} from './action.entity'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  findAll(): Promise<Action[]> {
    return this.actionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Action> {
    return this.actionService.findOne(id)
  }

  @Post()
  create(@Body() action: Action): Promise<Action> {
    return this.actionService.create(action)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() action: Action): Promise<Action> {
    return this.actionService.update(id, action)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.actionService.remove(id)
  }
}