import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all products' })
  // @ApiResponse({ status: 200, type: [Product] })
  // @ApiBadRequestResponse({ status: 404, description: 'There are no products' })
  // getProducts() {
  //   return this.productService.getProducts();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get one product' })
  // @ApiResponse({ status: 200, type: Product })
  // @ApiBadRequestResponse({ status: 404, description: 'Product not found' })
  // getProductById(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.productService.getProductById(id);
  // }

  // @Post('create')
  // @ApiBody({ type: ProductDto })
  // @ApiOperation({ summary: 'Create a new product' })
  // @ApiResponse({ status: 201, type: Product })
  // @ApiBadRequestResponse({ status: 404, description: "Can't create product" })
  // postProduct(@Body() product: ProductDto) {
  //   return this.productService.postProduct(product);
  // }

  // @Patch('edit/:id')
  // @ApiBody({ type: ProductDto })
  // @ApiParam({ name: 'id', type: String })
  // @ApiOperation({ summary: 'Edit a product' })
  // @ApiResponse({ status: 200, type: Product })
  // @ApiBadRequestResponse({ status: 404, description: "Can't edit product" })
  // editProduct(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body()
  //   data: Partial<ProductDto>,
  // ) {
  //   return this.productService.editProduct(id, data);
  // }

  // @Delete('delete/:id')
  // @ApiParam({ name: 'id', type: String })
  // @ApiOperation({ summary: 'Delete a product' })
  // @ApiResponse({ status: 200, type: Product })
  // @ApiBadRequestResponse({ status: 404, description: "Can't delete product" })
  // deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.productService.deleteProduct(id);
  // }
}
