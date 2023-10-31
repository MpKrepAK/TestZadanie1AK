import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private host : DataService) {
  }

  getDataById(id : number): Observable<Book>{
    return this.http.get<Book>(this.host.serverHostName+"/books/"+id);
  }

  getAllData(): Observable<Book[]>{
    return this.http.get<Book[]>(this.host.serverHostName+"/books");
  }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.host.serverHostName+"/books", book);
  }
  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(this.host.serverHostName+"/books/"+id);
  }

  update(book: Book): Observable<Book> {
    return this.http.patch<Book>(this.host.serverHostName+"/books", book);
  }
}
