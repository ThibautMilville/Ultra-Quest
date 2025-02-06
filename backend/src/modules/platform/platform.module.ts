import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Platform} from './platform.entity'
import {PlatformService} from './platform.service'
import {PlatformController} from './platform.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  providers: [PlatformService],
  controllers: [PlatformController],
  exports: [PlatformService],
})
export class PlatformModule {}