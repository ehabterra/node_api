// src/config/routes.ts
import express from "express";
import { RestaurantsController } from "../controllers/restaurants.controller";
import { UsersController } from "../controllers/users.controller";

export class Routes {
  public restaurantsController: RestaurantsController = new RestaurantsController();
  public usersController: UsersController = new UsersController();

  public routes(app: express.Application): void {
    // users
    app.route("/users").get(this.usersController.index)
    .post(this.usersController.create);

    app.route("/users/:id")
    .get(this.usersController.show)
    .put(this.usersController.update)
    .delete(this.usersController.delete);
  
    // restaurants
    app.route("/restaurants").get(this.restaurantsController.index)
    .post(this.restaurantsController.create);

    app.route("/restaurants/:id")
    .get(this.restaurantsController.show)
    .put(this.restaurantsController.update)
    .delete(this.restaurantsController.delete);
  
    // menus
  
  }
}
