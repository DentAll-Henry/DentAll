import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto, toUpdateProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts() {
    const products = await this.productRepository.getProducts();
    if (products.length === 0) return "There aren't products in the database";
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new BadRequestException('Product not found22');
    return product;
  }

  async postProduct(product: ProductDto) {
    const existingProduct = await this.productRepository.getProductByName(
      product.name,
    );
    console.log(existingProduct);

    if (existingProduct) {
      throw new BadRequestException('Product already exists');
    }

    return this.productRepository.postProcut(product);
  }

  async editProduct(id: string, data: Partial<toUpdateProductDto>) {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new BadRequestException('Product not found');
    }
    return this.productRepository.editProduct(existingProduct, data);
  }

  async unassociateProduct(product: Product, quantity: number) {
    product.stock += quantity;
    return this.productRepository.saveProduct(product);
  }

  async deleteProduct(id: string) {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new BadRequestException('Product not found');
    }
    return this.productRepository.deleteProduct(id);
  }
}
