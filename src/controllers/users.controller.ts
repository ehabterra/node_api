// src/controllers/users.controller.ts
import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class UsersController {
  public index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const params: UserInterface = req.body;

    User.create<User>(params)
      .then((user: User) => res.status(201).json(user))
      .catch((err: Error) => res.status(500).json(err));
  }

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
