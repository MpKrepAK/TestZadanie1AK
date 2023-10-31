import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
import {Book} from "../models/book";
import {User} from "../models/user";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private host : DataService) {
  }

  getDataById(id : number): Observable<User>{
    return this.http.get<User>(this.host.serverHostName+"/users/"+id);
  }

  getAllData(): Observable<User[]>{
    return this.http.get<User[]>(this.host.serverHostName+"/users");
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(this.host.serverHostName+"/users", user);
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(this.host.serverHostName+"/users/"+id);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(this.host.serverHostName+"/users/"+user.id, user);
  }
}
