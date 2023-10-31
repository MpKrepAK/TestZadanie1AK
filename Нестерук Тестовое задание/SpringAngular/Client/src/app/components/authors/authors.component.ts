import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {AuthorService} from "../../services/author.service";
import {Book} from "../../models/book";
import {Author} from "../../models/author";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{

  constructor(private authorService : AuthorService) {
  }

  authors : Author[] = []

  isReady : boolean;

  updating : Author = {
    id : 0,
    firstName : "",
    lastName : "",
    middleName : "",
    books : []
  };

  adding : Author = {
    id : 0,
    firstName : "",
    lastName : "",
    middleName : "",
    books : []
  };

  add(){
    if (this.adding.firstName.length<2 || this.adding.middleName.length<2 || this.adding.lastName.length<2){
      alert("Ошибка ввода");
      return;
    }
    this.authorService.add(this.adding).subscribe(x=>{
      console.log(x)
      this.authors.push(x);
    });
  }
  delete(id : number){
    this.authorService.delete(id).subscribe(x=>{
      console.log(x);
      this.authors = this.authors.filter((au) => au.id != x.id);
    });
  }

  toUpdate(id : number){
    this.authorService.getDataById(id).subscribe(x=>{
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
    this.authorService.update(this.updating).subscribe(x=>{

      for (let i = 0; i < this.authors.length; i++) {
        if (this.authors[i].id == x.id){
          this.authors[i] = x;
        }
      }
    });
  }

  ngOnInit(): void {
    this.authorService.getAllData().subscribe(items=>{

      for (let item of items) {
        this.authors.push(item);
        console.log(item)
      }

      setTimeout(()=>{
        this.isReady = true;
      }, 500);
    });
  }
}
