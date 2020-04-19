// src/config/routes.ts
import express from "express";
import { HomeController } from "../controllers/home.controller";
import { AuthController } from "../controllers/auth.controller";
import { RestaurantsController } from "../controllers/restaurants.controller";
import { UsersController } from "../controllers/users.controller";
import { MenuItemsController } from "../controllers/menuItems.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export class Routes {
  public homeController: HomeController = new HomeController();
  public authController: AuthController = new AuthController();
  public restaurantsController: RestaurantsController = new RestaurantsController();
  public usersController: UsersController = new UsersController();
  public menuItemsController: MenuItemsController = new MenuItemsController();

  public routes(app: express.Application): void {
    // home
    app.route("/").get(this.homeController.index)

    // users
    app.route("/api/v1/login").post(this.authController.login);
    app.route("/api/v1/change-password").post([checkJwt], this.authController.changePassword);
    
    app.route("/api/v1/users").get([checkJwt, checkRole(["ADMIN"])], this.usersController.index)
    .post(this.usersController.create);

    app.route("/api/v1/users/:id")
    .get([checkJwt, checkRole(["ADMIN"])], this.usersController.show)
    .put([checkJwt, checkRole(["ADMIN"])], this.usersController.update)
    .delete([checkJwt, checkRole(["ADMIN"])], this.usersController.delete);
  
    
    // restaurants
    app.route("/api/v1/restaurants").get([checkJwt], this.restaurantsController.index)
    .post([checkJwt, checkRole(["ADMIN"])], this.restaurantsController.create);

    app.route("/api/v1/restaurants/:id")
    .get([checkJwt], this.restaurantsController.show)
    .put([checkJwt, checkRole(["ADMIN"])], this.restaurantsController.update)
    .delete([checkJwt, checkRole(["ADMIN"])], this.restaurantsController.delete);
  

    // menus
    app.route("/api/v1/menuitem").get([checkJwt], this.menuItemsController.index)
    .post([checkJwt, checkRole(["ADMIN"])], this.menuItemsController.create);

    app.route("/api/v1/menuitem/:id")
    .get([checkJwt], this.menuItemsController.show)
    .put([checkJwt, checkRole(["ADMIN"])], this.menuItemsController.update)
    .delete([checkJwt, checkRole(["ADMIN"])], this.menuItemsController.delete);  
  }
}
