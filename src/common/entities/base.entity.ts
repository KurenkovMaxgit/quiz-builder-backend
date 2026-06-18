import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export default class BaseEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;
}
