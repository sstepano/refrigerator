import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${BASE_URL}/products`);
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${BASE_URL}/products/${id}`);
  }  

  addProduct(product: Product){
    return this.http.post(`${BASE_URL}/products`, { ...product, project: null });
  }

  updateProduct(newProduct: Product){
    return this.http.put(`${BASE_URL}/products/${newProduct.id}`, { ...newProduct, project: null });
  }

  deleteProduct(id: number){
    return this.http.delete(`${BASE_URL}/products/${id}`);
  }

  removeAllProducts(){
    return this.http.delete(`${BASE_URL}/products`);
  }

  findByExpired(expired: boolean){
    return this.http.get<Product[]>(`${BASE_URL}/products/expired?expired=${expired}`);
  }

  findByName(name: String){
    return this.http.get<Product[]>(`${BASE_URL}/products/name?name=${name}`);
  } 
  
  getAllProductsPage(pageSize: number, page: number, sortBy: String) {
    return this.http.get<Product[]>(`${BASE_URL}/products/pagination?pageSize=${pageSize}&page=${page}&sortBy=${sortBy}`);
  }
}
