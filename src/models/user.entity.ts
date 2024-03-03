import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import * as bcrypt from 'bcryptjs';

//User Class
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => Order, (order) => order.user) //mapping with 'Order' table
  orders: Order[];

  // @OneToMany(() => Cart, (cart) => cart.user) //cart
  // cart: Cart[]; //current products in User cart
}
