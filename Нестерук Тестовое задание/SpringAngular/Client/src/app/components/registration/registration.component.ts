import { Component } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private userService : UserService) {
  }
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
      console.log(x);
    });
  }
}
