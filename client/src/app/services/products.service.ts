import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/producto';
import { isEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(this.API_URI+'/productos');
  }

  getProduct(id: string){
    return this.http.get(this.API_URI+'/productos/'+id);
  }

  updateProduct(id: string|number, updatedProduct: Product, file: File){
    const fd = new FormData();
    fd.append('nombre', updatedProduct.nombre!);
    fd.append('descripcion', updatedProduct.descripcion!);
    fd.append('precio', updatedProduct.precio!.toString());
    if(file.name=='foo'){
      console.log('no hay imagen');
      fd.append('img', updatedProduct.img!);
    }else{
      console.log('si hay imagen');
      fd.append('img', file);
    }
    fd.append('artista_id_artista', updatedProduct.artista_id_artista!.toString());
    fd.append('tipo_producto_id_tp', updatedProduct.tipo_producto_id_tp!.toString());
    return this.http.put(this.API_URI+'/productos/'+id, fd);
  }

  deleteProduct(id: string){   
    return this.http.delete(this.API_URI+'/productos/'+id);
  }

  saveProduct(newProduct: Product, file: File){
    const fd = new FormData();
    fd.append('nombre', newProduct.nombre!);
    fd.append('descripcion', newProduct.descripcion!);
    fd.append('precio', newProduct.precio!.toString());
    fd.append('img', file);
    fd.append('artista_id_artista', newProduct.artista_id_artista!.toString());
    fd.append('tipo_producto_id_tp', newProduct.tipo_producto_id_tp!.toString());
    return this.http.post(this.API_URI+'/productos', fd);
  }
}
