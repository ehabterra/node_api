import { Sequelize, Model, DataTypes } from "sequelize";

const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "test"
const MYSQL_USER = process.env.MYSQL_USER || "test"
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "test"
const MYSQL_PORT = process.env.MYSQL_PORT || "3306"
const MYSQL_SERVER = process.env.MYSQL_SERVER || "localhost"

export const database = new Sequelize(`mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_SERVER}:${MYSQL_PORT}/${MYSQL_DATABASE}`, {
    dialect: 'mysql'
  })
