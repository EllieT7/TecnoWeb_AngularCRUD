import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductType } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getProductTypes(){
    return this.http.get(`${this.API_URI}/tipos`);
  }
}
