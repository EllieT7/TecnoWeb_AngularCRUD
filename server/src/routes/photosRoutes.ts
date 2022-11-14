import { Router } from "express";
import productController from "../controllers/productsController";
import multer from "../libs/multer";

class PhotosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('', multer.single('image'), productController.create);
  }
}

export default new PhotosRoutes().router;