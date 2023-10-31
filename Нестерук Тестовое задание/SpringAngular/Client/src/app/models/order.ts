import {User} from "./user";
import {Book} from "./book";

export interface Order{
  id : number,
  issueDate : Date,
  returnDate : Date,
  userId : number,
  bookId : number,
  user : User,
  book : Book,
  refunded : boolean
}
