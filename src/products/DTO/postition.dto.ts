import { IsNumber, IsString } from "@nestjs/class-validator";



export class PositionDTO {
  @IsString()
  productCode: string

  @IsNumber()
  cost: number
}