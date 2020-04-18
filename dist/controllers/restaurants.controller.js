"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_model_1 = require("../models/restaurant.model");
class RestaurantsController {
    index(req, res) {
        restaurant_model_1.Restaurant.findAll({})
            .then((restaurants) => res.json(restaurants))
            .catch((err) => res.status(500).json(err));
    }
    create(req, res) {
        const params = req.body;
        restaurant_model_1.Restaurant.create(params)
            .then((restaurant) => res.status(201).json(restaurant))
            .catch((err) => res.status(500).json(err));
    }
    show(req, res) {
        const restaurantId = parseInt(req.params.id);
        restaurant_model_1.Restaurant.findByPk(restaurantId)
            .then((restaurant) => {
            if (restaurant) {
                res.json(restaurant);
            }
            else {
                res.status(404).json({ errors: ["Restaurant not found"] });
            }
        })
            .catch((err) => res.status(500).json(err));
    }
    update(req, res) {
        const restaurantId = parseInt(req.params.id);
        const params = req.body;
        const update = {
            where: { id: restaurantId },
            limit: 1
        };
        restaurant_model_1.Restaurant.update(params, update)
            .then(() => res.status(202).json({ data: "success" }))
            .catch((err) => res.status(500).json(err));
    }
    delete(req, res) {
        const restaurantId = parseInt(req.params.id);
        const options = {
            where: { id: restaurantId },
            limit: 1
        };
        restaurant_model_1.Restaurant.destroy(options)
            .then(() => res.status(204).json({ data: "success" }))
            .catch((err) => res.status(500).json(err));
    }
}
exports.RestaurantsController = RestaurantsController;
