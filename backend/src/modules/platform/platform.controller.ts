import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import { PlatformService } from './platform.service'
import {Platform} from './platform.entity'

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  findAll(): Promise<Platform[]> {
    return this.platformService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Platform> {
    return this.platformService.findOne(id)
  }

  @Post()
  create(@Body() platform: Platform): Promise<Platform> {
    return this.platformService.create(platform)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() platform: Platform): Promise<Platform> {
    return this.platformService.update(id, platform)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.platformService.remove(id)
  }
}