import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminMiddleware } from 'src/middleware/admin.middleware';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Product } from 'src/models/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminMiddleware).forRoutes('admin');
      }
}