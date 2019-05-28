import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  searchProductEm: EventEmitter<any> = new EventEmitter();

  editProductEm: EventEmitter<any> = new EventEmitter();

  refreshEm: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  checkLogin(): Observable<any> {

    return this.http.get("/api/login");

  }

  getAllCategories(): Observable<any> {

    return this.http.get("/api/categories");

  }

  getAllCategoryProducts(categoryId: string): Observable<any> {

    return this.http.post(`/api/products_of_category/${categoryId}`, null, httpOptions);

  }

  searchProduct(productName: string): Observable<any> {

    return this.http.post(`/api/products/${productName}`, null, httpOptions);

  }

  editProduct(newProduct: object): Observable<any> {

    return this.http.put("/api/products", newProduct, httpOptions);

  }

  addNewProduct(newProduct: Product): Observable<any> {

    return this.http.post("/api/products", newProduct, httpOptions);

  }

}
