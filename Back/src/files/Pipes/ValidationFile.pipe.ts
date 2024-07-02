import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const ValidationFile = new ParseFilePipe({
  validators: [
    new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/i }),
    new MaxFileSizeValidator({
      maxSize: 200 * 1024,
      message: 'The file exceeds the maximum allowed size of 200KB',
    }),
  ],
});
