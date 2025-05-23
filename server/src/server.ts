import dotenv from 'dotenv';
import app from './app';
import { db } from '../db/models';

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer(): Promise<void> {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
