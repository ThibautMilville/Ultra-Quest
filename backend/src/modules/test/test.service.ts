import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(): string {
    return 'Hello World!';
  }
  // create() {
  //   return 'This action adds a new test';
  // }

  // findAll() {
  //   return `This action returns all test`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} test`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} test`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} test`;
  // }
}
