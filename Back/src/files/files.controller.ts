import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadDto } from './files.dto';
import { ValidationFile } from './Pipes/ValidationFile.pipe';
import { DRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/role/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/role/guards/roles.guard';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @Post('upload')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiBearerAuth()
  @Post('images')
  @DRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get images from Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'Return the secure url of the image',
  })
  @ApiBadRequestResponse({ description: 'Cloudinary response' })
  @ApiBody({
    description: 'Folder path',
    schema: {
      type: 'object',
      properties: {
        folder: {
          type: 'string',
          example: 'DentAll/admin-me-com',
        },
      },
    },
  })
  getImages(@Body('folder') folder: string) {
    return this.filesService.getImages(folder);
  }
}
