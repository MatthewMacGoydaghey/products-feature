import { Logger, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './DTO/product.model';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([Product]),
  CacheModule.registerAsync({
    useFactory: async () => ({
      store: await redisStore({
        socket: {
          host: 'localhost',
          port: 6379
        },
         ttl: 50000
        }),
    }),
  })
],
  controllers: [ProductsController],
  providers: [ProductsService, LoggerService]
})
export class ProductsModule {}
