import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { User } from "./user.entity";
import { OrderProduct } from "./order-product.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;

    @Column()
    imagePath: string;

    @Column()
    decription: string;

    @Column()
    price: number;

    @Column()
    quantityAvailable: number;

    @Column()
    isDeleted: boolean;

    @OneToMany(()=> OrderProduct, (orderProducts) => orderProducts.product)
    orderProducts: OrderProduct[];   //manyToMany relation to OrderProduct

    // @OneToMany(()=> Cart, (cart)=> cart.product)
    // cart: Cart[];  //each product can be in many Users Cart
}