import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import CustomerModel from '@models/customers.model';
import { logger } from '@utils/logger';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize({
  dialect: 'sqlite',
  storage: './customers.db',
  define: {
    timestamps: false,
  },
});

const DB = {
  Customers: CustomerModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
