import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {Author} from "../../models/author";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private userService : UserService) {
  }

  users : User[] = []

  isReady : boolean;

  updating : User = {
    id : 0,
    pasportNumber : "",
    firstName : "",
    lastName : "",
    middleName : "",
    orders : []
  };

  adding : User = {
    id : 0,
    pasportNumber : "",
    firstName : "",
    lastName : "",
    middleName : "",
    orders : []
  };

  add(){
    if (this.adding.firstName.length<2 || this.adding.middleName.length<2 || this.adding.lastName.length<2){
      alert("Ошибка ввода");
      return;
    }
    this.userService.add(this.adding).subscribe(x=>{
      console.log(x)
      this.users.push(x);
    });
  }
  delete(id : number){
    this.userService.delete(id).subscribe(x=>{
      console.log(x);
      this.users = this.users.filter((user) => user.id != x.id);
    });
  }

  toUpdate(id : number){
    this.userService.getDataById(id).subscribe(x=>{
      console.log(x);
      this.updating = x;
    });
  }

  update(){
    console.log(this.updating);
    if (this.updating.firstName.length<=2
        ||this.updating.middleName.length<=2
        || this.updating.lastName.length <= 2){
      alert("Ошибка ввода");
      return;
    }
    this.userService.update(this.updating).subscribe(x=>{

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == x.id){
          this.users[i] = x;
        }
      }
    });
  }

  ngOnInit(): void {
    this.userService.getAllData().subscribe(items=>{

      for (let item of items) {
        this.users.push(item);
        console.log(item)
      }
      setTimeout(()=>{
        this.isReady = true;
      }, 500);

    });

  }
}
