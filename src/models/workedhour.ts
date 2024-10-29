import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';
import moment from 'moment';

class WorkedHour extends Model {
    public id!: number;
    public employeeId!: number;
    public hours!: number;
    public createdAt!: number; 
    public updatedAt!: number; 
}

WorkedHour.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hours: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  creationDate: {
    type: DataTypes.DATE,
    get: function () {
      return moment
        .utc(this.getDataValue("creationDate"))
        .format("YYYY-MM-DD HH:mm:ss");
    },
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
  modelName: 'workedhour',
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


export default WorkedHour;


