"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artistsController_1 = __importDefault(require("../controllers/artistsController"));
class ArtistsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", artistsController_1.default.list);
        this.router.get("/:id", artistsController_1.default.getOne);
        this.router.post('/', artistsController_1.default.create);
        this.router.put('/:id', artistsController_1.default.update);
        this.router.delete('/:id', artistsController_1.default.delete);
    }
}
const artistRoutes = new ArtistsRoutes();
exports.default = artistRoutes.router;
