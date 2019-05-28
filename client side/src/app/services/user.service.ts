import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEm: EventEmitter<any> = new EventEmitter();

  cartEm: EventEmitter<any> = new EventEmitter();

  minimize: EventEmitter<any> = new EventEmitter();

  addProductModalEm: EventEmitter<any> = new EventEmitter();

  QuantityToAddEm: EventEmitter<any> = new EventEmitter();

  searchProductEm: EventEmitter<any> = new EventEmitter();

  orderEm: EventEmitter<any> = new EventEmitter();

  searchInvioceEm: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  checkLogin(): Observable<any> {

    return this.http.get("/api/login");

  }

  emptyCart(): Observable<any> {

    return this.http.get("/api/empty_cart");

  }

  removeProductCart(ProductCartId: string): Observable<any> {

    return this.http.delete(`/api/cartProduct/${ProductCartId}`, httpOptions);

  }

  getAllCategories(): Observable<any> {

    return this.http.get("/api/categories");

  }

  getAllCategoryProducts(categoryId: string): Observable<any> {

    return this.http.post(`/api/products_of_category/${categoryId}`, null, httpOptions);

  }

  addProductToCart(prodact: object): Observable<any> {

    return this.http.post("/api/cart_product", prodact, httpOptions);

  }

  searchProduct(productName: string): Observable<any> {

    return this.http.post(`/api/products/${productName}`, null, httpOptions);

  }

  checkDeliveryDate(deliveryDate: string): Observable<any> {

    return this.http.post("/api/check_delivery_date", { deliveryDate: deliveryDate }, httpOptions);

  }

  sendOrder(order: object): Observable<any> {

    return this.http.post("/api/orders", order, httpOptions);

  }

}
