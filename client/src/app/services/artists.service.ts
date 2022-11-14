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

  updateArtist(id: string|number, updatedArtist: Artist){
    return this.htttp.put(this.API_URI+'/artistas/'+id, updatedArtist);
  }

  deleteArtist(id: string){   
    return this.htttp.delete(this.API_URI+'/artistas/'+id);
  }
  
  saveArtist(newArtist: Artist){
    return this.htttp.post(this.API_URI+'/artistas', newArtist);
  }
}
