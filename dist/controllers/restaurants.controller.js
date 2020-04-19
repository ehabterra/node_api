"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_model_1 = require("../models/restaurant.model");
class RestaurantsController {
    /**
   * @swagger
   *
   * /restaurants:
   *   get:
   *     description: get all restaurants
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all restaurants
   */
    index(req, res) {
        restaurant_model_1.Restaurant.findAll({})
            .then((restaurants) => res.json(restaurants))
            .catch((err) => res.status(500).json(err));
    }
    /**
   * @swagger
   *
   * /restaurants:
   *   post:
   *     description: Create new user
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
    create(req, res) {
        const params = req.body;
        restaurant_model_1.Restaurant.create(params)
            .then((restaurant) => res.status(201).json(restaurant))
            .catch((err) => res.status(500).json(err));
    }
    /**
    * @swagger
    *
    * /restaurants/{id}:
    *   get:
    *     description: Find restaurant by id
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
    /**
    * @swagger
    *
    * /restaurants/{id}:
    *   put:
    *     description: Update restaurant data
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
    /**
   * @swagger
   *
   * /restaurants/{id}:
   *   delete:
   *     description: Delete a restaurant
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
