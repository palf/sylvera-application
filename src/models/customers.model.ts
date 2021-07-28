import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Customer } from '@interfaces/customers.interface';

export type CustomerCreationAttributes = Optional<Customer, 'id' | 'email'>;

export class CustomerModel extends Model<Customer, CustomerCreationAttributes> implements Customer {
  public readonly id: string;
  public email: string;
  public given_name: string;
  public family_name: string;
}

export default function (sequelize: Sequelize): typeof CustomerModel {
  CustomerModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(36), // length of uuid
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      given_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      family_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'customers',
      sequelize,
    },
  );

  return CustomerModel;
}
