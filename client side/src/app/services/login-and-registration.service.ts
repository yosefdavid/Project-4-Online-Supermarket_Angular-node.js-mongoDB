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
export class LoginAndRegistrationService {

  userEm: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  sendRegistrationForm(obj: object): Observable<any> {

    return this.http.post("/api/register", obj, httpOptions);

  }

  login(obj: object): Observable<any> {

    return this.http.post("/api/login", obj, httpOptions);

  }

  checkLogin(): Observable<any> {

    return this.http.get("/api/login");

  }

  getPorduct(): Observable<any> {

    return this.http.get("/api/total_products");

  }

  getOrders(): Observable<any> {

    return this.http.get("/api/total_orders");

  }

  logout(): Observable<any> {

    return this.http.get("/api/logout");

  }

}
