// src/models/user.model.ts
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
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
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      firstname: {
        type: new DataTypes.STRING(250),
        allowNull: false,
      },
      lastname: {
        type: new DataTypes.STRING(250),
        allowNull: false,
      },
      username: {
        type: new DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      email: {
        type: new DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      role: {
        type: new DataTypes.STRING(100),
        allowNull: false,
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

  User.beforeValidate(async user => {
    if (!user.role || user.role == '') {
      user.role = 'USER'
    }

  });

  User.afterValidate(async user => {
    if (user.password && user.password != '') {
      user.password = await user.generatePasswordHash()
    }
  });
  
  User.sync({ force: true }).then(() => {
    
    User.create({
      firstname: 'admin',
      lastname: 'admin',
      username: 'admin',
      email: 'admin@admin.com',
      password: 'password',
      role: 'ADMIN'
    }).then((newUser: User) => console.log(newUser.id, newUser.username, newUser.role));
    
    console.log("User table created")
  });