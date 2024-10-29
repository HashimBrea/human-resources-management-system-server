import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

class Attendance extends Model {
    public id!: number;
    public startDate!: Date; 
    public endDate!: Date;
    public createdAt!: number; 
    public updatedAt!: number; 
}

Attendance.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type:  DataTypes.DATE,
    allowNull: true,
  },
  employeeId: {
    type:  DataTypes.INTEGER,
    allowNull: true,
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
  modelName: 'attendance',
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

export default Attendance;


