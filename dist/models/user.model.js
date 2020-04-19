"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.model.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    generatePasswordHash() {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return yield bcrypt_1.default.hash(this.password, saltRounds);
        });
    }
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, this.password);
        });
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    },
    lastname: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(250),
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize: database_1.database // this bit is important
});
User.afterValidate((user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password && user.password != '') {
        user.password = yield user.generatePasswordHash();
    }
}));
User.sync({ force: false }).then(() => console.log("User table created"));
