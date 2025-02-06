import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { RecurrenceService } from './recurrence.service'
import {Recurrence} from './recurrence.entity'

@Controller('recurrence')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Get()
  findAll(): Promise<Recurrence[]> {
    return this.recurrenceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recurrence> {
    return this.recurrenceService.findOne(id)
  }

  @Post()
  create(@Body() recurrence: Recurrence): Promise<Recurrence> {
    return this.recurrenceService.create(recurrence)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() recurrence: Recurrence): Promise<Recurrence> {
    return this.recurrenceService.update(id, recurrence)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recurrenceService.remove(id)
  }
}