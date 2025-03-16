
import User from '@/models/database/User';
import Assessment from '@/models/database/Assessment';
import AssessmentValue from '@/models/database/AssessmentValue';
import { indicators } from '@/models/indicators';
import { calculateScore } from '@/models/scoring';

// Seed initial data for the application
export const seedData = async () => {
  try {
    // Create default admin user
    const admin = await User.create({
      name: 'Administrator',
      email: 'admin@example.com',
      password: 'password123', // In production, this should be hashed
      role: 'admin',
    });

    // Create sample assessments
    const assessments = [
      {
        id: '1',
        name: 'PERUMDAM TIRTA KERTA RAHARJA',
        year: 2023,
        date: '2023-05-15',
        userId: admin.id,
        totalScore: 3.75,
        status: 'completed',
      },
      {
        id: '2',
        name: 'PERUMDAM TIRTA KERTA RAHARJA',
        year: 2022,
        date: '2022-06-22',
        userId: admin.id,
        totalScore: 2.95,
        status: 'completed',
      },
      {
        id: '3',
        name: 'PERUMDAM TIRTA KERTA RAHARJA',
        year: 2021,
        date: '2021-05-10',
        userId: admin.id,
        totalScore: 3.45,
        status: 'completed',
      },
      {
        id: '4',
        name: 'PERUMDAM TIRTA KERTA RAHARJA',
        year: 2020,
        date: '2020-06-18',
        userId: admin.id,
        totalScore: 2.75,
        status: 'completed',
      },
    ];

    await Assessment.bulkCreate(assessments);

    // Create sample assessment values for each assessment
    for (const assessment of assessments) {
      const values = [];
      
      for (const indicator of indicators) {
        // Generate a realistic value for each indicator
        let value = 0;
        
        switch (indicator.category) {
          case 'Keuangan':
            value = Math.random() * 100; // For percentage values
            break;
          case 'Pelayanan':
            value = Math.random() * 100; // For percentage values
            break;
          case 'Operasional':
            value = indicator.id === 'jam_operasi' 
              ? Math.random() * 24 // For hours (0-24)
              : Math.random() * 100; // For percentage values
            break;
          case 'SDM':
            value = indicator.id === 'rasio_pegawai'
              ? Math.random() * 10 // For employee ratio (0-10)
              : Math.random() * 100; // For percentage values
            break;
          default:
            value = Math.random() * 100;
        }
        
        // Calculate score based on the indicator's criteria
        const score = calculateScore(value, indicator.id);
        
        values.push({
          assessmentId: assessment.id,
          indicatorId: indicator.id,
          value,
          score,
        });
      }
      
      await AssessmentValue.bulkCreate(values);
    }

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
};
