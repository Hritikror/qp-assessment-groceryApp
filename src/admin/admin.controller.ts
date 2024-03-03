import { Controller, Body, Post, UseGuards, Get, Delete, Put, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminService } from './admin.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductQaunDto } from './dto/update-product-inventory.dto';

@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService) {}

  @Post('/new')
  async createGrocery(@Body(new ValidationPipe({ transform: true })) createProductDto: CreateProductDto) {
    return this.adminService.createProduct(createProductDto)
  }

  @Get('/view')
  async viewGrocery() {
    return await this.adminService.fetchAllProducts()
  }

  @Delete('/delete')
  async deleteGrocery(@Body('title') productName: string ) {
    return await this.adminService.deleteProductByTitle(productName)
  }

  @Put('/update')
  async updateGrocery(@Body(new ValidationPipe({ transform: true })) updateProductDto: UpdateProductDto )  {
    return await this.adminService.updateProduct(updateProductDto)
  }

  @Put('/updateCount') //Manage inventory levels of grocery items
  async updateCountGrocery(@Body(new ValidationPipe({ transform: true })) updateProductQaunDto: UpdateProductQaunDto ) {
    return await this.adminService.updateProductInventory(updateProductQaunDto)

  }

}