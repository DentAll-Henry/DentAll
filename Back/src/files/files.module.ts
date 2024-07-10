import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { cloudinaryConfig } from 'src/config/cloudinary-config';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService, cloudinaryConfig],
  exports: [FilesService],
})
export class FilesModule {}
