"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_model_1 = require("../models/node.model");
class NodesController {
    // public index(req: Request, res: Response) {
    //   res.json({
    //     message: "Hello world!"
    //   });
    // }
    nodes(req, res) {
        node_model_1.Node.findAll({})
            .then((nodes) => res.json(nodes))
            .catch((err) => res.status(500).json(err));
    }
}
exports.NodesController = NodesController;
