// src/app.ts
import express from "express";
import * as bodyParser from "body-parser"
import { Routes } from "./config/routes"
import compression from 'compression'
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import swaggerUi from 'swagger-ui-express'
import { specs } from './utils/jsdoc'

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());

    //parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(morgan("combined"))

    // add routes
    this.routePrv.routes(this.app);

    // console.log(specs)
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

    // this.app._router.stack.forEach((r: any) => {
    //   if (r.route && r.route.path){
    //     console.log(r)
    //   }
    // })
    
    // this.app.use('/api/v1', this.app._router);
  }
}

export default new App().app;
