import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './DTO/product.model';
import { Repository } from 'sequelize-typescript';
import { ProductDTO } from './DTO/product.dto';
import { PositionDTO } from './DTO/postition.dto';
import { Cache } from '@nestjs/cache-manager';

interface DataValues {
  quantity: number
}


@Injectable()
export class ProductsService {
constructor(
@InjectModel(Product) private readonly productModel: Repository<Product>,
@Inject('CACHE_MANAGER') private cacheManager: Cache
) {}


async getProductPositions(): Promise<Product[]> {
  const cache = await this.cacheManager.get('positions') as Product[]
  if (cache) {
return cache
  } 
const products = await this.productModel.findAll()
let cacheArr = []
for (let obj of products) {
  cacheArr.push(obj.dataValues)
}
await this.cacheManager.set('positions', cacheArr, 60000)
return products
}


async createProductPosition(position: PositionDTO) {
 let { productCode, cost} = position
return this.productModel.create({
  productCode: productCode,
  cost: cost
})
}


async addProduct(product: ProductDTO) {
  const {productCode, quantity} = product
  const currentProduct = await this.productModel.findOne({where: {productCode: productCode}})
  const newQuantity = currentProduct.quantity + quantity
  currentProduct.quantity = newQuantity
  await currentProduct.save()
  return `Added ${quantity} units to ${productCode}`

}

async changeProductCost(cost: number) {
  return this.productModel.update
}


async removePosition(id: object) {

}


async removeProduct(id: object) {

}


async sellProduct(sellInfo: ProductDTO) {
  const {productCode, quantity} = sellInfo
  const currentProduct = await this.productModel.findOne({where: {productCode: productCode}})
  const newQuantity = currentProduct.quantity - quantity
  currentProduct.quantity = newQuantity
  await currentProduct.save()
  return `Sold ${quantity} units of ${productCode}, units left: ${currentProduct.quantity}`
}
}
