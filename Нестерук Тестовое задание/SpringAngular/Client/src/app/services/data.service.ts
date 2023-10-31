import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public serverHostName : string = "http://localhost:8080/api"
  public currentUser : User;
  constructor() { }
}
