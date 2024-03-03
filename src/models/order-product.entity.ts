//This intermediate table due to manyToMany releation Order-Product
//Order-Product table

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderProducts)
    product: Product;
}