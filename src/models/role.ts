import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

class Role extends Model {
    public id!: number;
    public name!: string;
    public isByPass!: boolean;
}

Role.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.ENUM('IT Admin', 'User',),
    allowNull: false,
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
  modelName: 'role',
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


export default Role;


