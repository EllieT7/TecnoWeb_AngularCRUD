import { Router } from "express";
import artistsController from "../controllers/artistsController";
import multer from "../libs/multer";

class ArtistsRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get("/", artistsController.list);
        this.router.get("/:id", artistsController.getOne); 
        this.router.post('/', multer.single('img'), artistsController.create);
        this.router.put('/:id', multer.single('img'), artistsController.update);
        this.router.delete('/:id', artistsController.delete);

    }
}

const artistRoutes = new ArtistsRoutes();
export default artistRoutes.router;