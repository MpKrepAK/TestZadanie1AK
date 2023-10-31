import {Component, OnInit} from '@angular/core';
import {User} from "./models/user";
import {BookService} from "./services/book.service";
import {Book} from "./models/book";
import {Order} from "./models/order";
import {Author} from "./models/author";
import {UserService} from "./services/user.service";
import {OrderService} from "./services/order.service";
import {AuthorService} from "./services/author.service";
import {delay} from "rxjs";
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Client';
  selectedComponent : string = "";
  constructor(private userService : UserService, private dataService : DataService) {
    //this.selectedComponent = "";
    //this.selectedComponent = "catalog";
    this.isReady = false;


    // this.userService.getDataById(1).subscribe(x=>{
    //   this.dataService.currentUser = x;
    //   console.log(x);
    //   this.selectedComponent = "";
    // })
  }

  isReady : boolean;



  selectedUserId: number = 0;

  users : User[] = [];

  ngOnInit(): void {

    this.userService.getAllData().subscribe(items=>{
      for (let item of items) {
        this.users.push(item);
      }
      setTimeout(()=>{
        this.isReady = true;
      }, 500);
    });

  }

  select() {
    if (this.selectedUserId ==0){
      alert("Выберите пользователя");
    }
    this.userService.getDataById(this.selectedUserId).subscribe(x=>{
      this.dataService.currentUser = x;
      this.selectedComponent = "catalog";
    })

  }
  reload(){
    this.selectedComponent = '';
    this.userService.getAllData().subscribe(items=>{
      this.users = items;
      setTimeout(()=>{
        this.isReady = true;
      }, 500);
    });
  }
}
