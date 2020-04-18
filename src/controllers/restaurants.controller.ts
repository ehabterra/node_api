// src/controllers/restaurants.controller.ts
import { Request, Response } from "express";
import { Restaurant, RestaurantInterface } from "../models/restaurant.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class RestaurantsController {
  public index(req: Request, res: Response) {
    Restaurant.findAll<Restaurant>({})
      .then((restaurants: Array<Restaurant>) => res.json(restaurants))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const params: RestaurantInterface = req.body;

    Restaurant.create<Restaurant>(params)
      .then((restaurant: Restaurant) => res.status(201).json(restaurant))
      .catch((err: Error) => res.status(500).json(err));
  }

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
