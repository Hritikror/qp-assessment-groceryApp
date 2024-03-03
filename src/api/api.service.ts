import { HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from 'src/models/order-product.entity';
import { Order } from 'src/models/order.entity';
import { Product } from 'src/models/product.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>,
  ) {}

  async fetchAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({ isDeleted: false });
  }

  async createOrder(rawOrderData: any[], userObj: any) {
    try {
      const currentUser = await this.userRepository.findOne({
        id: userObj.userId,
      });
      const newOrder = new Order();
      const costProductsObj = await this.calculateCost(rawOrderData, newOrder);
      newOrder.totalCost = costProductsObj.totalAmount;
      newOrder.orderProducts = costProductsObj.productBookedArray;
      newOrder.user = currentUser;
      console.log(newOrder)
      await this.orderRepository.save(newOrder)
      
      // Saving the product quantities after the order is placed in inter_mediate table
      for (const orderProduct of costProductsObj.orderProducts) {
        //orderProduct.product.quantityAvailable -= orderProduct.quantity;
        await this.orderProductRepository.save(orderProduct)
      }

      return newOrder
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something unexpected happen during creating an order',
        401,
      );
    }
  }

  async calculateCost(rawOrderData: any[], newOrder) {
    let totalCartCost = 0, productBooked = [];
    const orderProducts: OrderProduct[] = [];
    for (const obj of rawOrderData) {
      
      const productDeatil: Product = await this.productRepository.findOne({id:obj.productId})
      if(productDeatil.quantityAvailable < obj.quanity) {
        //item is out of stock
        throw new HttpException(`${productDeatil.title} is currently Out Of Stock`,400);
      }
      productDeatil.quantityAvailable -= obj.quanity; //reduce in our inventory
      totalCartCost += (productDeatil.price * obj.quanity);
      productBooked.push(productDeatil)

      //Intermideate table to save order-products
      const orderProduct = new OrderProduct();
      orderProduct.quantity = obj.quanity;
      orderProduct.product = productDeatil;
      orderProduct.order = newOrder;
      //await this.orderProductRepository.save(orderProduct)
      orderProducts.push(orderProduct)
      
      await this.productRepository.save(productDeatil)
    }
     console.log(totalCartCost, productBooked)
    return {totalAmount: totalCartCost, productBookedArray: productBooked, orderProducts:orderProducts}
  }

}


