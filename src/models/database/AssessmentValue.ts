
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/database';
import Assessment from './Assessment';

interface AssessmentValueAttributes {
  id: string;
  assessmentId: string;
  indicatorId: string;
  value: number;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AssessmentValueCreationAttributes extends Optional<AssessmentValueAttributes, 'id'> {}

class AssessmentValue extends Model<AssessmentValueAttributes, AssessmentValueCreationAttributes> implements AssessmentValueAttributes {
  public id!: string;
  public assessmentId!: string;
  public indicatorId!: string;
  public value!: number;
  public score!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AssessmentValue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    assessmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'assessments',
        key: 'id',
      },
    },
    indicatorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'assessment_values',
    timestamps: true,
  }
);

AssessmentValue.belongsTo(Assessment, { foreignKey: 'assessmentId', as: 'assessment' });
Assessment.hasMany(AssessmentValue, { foreignKey: 'assessmentId', as: 'values' });

export default AssessmentValue;
