// src/controllers/restaurants.controller.ts
import { Request, Response } from "express";
import { Restaurant, RestaurantInterface } from "../models/restaurant.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class RestaurantsController {
  
    /**
   * @swagger
   *
   * /api/v1/restaurants:
   *   get:
   *     description: get all restaurants
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all restaurants
   */
  public index(req: Request, res: Response) {
    Restaurant.findAll<Restaurant>({})
      .then((restaurants: Array<Restaurant>) => res.json(restaurants))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/restaurants:
   *   post:
   *     description: Create new user
   *     security:
   *       - bearerAuth: [ADMIN]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: website
   *         in: formData
   *         required: false
   *         type: string
   *       - name: email
   *         in: formData
   *         required: false
   *         type: string
   *       - name: menuId
   *         in: formData
   *         required: false
   *         type: integer
   *       - name: latitude
   *         in: formData
   *         required: false
   *         type: number
   *       - name: longitude
   *         in: formData
   *         required: false
   *         type: number
   *     responses:
   *       200:
   *         description: restaurant created
   */
  public create(req: Request, res: Response) {
    const params: RestaurantInterface = req.body;

    Restaurant.create<Restaurant>(params)
      .then((restaurant: Restaurant) => res.status(201).json(restaurant))
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/restaurants/{id}:
   *   get:
   *     description: Find restaurant by id
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Id.
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: get restaurant data
   */  
  public show(req: Request, res: Response) {
    const restaurantId: number = parseInt(req.params.id);

    Restaurant.findByPk<Restaurant>(restaurantId)
      .then((restaurant: Restaurant | null) => {
        if (restaurant) {
          res.json(restaurant);
        } else {
          res.status(404).json({ errors: ["Restaurant not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/restaurants/{id}:
   *   put:
   *     description: Update restaurant data
   *     security:
   *       - bearerAuth: [ADMIN]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: website
   *         in: formData
   *         required: false
   *         type: string
   *       - name: email
   *         in: formData
   *         required: false
   *         type: string
   *       - name: menuId
   *         in: formData
   *         required: false
   *         type: integer
   *       - name: latitude
   *         in: formData
   *         required: false
   *         type: number
   *       - name: longitude
   *         in: formData
   *         required: false
   *         type: number
   *     responses:
   *       200:
   *         description: restaurant updated
   */  
  public update(req: Request, res: Response) {
    const restaurantId: number = parseInt(req.params.id);
    const params: RestaurantInterface = req.body;

    const update: UpdateOptions = {
      where: { id: restaurantId },
      limit: 1
    };

    Restaurant.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/restaurants/{id}:
   *   delete:
   *     description: Delete a restaurant
   *     security:
   *       - bearerAuth: [ADMIN]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         type: integer
   *     responses:
   *       200:
   *         description: restaurant deleted
   */  
  public delete(req: Request, res: Response) {
    const restaurantId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: restaurantId },
      limit: 1
    };

    Restaurant.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
