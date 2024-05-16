import { Column, DataType, Table, Model } from "sequelize-typescript";


@Table({tableName: "product", createdAt: false, updatedAt: false})
export class Product extends Model<Product> {
@Column({type: DataType.STRING, primaryKey: true})
productCode: string

@Column({type: DataType.INTEGER, defaultValue: 0})
quantity: number

@Column({type: DataType.INTEGER, defaultValue: 0})
cost: number
}