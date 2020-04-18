// src/models/user.model.ts
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async generatePasswordHash() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds)
  }

  public async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export interface UserInterface {
  name: string;
  email: string;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      email: {
        type: new DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      password: {
        type: new DataTypes.STRING(250),
        allowNull: false
      }
    },
    {
      tableName: "users",
      sequelize: database // this bit is important
    }
  );

  User.afterValidate(async user => {
    if (user.password && user.password != '') {
      user.password = await user.generatePasswordHash()
    }
  });
  
  User.sync({ alter: true }).then(() => console.log("User table created"));