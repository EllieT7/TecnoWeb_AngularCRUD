import { Request, Response } from "express";
import pool from "../database";

class ArtistControllers {
  public async list(req: Request, res: Response) {
    const artists = await pool.query('SELECT * FROM artista');
    res.json(artists);
  }
  public async getOne(req: Request, res: Response) {
    const artists = await pool.query('SELECT * FROM artista WHERE id_artista = ?', [req.params.id]);
    if(artists.length > 0) {
        return res.json(artists[0]);
    }
    res.status(404).json({text: 'el artista no existe'});
  }

  public async create(req: Request, res: Response) {
    const {nombre, descripcion} = req.body;
    const newArtist = {nombre, descripcion, img: req.file?.path};
    await pool.query('INSERT INTO artista set ?', newArtist);
    res.json({message: 'artista guardado'});
  }
  
  public async delete(req: Request, res: Response) {
    await pool.query('DELETE FROM artista WHERE id_artista = ?', [req.params.id]);
    res.json({message: 'El artista fue eliminado'});
  }

  public async update(req: Request, res: Response) {
    const {nombre, descripcion} = req.body;
    var updatedArtist;
    if(req.file?.path==undefined){
      updatedArtist = {nombre, descripcion, img: req.body.img};
    }else{
      updatedArtist = {nombre, descripcion, img: req.file?.path};
    }
    await pool.query('UPDATE artista set ? WHERE id_artista = ?', [updatedArtist, req.params.id]);
    res.json({message: 'El artista fue actualizado'});
  }
}

const artistsController = new ArtistControllers();
export default artistsController;