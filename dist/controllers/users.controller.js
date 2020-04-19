"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UsersController {
    /**
   * @swagger
   *
   * /users:
   *   get:
   *     description: get all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all users
   */
    index(req, res) {
        user_model_1.User.findAll({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    }
    /**
   * @swagger
   *
   * /users:
   *   post:
   *     description: Create new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstname
   *         description: Firstname.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: lastname
   *         description: Lastname.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: username
   *         description: Username.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: Email.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user created
   */
    create(req, res) {
        const params = req.body;
        user_model_1.User.create(params)
            .then((user) => res.status(201).json(user))
            .catch((err) => res.status(500).json(err));
    }
    /**
    * @swagger
    *
    * /users/{id}:
    *   get:
    *     description: Find user by id
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
    *         description: get user data
    */
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
    /**
    * @swagger
    *
    * /users/{id}:
    *   put:
    *     description: Update user data
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         description: user id.
    *         in: path
    *         type: integer
    *       - name: firstname
    *         description: Firstname.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: lastname
    *         description: Lastname.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: username
    *         description: Username.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: email
    *         description: Email.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: password
    *         description: User's password.
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: user updated
    */
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
    /**
   * @swagger
   *
   * /users/{id}:
   *   delete:
   *     description: Delete a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: user id.
   *         in: path
   *         type: integer
   *     responses:
   *       200:
   *         description: user deleted
   */
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
