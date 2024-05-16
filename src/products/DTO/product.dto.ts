import { IsNumber, IsString } from "@nestjs/class-validator";



export class ProductDTO {
  @IsString()
  productCode: string

  @IsNumber()
  quantity: number
}