import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

class Position extends Model {
    public id!: number;
    public name!: string; 
    public salaryId!: number;
    public createdAt!: number; 
    public updatedAt!: number; 
}

Position.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.ENUM('Director', 'Head Manager', 'Manager', 'Coordinator', 'Analyst'),
    allowNull: false,
  },
  salaryId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'position',
  hooks: {
    beforeCreate: (record, options) => {
      record.dataValues.createdAt = Date.now();
      record.dataValues.updatedAt = Date.now();
    },
    beforeUpdate: (record, options) => {
      record.dataValues.updatedAt = Date.now();
    },
  },
});


export default Position;


