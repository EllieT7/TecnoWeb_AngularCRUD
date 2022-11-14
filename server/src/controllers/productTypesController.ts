import { Request, Response } from "express";
import pool from "../database";

class ProductTypesControllers {
  public async list(req: Request, res: Response) {
    const types = await pool.query('SELECT * FROM tipo_producto');
    res.json(types);
  }
}

const productTypesController = new ProductTypesControllers();
export default productTypesController;