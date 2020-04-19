// src/controllers/home.controller.ts
import { Request, Response } from "express";

export class HomeController {

    /**
   * @swagger
   *
   * /:
   *   get:
   *     description: Welcome to the application
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: message
   *         type: string
   */
  public index(req: Request, res: Response) {
    res.status(200).json("Welcome to Video aggregator API")
  }

}
