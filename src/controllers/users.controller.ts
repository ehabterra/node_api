// src/controllers/users.controller.ts
import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class UsersController {

    /**
   * @swagger
   *
   * /api/v1/users:
   *   get:
   *     security:
   *       - bearerAuth: [ADMIN]
   *     description: get all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all users
   */
  public index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/users:
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
   *         format: password
   *     responses:
   *       200:
   *         description: user created
   */
  public create(req: Request, res: Response) {
    const params: UserInterface = req.body;

    User.create<User>(params)
      .then((user: User) => res.status(201).json(user))
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/users/{id}:
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
  public show(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);

    User.findByPk<User>(userId)
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ errors: ["User not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/users/{id}:
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
   *         format: password
   *     responses:
   *       200:
   *         description: user updated
   */  
    public update(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    const params: UserInterface = req.body;

    const update: UpdateOptions = {
      where: { id: userId },
      limit: 1
    };

    User.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/users/{id}:
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
  public delete(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: userId },
      limit: 1
    };

    User.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
