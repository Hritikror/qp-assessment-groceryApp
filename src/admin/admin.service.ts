import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductQaunDto } from './dto/update-product-inventory.dto';

@Injectable()
export class AdminService {
    
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
      ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = new Product();
        console.log(createProductDto)

        newProduct.title = createProductDto.title
        newProduct.imagePath = createProductDto.imagePath
        newProduct.decription = createProductDto.decription
        newProduct.price = createProductDto.price
        newProduct.quantityAvailable = createProductDto.quantityAvailable
        newProduct.isDeleted = false

        return await this.productRepository.save(newProduct)
    }

    async fetchAllProducts(): Promise<Product[]>  {
      return await this.productRepository.find({isDeleted: false})
    }

    async deleteProductByTitle(productName: string) {
        try {
            const fetchedProduct: Product = await this.productRepository.findOne({title: productName});
            fetchedProduct.isDeleted = true;
            return await this.productRepository.save(fetchedProduct)
        } catch (error) {
            throw new HttpException("Product not found or Failed to delete", 400)
        }
      }

    async updateProduct(updateProductDto: UpdateProductDto) {
        try {
          const productId: number = updateProductDto.id
          const fetchedProduct: Product = await this.productRepository.findOne({id: productId});
          Object.keys(updateProductDto).forEach((key) => {
            if (updateProductDto[key] !== undefined) {
              fetchedProduct[key] = updateProductDto[key];
            }
          });

          return  await this.productRepository.save(fetchedProduct)
        } catch (error) {
          throw new HttpException("Product not found or Failed to update", 400)
        }
      }  

    async updateProductInventory(updateProductQaunDto: UpdateProductQaunDto) {
      try {
        const productId: number = updateProductQaunDto.id
        const fetchedProduct: Product = await this.productRepository.findOne({id: productId});
        fetchedProduct.quantityAvailable = updateProductQaunDto.quantityAvailable;

        return  await this.productRepository.save(fetchedProduct)
      } catch (error) {
        throw new HttpException("Product not found or Failed to update", 400)
      }
    
    }  

}