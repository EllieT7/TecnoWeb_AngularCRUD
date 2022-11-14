import { Router } from "express";
import productController from "../controllers/productsController";
import multer from "../libs/multer";
class ProductsRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }
    
    config(): void {
        this.router.get("/", productController.list);
        this.router.get("/:id", productController.getOne); 
        this.router.post('/', multer.single('img'), productController.create);
        this.router.put('/:id', multer.single('img'), productController.update);
        this.router.delete('/:id', productController.delete);

    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;