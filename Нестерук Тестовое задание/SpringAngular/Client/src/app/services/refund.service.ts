import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient, private host : DataService) { }

  get(userId : number, bookId : number): Observable<Book>{
    return this.http.get<Book>(this.host.serverHostName+"/refund/"+userId+"/"+bookId);
  }

  refund(userId : number, bookId : number, orderId : number): Observable<Book>{
    return this.http.get<Book>(this.host.serverHostName+"/refund/"+userId+"/"+bookId+"/"+orderId);
  }
}
