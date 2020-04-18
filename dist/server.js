"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("./utils/config");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3100;
console.log(`Database: ${process.env.Database}`);
app_1.default.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
