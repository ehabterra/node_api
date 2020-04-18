"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UsersController {
    index(req, res) {
        user_model_1.User.findAll({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    }
    create(req, res) {
        const params = req.body;
        user_model_1.User.create(params)
            .then((user) => res.status(201).json(user))
            .catch((err) => res.status(500).json(err));
    }
    show(req, res) {
        const userId = parseInt(req.params.id);
        user_model_1.User.findByPk(userId)
            .then((user) => {
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ errors: ["User not found"] });
            }
        })
            .catch((err) => res.status(500).json(err));
    }
    update(req, res) {
        const userId = parseInt(req.params.id);
        const params = req.body;
        const update = {
            where: { id: userId },
            limit: 1
        };
        user_model_1.User.update(params, update)
            .then(() => res.status(202).json({ data: "success" }))
            .catch((err) => res.status(500).json(err));
    }
    delete(req, res) {
        const userId = parseInt(req.params.id);
        const options = {
            where: { id: userId },
            limit: 1
        };
        user_model_1.User.destroy(options)
            .then(() => res.status(204).json({ data: "success" }))
            .catch((err) => res.status(500).json(err));
    }
}
exports.UsersController = UsersController;
