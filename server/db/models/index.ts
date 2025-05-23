import { Sequelize } from 'sequelize';
import { Card } from './card.model';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

if (!dbConfig.database || !dbConfig.username || !dbConfig.password) {
  throw new Error('Database configuration is incomplete');
}

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'postgres',
    logging: false,
  },
);

// Инициализируем модели
Card.initModel(sequelize);

export const db = {
  sequelize,
  Card,
};
