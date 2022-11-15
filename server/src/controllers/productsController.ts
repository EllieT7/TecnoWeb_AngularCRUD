import { Request, Response } from "express";
import pool from "../database";

class ProductsControllers {
  public async list(req: Request, res: Response) {
    const products = await pool.query('SELECT * FROM producto');
    res.json(products);
  }
  public async getOne(req: Request, res: Response) {
    const products = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]);
    if(products.length > 0) {
        return res.json(products[0]);
    }
    res.status(404).json({text: 'el producto no existe'});
  }

  public async create(req: Request, res: Response) {
    const {nombre, descripcion, precio, artista_id_artista, tipo_producto_id_tp} = req.body;
    const newProduct = {nombre, descripcion, precio, img: req.file?.path, artista_id_artista, tipo_producto_id_tp};
    await pool.query('INSERT INTO producto set ?', newProduct);
    res.json({message: 'Producto guardado'});
  }
  
  public async delete(req: Request, res: Response) {
    await pool.query('DELETE FROM producto WHERE id_producto = ?', [req.params.id]);
    res.json({message: 'El producto fue eliminado'});
  }

  public async update(req: Request, res: Response) {
    const {nombre, descripcion, precio, artista_id_artista, tipo_producto_id_tp} = req.body;
    var updatedProduct;
    if(req.file?.path==undefined){
      updatedProduct = {nombre, descripcion, precio, img: req.body.img, artista_id_artista, tipo_producto_id_tp};
    }else{
      updatedProduct = {nombre, descripcion, precio, img: req.file?.path, artista_id_artista, tipo_producto_id_tp};
    }
    await pool.query('UPDATE producto set ? WHERE id_producto = ?', [updatedProduct, req.params.id]);
    res.json({message: 'El producto fue actualizado'});
  }
}

const productsController = new ProductsControllers();
export default productsController;