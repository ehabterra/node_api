"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/node.model.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Restaurant extends sequelize_1.Model {
}
exports.Restaurant = Restaurant;
Restaurant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    website: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: true,
    },
    latitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    longitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    tableName: "restaurants",
    sequelize: database_1.database // this bit is important
});
Restaurant.sync({ force: true }).then(() => console.log("Restaurant table created"));
