import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  getProducts() {
    return this.productRepo.find();
  }

  getProductById(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  getProductByName(name: string) {
    return this.productRepo.findOne({ where: { name } });
  }

  async postProcut(product: ProductDto) {
    try {
      const producto = this.productRepo.create(product);
      return this.productRepo.save(producto);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el producto');
    }
  }

  async editProduct(product: Product, data: Partial<ProductDto>) {
    try {
      return (await this.productRepo.update(product, data))
        ? 'Produco editado correctamente'
        : 'Producto no encontrado';
    } catch (error) {
      throw new InternalServerErrorException('No se pudo editar el producto');
    }
  }

  saveProduct(existingProduct: Product) {
    return this.productRepo.save(existingProduct);
  }

  deleteProduct(id: string) {
    try {
      this.productRepo.delete({ id });
      return 'Producto eliminado correctamente';
    } catch (error) {
      throw new InternalServerErrorException('No se pudo borrar el producto');
    }
  }
}
