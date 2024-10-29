import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
    [x: string]: any;
    public id!: number;
    public username!: string;
    public password!: string;
    public roleId!: number;
}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
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
  modelName: 'user',
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


export default User;