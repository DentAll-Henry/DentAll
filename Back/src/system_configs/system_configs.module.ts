import { Module } from '@nestjs/common';
import { SystemConfigsService } from './system_configs.service';
import { SystemConfigsController } from './system_configs.controller';
import { SystemConfigsRepository } from './system_configs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from './entities/system_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfig])],
  controllers: [SystemConfigsController],
  providers: [SystemConfigsService, SystemConfigsRepository],
  exports: [SystemConfigsService, SystemConfigsRepository]
})
export class SystemConfigsModule {}
