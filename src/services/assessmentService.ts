
import Assessment from '@/models/database/Assessment';
import AssessmentValue from '@/models/database/AssessmentValue';
import { indicators } from '@/models/indicators';
import { calculateScore, calculateTotalScore } from '@/models/scoring';

// Get all assessments
export const getAssessments = async (userId?: string) => {
  try {
    const query = userId ? { where: { userId } } : {};
    const assessments = await Assessment.findAll({
      ...query,
      order: [['year', 'DESC']],
    });
    return assessments;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};

// Get assessment by ID with values
export const getAssessmentById = async (id: string) => {
  try {
    const assessment = await Assessment.findByPk(id);
    if (!assessment) {
      throw new Error('Assessment not found');
    }
    
    // Get all values for this assessment
    const values = await AssessmentValue.findAll({
      where: { assessmentId: id },
    });
    
    // Format values to match the expected structure in the app
    const formattedValues = values.reduce((acc, value) => {
      acc[value.indicatorId] = {
        value: value.value,
        score: value.score,
      };
      return acc;
    }, {} as Record<string, { value: number; score: number }>);
    
    return {
      ...assessment.toJSON(),
      values: formattedValues,
    };
  } catch (error) {
    console.error('Error fetching assessment by ID:', error);
    throw error;
  }
};

// Create a new assessment
export const createAssessment = async (assessmentData: any) => {
  try {
    // Create the assessment
    const assessment = await Assessment.create({
      name: assessmentData.name,
      year: assessmentData.year,
      date: assessmentData.date,
      userId: assessmentData.userId,
      totalScore: assessmentData.totalScore,
      status: assessmentData.status,
    });
    
    // Create all assessment values
    if (assessmentData.values && Object.keys(assessmentData.values).length > 0) {
      const values = Object.entries(assessmentData.values).map(([indicatorId, data]: [string, any]) => ({
        assessmentId: assessment.id,
        indicatorId,
        value: data.value,
        score: data.score,
      }));
      
      await AssessmentValue.bulkCreate(values);
    }
    
    return assessment;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }
};

// Update an existing assessment
export const updateAssessment = async (id: string, assessmentData: any) => {
  try {
    // Update the assessment
    const [updated] = await Assessment.update(
      {
        year: assessmentData.year,
        date: assessmentData.date,
        totalScore: assessmentData.totalScore,
        status: assessmentData.status,
      },
      { where: { id } }
    );
    
    if (!updated) {
      throw new Error('Assessment not found');
    }
    
    // Update assessment values
    if (assessmentData.values && Object.keys(assessmentData.values).length > 0) {
      // Delete existing values first
      await AssessmentValue.destroy({ where: { assessmentId: id } });
      
      // Create new values
      const values = Object.entries(assessmentData.values).map(([indicatorId, data]: [string, any]) => ({
        assessmentId: id,
        indicatorId,
        value: data.value,
        score: data.score,
      }));
      
      await AssessmentValue.bulkCreate(values);
    }
    
    return await getAssessmentById(id);
  } catch (error) {
    console.error('Error updating assessment:', error);
    throw error;
  }
};

// Delete an assessment
export const deleteAssessment = async (id: string) => {
  try {
    // Delete associated values first
    await AssessmentValue.destroy({ where: { assessmentId: id } });
    
    // Delete the assessment
    const deleted = await Assessment.destroy({ where: { id } });
    return deleted > 0;
  } catch (error) {
    console.error('Error deleting assessment:', error);
    throw error;
  }
};
