"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./config/routes");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        //parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(morgan_1.default("combined"));
    }
}
exports.default = new App().app;
