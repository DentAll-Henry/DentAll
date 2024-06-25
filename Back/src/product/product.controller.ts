import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id);
  }

  @Post('create')
  postProduct(@Body() product: ProductDto) {
    return this.productService.postProduct(product);
  }

  @Post('edit/:id')
  editProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    data: Partial<ProductDto>,
  ) {
    return this.productService.editProduct(id, data);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProduct(id);
  }
}
