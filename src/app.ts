// src/app.ts
import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import compression from 'compression'
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());

    //parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(morgan("combined"))
  }
}

export default new App().app;
