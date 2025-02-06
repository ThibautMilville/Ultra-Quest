import { NestFactory } from '@nestjs/core';
import { TestModule } from './modules/test/test.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TestModule)
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useStaticAssets(join(__dirname, '..', 'public'))

  await app.listen(4000)
}
bootstrap();