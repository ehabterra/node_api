// src/models/node.model.ts
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { MenuItem } from "../models/menuItem.model";

export class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public website!: string;
  public email!: string;
  public latitude!: number;
  public longitude!: number;
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
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(250),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    tableName: "restaurants",
    sequelize: database // this bit is important
  }
);

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  Restaurant.hasMany(MenuItem, {
    sourceKey: 'id',
    foreignKey: 'restaurantId',
    as: 'Menu' // this determines the name in `associations`!
  });

  MenuItem.belongsTo(Restaurant, { targetKey: 'id' });

// Restaurant.sync({ force: true }).then(() => {
//   // Here we associate which actually populates out pre-declared `association` static and other methods.
//   Restaurant.hasMany(MenuItem, {
//     sourceKey: 'id',
//     foreignKey: 'restaurantId',
//     as: 'Menu' // this determines the name in `associations`!
//   });

//   MenuItem.belongsTo(Restaurant, { targetKey: 'id' });

//   console.log("Restaurant table created")
// });

