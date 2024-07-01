import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SystemConfigsService } from 'src/system_configs/system_configs.service';
import { SystemConfigsRepository } from 'src/system_configs/system_configs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from 'src/system_configs/entities/system_config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemConfig])
  ],
  providers: [MailService, SystemConfigsService, SystemConfigsRepository],
  exports: [MailService],
})
export class MailModule {}
