import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Permission extends Model {
    public id!: number;
    public name!: string; 
    public createdAt!: number; 
    public updatedAt!: number; 
  }

Permission.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
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
  },
  {
    sequelize,
    modelName: "permission",
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = Date.now();
        record.dataValues.updatedAt = Date.now();
      },
      beforeUpdate: (record, options) => {
        record.dataValues.updatedAt = Date.now();
      },
    },
  }
);


export default Permission;
