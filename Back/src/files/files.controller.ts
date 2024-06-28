import {
  Controller,
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/i }),
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: 'The file exceeds the maximum allowed size of 200KB',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }
}
