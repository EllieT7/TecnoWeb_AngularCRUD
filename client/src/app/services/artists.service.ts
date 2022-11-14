import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist } from '../models/artista';

@Injectable({
  providedIn: 'root'
})

export class ArtistsService {
  API_URI = 'http://localhost:3000/api';
  constructor(private htttp: HttpClient) { }

  getArtists(){
    return this.htttp.get(this.API_URI+'/artistas');
  }

  getArtist(id: string){
    return this.htttp.get(this.API_URI+'/artistas/'+id);
  }

  updateArtist(id: string|number, updatedArtist: Artist, file: File){
    const artist = new FormData();
    artist.append('nombre', updatedArtist.nombre!);
    artist.append('descripcion', updatedArtist.descripcion!);
    artist.append('img', file);
    return this.htttp.put(this.API_URI+'/artistas/'+id, artist);
  }

  deleteArtist(id: string){   
    return this.htttp.delete(this.API_URI+'/artistas/'+id);
  }
  
  saveArtist(newArtist: Artist, file: File){
    const artist = new FormData();
    artist.append('nombre', newArtist.nombre!);
    artist.append('descripcion', newArtist.descripcion!);
    artist.append('img', file);
    return this.htttp.post(this.API_URI+'/artistas', artist);
  }
}
