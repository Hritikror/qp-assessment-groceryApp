import { Module } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiController } from "./api.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/models/product.entity";
import { User } from "src/models/user.entity";
import { Order } from "src/models/order.entity";
import { OrderProduct } from "src/models/order-product.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Product,User,Order,OrderProduct])],
    controllers: [ApiController],
    providers: [ApiService]
  })
  export class ApiModule {}