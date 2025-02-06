import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.entity';


@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }

  // @Get()
  // findAll(): Promise<Test[]> {
  //   return this.testService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.testService.findOne(+id);
  // }

  // @Post()
  // create(@Body()) {
  //   return this.testService.create(createTestDto);
  // }


  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
  //   return this.testService.update(+id, updateTestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.testService.remove(+id);
  // }
}
