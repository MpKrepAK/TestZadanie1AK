import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private host : DataService) {
  }

  getDataById(id : number): Observable<Order>{
    return this.http.get<Order>(this.host.serverHostName+"/orders/"+id);
  }

  getAllData(): Observable<Order[]>{
    return this.http.get<Order[]>(this.host.serverHostName+"/orders");
  }

  add(book: Order): Observable<Order> {
    return this.http.post<Order>(this.host.serverHostName+"/orders", book);
  }
  delete(id: number): Observable<Order> {
    return this.http.delete<Order>(this.host.serverHostName+"/orders/"+id);
  }

  update(book: Order): Observable<Order> {
    return this.http.patch<Order>(this.host.serverHostName+"/orders", book);
  }
}
