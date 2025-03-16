
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/database';
import User from './User';

interface AssessmentAttributes {
  id: string;
  name: string;
  year: number;
  date: string;
  userId: string;
  totalScore: number;
  status: 'draft' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

interface AssessmentCreationAttributes extends Optional<AssessmentAttributes, 'id'> {}

class Assessment extends Model<AssessmentAttributes, AssessmentCreationAttributes> implements AssessmentAttributes {
  public id!: string;
  public name!: string;
  public year!: number;
  public date!: string;
  public userId!: string;
  public totalScore!: number;
  public status!: 'draft' | 'completed';
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assessment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('draft', 'completed'),
      allowNull: false,
      defaultValue: 'draft',
    },
  },
  {
    sequelize,
    tableName: 'assessments',
    timestamps: true,
  }
);

Assessment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Assessment, { foreignKey: 'userId', as: 'assessments' });

export default Assessment;
