import {Component, Input, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";
import {AuthorService} from "../../services/author.service";
import {Book} from "../../models/book";
import {User} from "../../models/user";
import {Order} from "../../models/order";
import {Author} from "../../models/author";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit{

  constructor(private bookService : BookService,
              private userService : UserService,
              private orderService : OrderService,
              private authorService : AuthorService,
              private dataService : DataService) {
  }
  books : Book[] = [];
  users : User[] = [];
  orders : Order[] = [];

  authors : Author[] = [];
  selectedName: string = "";
  selectedValue: string = "0";
  selectedId: number = 0;
  isReady : boolean = false;


  ngOnInit(): void {

      if (this.dataService.currentUser ===undefined){
          this.isReady= false;
          return;
      }

    this.bookService.getAllData().subscribe(items=>{

      for (let item of items) {
        this.books.push(item);
      }

    });

    this.userService.getAllData().subscribe(items=>{
      for (let item of items) {
        this.users.push(item);
      }
    });

    this.orderService.getAllData().subscribe(items=>{
      for (let item of items) {
        this.orders.push(item);
      }

      for (let item of this.orders) {
        item.user = <User>this.users.find(x => x.id == item.userId);
        item.book = <Book>this.books.find(x => x.id == item.bookId);
        console.log(item)
      }
    });

    this.authorService.getAllData().subscribe(items=>{
      for (let item of items) {
        this.authors.push(item);
      }

      for (let item of this.books) {
        item.author = <Author>this.authors.find(x => x.id == item.authorId);
      }

    });

      setTimeout(()=>{
          this.isReady = true;
      }, 500);
  }


  filtering() {
    this.bookService.getAllData().subscribe(x=>{

      if (this.selectedId>0){
        this.books = x.filter(x=> x.id == this.selectedId);
        for (let item of this.books) {
          item.author = <Author>this.authors.find(x => x.id == item.authorId);
        }
      }
      else {

          if (this.selectedName!=""){
              this.books = x.filter(x=> x.name.toLowerCase().includes(this.selectedName.toLowerCase()));
              for (let item of this.books) {
                  item.author = <Author>this.authors.find(x => x.id == item.authorId);
              }
          }
          else {

              this.books = x;
              for (let item of this.books) {
                  item.author = <Author>this.authors.find(x => x.id == item.authorId);
              }
          }

          if (this.selectedValue=='0'){
              for (let item of this.books) {
                  item.author = <Author>this.authors.find(x => x.id == item.authorId);
              }
              return;
          }
          if (this.selectedValue=='1'){
              this.books = this.books.filter(x=>!x.available);
              console.log(this.books)
              for (let item of this.books) {
                  item.author = <Author>this.authors.find(x => x.id == item.authorId);
              }
              return;
          }
          if (this.selectedValue=='2'){
              this.books = this.books.filter(x=>x.available);
              for (let item of this.books) {
                  item.author = <Author>this.authors.find(x => x.id == item.authorId);
              }
              return;
          }
          if (this.selectedValue=='3'){
              this.books = []
              const filteredOrders = this.orders.filter(x=>x.userId == this.dataService.currentUser.id && !x.refunded)
              for (const order of filteredOrders) {
                  this.bookService.getDataById(order.bookId).subscribe(book=>{
                      book.author = <Author>this.authors.find(x => x.id == book.authorId);
                      this.books.push(book);
                  })
              }

              return;
          }
      }

      setTimeout(()=>{
          this.isReady = true;
      }, 500);
    });
  }
}
