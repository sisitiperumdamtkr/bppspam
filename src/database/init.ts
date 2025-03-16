
import sequelize from '@/config/database';
import User from '@/models/database/User';
import Assessment from '@/models/database/Assessment';
import AssessmentValue from '@/models/database/AssessmentValue';
import { testDatabaseConnection } from '@/config/database';
import { seedData } from './seed';

// Initialize database by syncing all models
export const initializeDatabase = async (forceSync: boolean = false) => {
  try {
    // Test connection before proceeding
    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      console.error('Failed to connect to database. Cannot initialize.');
      return false;
    }

    // Sync all models with database
    await sequelize.sync({ force: forceSync });
    console.log('Database synchronized successfully');
    
    // Seed initial data if tables were recreated
    if (forceSync) {
      await seedData();
      console.log('Initial data seeded successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    // Don't throw the error, return false instead to allow the app to continue
    return false;
  }
};

// Export models for use in the application
export { User, Assessment, AssessmentValue };
