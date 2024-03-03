import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { OrderProduct } from "./order-product.entity";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    totalCost: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(()=> User, (user) => user.orders)
    user: User;

    @OneToMany(()=> OrderProduct, (orderProducts) => orderProducts.order)
    orderProducts: OrderProduct[];  //manyToMany relation to OrderProduct

}