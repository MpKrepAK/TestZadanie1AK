import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {delay, Observable} from "rxjs";
import {User} from "../models/user";
import {Author} from "../models/author";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient, private host : DataService) {
  }

  getDataById(id : number): Observable<Author>{
    return this.http.get<Author>(this.host.serverHostName+"/authors/"+id).pipe();
  }

  getAllData(): Observable<Author[]>{
    return this.http.get<Author[]>(this.host.serverHostName+"/authors");
  }

  add(author: Author): Observable<Author> {
    return this.http.post<Author>(this.host.serverHostName+"/authors", author);
  }
  delete(id: number): Observable<Author> {
    return this.http.delete<Author>(this.host.serverHostName+"/authors/"+id);
  }

  update(author: Author): Observable<Author> {
    return this.http.patch<Author>(this.host.serverHostName+"/authors/"+author.id, author);
  }
}
