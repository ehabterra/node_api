"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_controller_1 = require("../controllers/home.controller");
const restaurants_controller_1 = require("../controllers/restaurants.controller");
const users_controller_1 = require("../controllers/users.controller");
const menuItems_controller_1 = require("../controllers/menuItems.controller");
class Routes {
    constructor() {
        this.homeController = new home_controller_1.HomeController();
        this.restaurantsController = new restaurants_controller_1.RestaurantsController();
        this.usersController = new users_controller_1.UsersController();
        this.menuItemsController = new menuItems_controller_1.MenuItemsController();
    }
    routes(app) {
        app.route("/").get(this.homeController.index);
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
        app.route("/menuitem").get(this.menuItemsController.index)
            .post(this.menuItemsController.create);
        app.route("/menuitem/:id")
            .get(this.menuItemsController.show)
            .put(this.menuItemsController.update)
            .delete(this.menuItemsController.delete);
    }
}
exports.Routes = Routes;
