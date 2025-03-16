
import { Sequelize } from 'sequelize';

// Database connection configuration
const sequelize = new Sequelize(
  'if0_37805315_XXX',
  'if0_37805315',
  '7DxQN5cMY1k5T4',
  {
    host: 'sql305.infinityfree.com',
    port: 3306,
    dialect: 'mysql',
    logging: false, // Set to true for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Function to test database connection
export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

export default sequelize;
