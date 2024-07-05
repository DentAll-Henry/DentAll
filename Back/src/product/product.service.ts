import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto, toUpdateProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts() {
    const products = await this.productRepository.getProducts();
    if (products.length === 0)
      return 'Todavía no hay productos en la base de datos';
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.getProductById(id);
    if (!product)
      throw new BadRequestException(
        `No se encontro el producto con el id ${id}`,
      );
    return product;
  }

  async postProduct(product: ProductDto) {
    const existingProduct = await this.productRepository.getProductByName(
      product.name,
    );

    if (existingProduct) {
      throw new BadRequestException(`El producto ${product.name} ya existe`);
    }

    return this.productRepository.postProcut(product);
  }

  async editProduct(id: string, data: Partial<toUpdateProductDto>) {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new BadRequestException('No se encontro el producto');
    }
    return this.productRepository.editProduct(existingProduct, data);
  }

  async unassociateProduct(product: Product[], quantity: number) {
    product[0].stock += quantity;
    return this.productRepository.saveProduct(product[0]);
  }

  async deleteProduct(id: string) {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new BadRequestException('Producto no encontrado');
    }
    return this.productRepository.deleteProduct(id);
  }
}
