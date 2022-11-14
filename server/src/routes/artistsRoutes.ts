import { Router } from "express";
import artistsController from "../controllers/artistsController";

class ArtistsRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get("/", artistsController.list);
        this.router.get("/:id", artistsController.getOne); 
        this.router.post('/', artistsController.create);
        this.router.put('/:id', artistsController.update);
        this.router.delete('/:id', artistsController.delete);

    }
}

const artistRoutes = new ArtistsRoutes();
export default artistRoutes.router;