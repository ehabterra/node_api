"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_controller_1 = require("../controllers/restaurants.controller");
const users_controller_1 = require("../controllers/users.controller");
class Routes {
    constructor() {
        this.restaurantsController = new restaurants_controller_1.RestaurantsController();
        this.usersController = new users_controller_1.UsersController();
    }
    routes(app) {
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
exports.Routes = Routes;
