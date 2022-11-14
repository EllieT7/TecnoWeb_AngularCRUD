import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/producto';

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

  updateProduct(id: string|number, updatedProduct: Product){
    return this.http.put(this.API_URI+'/productos/'+id, updatedProduct);
  }

  deleteProduct(id: string){   
    return this.http.delete(this.API_URI+'/productos/'+id);
  }

  saveProduct(newProduct: Product){
    return this.http.post(this.API_URI+'/productos', newProduct);
  }
}
