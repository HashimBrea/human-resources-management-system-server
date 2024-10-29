import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

class Employee extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public roleId!: number;
/*   public pricePerHour!: number;
 */  public identityNumber!: string;
  public isActive!: boolean;
  public workedhours!: any[];
  public createdAt!: number; 
  public updatedAt!: number; 
  public user!: User;
}

Employee.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      positionId: {
        type: DataTypes.INTEGER,
      },
/*       pricePerHour: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, */
      identityNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
    },{
      sequelize,
      modelName: 'employee',
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

export default Employee;
