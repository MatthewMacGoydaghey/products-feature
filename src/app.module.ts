import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { Product } from './products/DTO/product.model';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'CanteenDB',
      models: [Product],
      autoLoadModels: true
  }), ProductsModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
