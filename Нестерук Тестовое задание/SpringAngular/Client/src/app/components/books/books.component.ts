import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";
import {AuthorService} from "../../services/author.service";
import {Book} from "../../models/book";
import {User} from "../../models/user";
import {Order} from "../../models/order";
import {Author} from "../../models/author";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  constructor(private bookService : BookService,
              private authorService : AuthorService) {
  }
  books : Book[] = [];

  authors : Author[] = [];

  isReady : boolean = false;

  adding : Book = {
    id : 0,
    name : "",
    info : "",
    available : true,
    authorId : 0,
    author : {
      id : 0,
      firstName : "",
      middleName : "",
      lastName : "",
      books: []
    },
    orders : []
  };

  updating : Book = {
    id : 0,
    name : "",
    info : "",
    available : true,
    authorId : 0,
    author : {
      id : 0,
      firstName : "",
      middleName : "",
      lastName : "",
      books: []
    },
    orders : []
  };

  add(){
    if (this.adding.name=="" || this.adding.info == null || this.adding.authorId == 0){
      alert("Ошибка ввода");
      return;
    }
    this.bookService.add(this.adding).subscribe(x=>{
      console.log(x);
      x.author = this.authors.filter(author=>author.id == x.authorId)[0];
      this.books.push(x);
    });
  }
  delete(id : number){
    this.bookService.delete(id).subscribe(x=>{
      console.log(x);
      this.books = this.books.filter((book) => book.id != x.id);
    });
  }

  toUpdate(id : number){
    this.bookService.getDataById(id).subscribe(x=>{
      console.log(x);
      this.updating = x;
    });
  }

  update(){
    console.log(this.updating);
    if (this.updating.name=="" ||this.updating.name.length<=2
      || this.updating.info == ""
      ||this.updating.info.length<=2
      || this.updating.authorId == 0){
      alert("Ошибка ввода");
      return;
    }
    this.bookService.update(this.updating).subscribe(x=>{

      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].id == x.id){
          this.books[i] = x;
          this.books[i].author = this.authors.filter(author=>author.id == x.authorId)[0];
        }
      }
    });
  }

  ngOnInit(): void {
    this.bookService.getAllData().subscribe(items=>{

      for (let item of items) {
        this.books.push(item);
      }

    });


    this.authorService.getAllData().subscribe(items=>{
      for (let item of items) {
        this.authors.push(item);
      }

      for (let item of this.books) {
        item.author = <Author>this.authors.find(x => x.id == item.authorId);
        console.log(item)
      }

      setTimeout(()=>{
        this.isReady = true;
      }, 500);
    });


  }

}
