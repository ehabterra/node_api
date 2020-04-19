// src/controllers/menuItems.controller.ts
import { Request, Response } from "express";
import { MenuItem, MenuItemInterface } from "../models/menuItem.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class MenuItemsController {
  
    /**
   * @swagger
   *
   * /api/v1/menuitems:
   *   get:
   *     description: get all menu items
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all menu items
   */
  public index(req: Request, res: Response) {
    MenuItem.findAll<MenuItem>({})
      .then((menuItems: Array<MenuItem>) => res.json(menuItems))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/menuitems:
   *   post:
   *     description: Create new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: item
   *         in: formData
   *         required: true
   *         type: string
   *       - name: price
   *         in: formData
   *         required: false
   *         type: number
   *       - name: description
   *         in: formData
   *         required: false
   *         type: string
   *       - name: category
   *         in: formData
   *         required: false
   *         type: string
   *       - name: restaurantId
   *         in: formData
   *         required: false
   *         type: integer
   *     responses:
   *       200:
   *         description: menu item created
   */
  public create(req: Request, res: Response) {
    const params: MenuItemInterface = req.body;

    MenuItem.create<MenuItem>(params)
      .then((menuItem: MenuItem) => res.status(201).json(menuItem))
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/menuitems/{id}:
   *   get:
   *     description: Find menu item by id
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
   *         description: get menu item data
   */  
  public show(req: Request, res: Response) {
    const menuItemId: number = parseInt(req.params.id);

    MenuItem.findByPk<MenuItem>(menuItemId)
      .then((menuItem: MenuItem | null) => {
        if (menuItem) {
          res.json(menuItem);
        } else {
          res.status(404).json({ errors: ["MenuItem not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

   /**
   * @swagger
   *
   * /api/v1/menuitems/{id}:
   *   put:
   *     description: Update menu item data
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: item
   *         in: formData
   *         required: true
   *         type: string
   *       - name: price
   *         in: formData
   *         required: false
   *         type: number
   *       - name: description
   *         in: formData
   *         required: false
   *         type: string
   *       - name: category
   *         in: formData
   *         required: false
   *         type: string
   *       - name: restaurantId
   *         in: formData
   *         required: false
   *         type: integer
   *     responses:
   *       200:
   *         description: menu item updated
   */  
  public update(req: Request, res: Response) {
    const menuItemId: number = parseInt(req.params.id);
    const params: MenuItemInterface = req.body;

    const update: UpdateOptions = {
      where: { id: menuItemId },
      limit: 1
    };

    MenuItem.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

    /**
   * @swagger
   *
   * /api/v1/menuitems/{id}:
   *   delete:
   *     description: Delete a menu item
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         type: integer
   *     responses:
   *       200:
   *         description: menu item deleted
   */  
  public delete(req: Request, res: Response) {
    const menuItemId: number = parseInt(req.params.id);
    const options: DestroyOptions = {
      where: { id: menuItemId },
      limit: 1
    };

    MenuItem.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
