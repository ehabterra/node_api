// src/models/node.model.ts
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class MenuItem extends Model {
  public id!: number;
  public item!: string;
  public price!: number;
  public description!: string;
  public category!: string;
  public restaurantId!: number; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface MenuItemInterface {
  name: string;
}

MenuItem.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      item: {
        type: new DataTypes.STRING(250),
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE.UNSIGNED,
        allowNull: true,
      },
      description: {
        type: new DataTypes.STRING(500),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },    
      restaurantId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      tableName: "menuitems",
      sequelize: database // this bit is important
    }
  );
  
  MenuItem.sync({ force: true }).then(() => console.log("MenuItem table created"));