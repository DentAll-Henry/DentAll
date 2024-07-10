import {
  Body,
  Controller,
  FileTypeValidator,
  FileValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadDto } from './files.dto';
import { ValidationFile } from './Pipes/ValidationFile.pipe';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to Cloudinary' })
  @ApiResponse({ status: 200, description: 'Cloudinary response' })
  @ApiBody({
    description: 'Image to upload(only files .jpg, .jpeg, .png, .gif)',
    type: fileUploadDto,
  })
  uploadFile(
    @UploadedFile(ValidationFile) file: Express.Multer.File,
    @Body('path') path: string,
  ) {
    const fileInfo = {
      file,
      path,
    };
    return this.filesService.uploadFile(fileInfo);
  }

  @Get('images')
  getImages(@Body('folder') folder: string) {
    return this.filesService.getImages(folder);
  }
}
