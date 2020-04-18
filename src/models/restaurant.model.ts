// src/models/node.model.ts
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public website!: string;
  public email!: string;
  public menuId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface RestaurantInterface {
  name: string;
}

Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(250),
        allowNull: false
      },
      website: {
        type: new DataTypes.STRING(250),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(250),
        allowNull: false,
      },
      menuId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },    
    },
    {
      tableName: "restaurants",
      sequelize: database // this bit is important
    }
  );
  
  Restaurant.sync({ alter: true }).then(() => console.log("Restaurant table created"));