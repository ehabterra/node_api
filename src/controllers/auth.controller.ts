import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FindOptions } from "sequelize";

import { User } from "../models/user.model";
import config from "../config/config";

export class AuthController {

    /**
   * @swagger
   *
   * /api/v1/login:
   *   post:
   *     description: Login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         in: formData
   *         required: true
   *         type: string
   *         format: password
   *     responses:
   *       200:
   *         description: login
   */
    public login(req: Request, res: Response) {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        console.log(`username: ${username}`)
        const find: FindOptions = {
            where: { username: username }
        };

        //Get user from database
        // let user: User;
        User.findOne<User>(find)
            .then((user: User | null) => {
                console.log(user)
                if (user) {
                    //Check if encrypted password match
                    if (!user.validatePassword(password)) {
                        res.status(401).send();
                        return;
                    }

                    //Sing JWT, valid for 1 hour
                    const token = jwt.sign(
                        { userId: user.id, username: user.username },
                        config.jwtSecret,
                        { expiresIn: "4h" }
                    );

                    //Send the jwt in the response
                    res.status(200).json({ token: token});
                } else {
                    res.status(404).json({ errors: ["User not found"] });
                }
            })
            .catch((err: Error) => res.status(401).json(err));
    };

    /**
   * @swagger
   *
   * /api/v1/change-password:
   *   post:
   *     description: Change password
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: oldPassword
   *         in: formData
   *         required: true
   *         type: string
   *         format: password
   *       - name: newPassword
   *         in: formData
   *         required: true
   *         type: string
   *         format: password
   *     responses:
   *       204:
   *         description: password changed
   */
    public changePassword(req: Request, res: Response) {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        User.findByPk<User>(id)
            .then((user: User | null) => {
                if (user) {
                    //Check if old password matchs
                    if (!user.validatePassword(oldPassword)) {
                        res.status(401).send();
                        return;
                    }

                    //Validate de model (password lenght)
                    user.password = newPassword;
                    user.save();

                    res.status(204).send();

                } else {
                    res.status(404).json({ errors: ["User not found"] });
                }
            })
            .catch((err: Error) => res.status(401).json(err));
    };

    /**
   * @swagger
   *
   * /api/v1/get-user-info:
   *   get:
   *     description: Get user information.
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: user information
   */
    public getUserInfo(req: Request, res: Response) {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        User.findByPk<User>(id)
            .then((user: User | null) => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ errors: ["User not found"] });
                }
            })
            .catch((err: Error) => res.status(401).json(err));
    };
}
