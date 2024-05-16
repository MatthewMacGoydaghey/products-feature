import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './DTO/product.dto';
import { PositionDTO } from './DTO/postition.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private readonly logger: LoggerService
  ) {}


  @Get()
  getProductPositions() {
    this.logger.log('getProductPositions', ProductsController.name)
  return this.productsService.getProductPositions()
  }

  @Post()
  createProductPosition(@Body() position: PositionDTO) {
    return this.productsService.createProductPosition(position)
  }

  @Put()
  addProduct(@Body() product: ProductDTO) {
    return this.productsService.addProduct(product)
  }

  @Put('/cost')
  changeProductCost(@Body() cost: number) {
  return this.productsService.changeProductCost(cost)
  }

  @Delete('/position:productCode')
  removePosition(@Param(':productCode') productCode: object) {
    return this.productsService.removePosition(productCode)
  }


  @Delete('/product:productCode')
  removeProduct(@Param(':productCode') productCode: object) {
    return this.productsService.removeProduct(productCode)
  }


  @Delete('/sell')
  sellProduct(@Body() sellInfo: ProductDTO) {
    return this.productsService.sellProduct(sellInfo)
  }



}
