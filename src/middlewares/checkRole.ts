import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    User.findByPk<User>(id)
      .then((user: User | null) => {
        if (user) {
            //Check if array of authorized roles includes the user's role
            if (roles.indexOf(user.role) > -1) next();
            else res.status(401).send();
        } else {
          res.status(404).json({ errors: ["User not found"] });
        }
      })
      .catch((err: Error) => res.status(401).json(err));
  };
};