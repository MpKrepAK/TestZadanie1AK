import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {User} from "../../models/user";
import {RefundService} from "../../services/refund.service";
import {OrderService} from "../../services/order.service";
import {DataService} from "../../services/data.service";
import {Order} from "../../models/order";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input('product') book : Book;

  daitails = false;

  isHolder : boolean = false;

  constructor(private refundService : RefundService, private orderService : OrderService, private dataService : DataService, private userService : UserService) {

  }

  ngOnInit(): void {



    console.log("Карточка создана");

      let filtered =  this.dataService.currentUser.orders.filter(item=>item.userId == this.dataService.currentUser.id && item.bookId == this.book.id);
      const order = filtered[filtered.length - 1];
      if (order?.refunded===false){
          this.isHolder = true;
      }

  }

  return() {


    this.orderService.getAllData().subscribe(x=>{
      console.log(this.dataService.currentUser.id);
      console.log(this.book.id);
      console.log(x.find(t=>
        t.userId == this.dataService.currentUser.id
        && t.bookId == this.book.id));
      let filtered =  this.dataService.currentUser.orders.filter(item=>item.userId == this.dataService.currentUser.id && item.bookId == this.book.id);
      const order = filtered[filtered.length - 1];

      this.refundService.refund(this.dataService.currentUser.id,
          this.book.id,
        order.id)
          .subscribe(x=>{
        this.isHolder = false;
        this.book.available = true;
      })
    });

  }

  get() {
    this.refundService.get(this.dataService.currentUser.id,this.book.id).subscribe(x=>{
      this.isHolder = true;
      this.book.available = false;
    })
  }
}
