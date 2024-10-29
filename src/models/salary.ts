import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Salary extends Model {
    public id!: number;
    public quantity!: number;
    positions: any;
}

Salary.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.DOUBLE,
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
  modelName: 'salary',
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


export default Salary;